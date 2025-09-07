# Cyber Planner: A Convex Optimization Framework for FRC Robotic Arm Trajectory Planning

Standard FRC motion planning tools—such as AD\* pathfinding and forward-backward time-parameterization—are designed for mobile bases operating in Euclidean Cartesian space, where the $\text{L}_2$ norm meaningfully encodes cost and distance. These indirect methods fail when applied to robotic arms, which operate in a non-Euclidean, heterogeneous configuration space (C-space) of joint variables with mixed units, coupled dynamics, and hard kinematic constraints. Imposing Cartesian assumptions onto C-space yields geometrically plausible but dynamically or electrically infeasible trajectories that violate joint limits, encounter singularities, or exceed actuator capabilities.

<Revealjs src="https://zhangzrjerry.github.io/CoTiMo" />

To overcome these limitations, we introduce Cyber Planner, a two-stage convex optimization framework tailored to the structure of C-space:

1. Path Planning: Generates smooth, collision-free, margin-aware geometric paths using potential fields derived from convex polytope obstacle representations.
1. Trajectory Planning: Computes time-optimal parameterizations under voltage, current, and dynamic constraints, ensuring physical realizability.

By respecting the true geometry and physics of robotic arms, Cyber Planner delivers fast, safe, and dynamically feasible trajectories.

## 2. Path Planning: From Discrete Grids to Smooth, Safe Curves

### 2.1. The Problem with Naive A\*

A standard A\* search on a discretized grid can produce a path that hugs obstacles. While mathematically optimal in the discrete graph, this path leaves no margin for error in real-world execution, where sensor noise and control inaccuracies can lead to collisions.

<div style="display: flex; justify-content: center; align-items: center; gap: 2%">
    <img src="https://zhangzrjerry.github.io/CoTiMo/assets/astar-a.png" width="49%" alt="Naive A* Path">
    <img src="https://zhangzrjerry.github.io/CoTiMo/assets/astar-b.png" width="49%" alt="Improved Path">
</div>

### 2.2. Continuous Potential Fields via Convex Polytopes

To create a safer, smoother path, we augment the cost function with an _artificial potential field_. Instead of a coarse, grid-based approximation, we model all obstacles and the robot itself as finite sets of convex polygons. The potential energy at any configuration (a point in configuration space) is defined as the minimum distance between the robot's polygonal representation and the obstacle polygons.

This distance can be computed robustly:

- For a point to a polygon, it's a Low-Dimensional Quadratic Program (LDQP):
  $$
  \min_{\mathbf{x}} \|\mathbf{x} - \mathbf{p}\|^2 \quad \text{s.t.} \quad A\mathbf{x} \leq \mathbf{b}
  $$
- For polygon-to-polygon distance (when not intersecting), it's another LDQP:
  $$
  \min_{\mathbf{x},\mathbf{y}} \|\mathbf{x} - \mathbf{y}\|^2 \quad \text{s.t.} \quad A\mathbf{x} \leq \mathbf{b}, \quad C\mathbf{y} \leq \mathbf{d}
  $$

This formulation guarantees a **Lipschitz-continuous** potential field, which is essential for stable gradient-based optimization. The resulting path is smooth and maintains a safe, dynamically determined distance from obstacles, unlike its discrete, jittery counterpart.

<div style="display: flex; justify-content: center; align-items: center; gap: 2%">
    <img src="https://zhangzrjerry.github.io/CoTiMo/assets/astar-d.png" width="49%">
    <img src="https://zhangzrjerry.github.io/CoTiMo/assets/astar-c.png" width="49%">
</div>

### 2.3. Polynomial Interpolation for Kinematic Continuity

The output of the potential-field-optimized search is still a discrete set of waypoints, $\mathcal{P} = \{\mathbf{p}_i = [x_i, y_i]\}$. To generate a trajectory that a real robot can follow without inducing damaging vibrations, we need $C^2$ continuity (continuous position, velocity, and acceleration).

We achieve this by fitting a piecewise cubic spline between each pair of waypoints. For the $i$-th segment, parameterized by normalized arc length $s \in [0, 1)$, the polynomial for the $x$-coordinate is:

$$
q_{i,x}(s) = a_{i,x} s^3 + b_{i,x} s^2 + c_{i,x} s + d_{i,x}
$$

The coefficients are determined by enforcing continuity conditions at the knots:

$$
\begin{cases}
q_{i-1,x}(1) = q_{i,x}(0) = x_i \\
q'_{i-1,x}(1) = q'_{i,x}(0) \\
q''_{i-1,x}(1) = q''_{i,x}(0)
\end{cases}
\quad \forall i \in [1, n]
$$

For a stationary start and end, we add $q'_{0}(0) = q'_{n-1}(1) = 0$. This system of equations can be solved efficiently, often using the natural spline formulation which leads to a tridiagonal system:

$$
\begin{bmatrix}
2 & 1 & & & \\
1 & 4 & 1 & & \\
& \ddots & \ddots & \ddots & \\
& & 1 & 4 & 1 \\
& & & 1 & 2
\end{bmatrix}
\begin{bmatrix}
D_0 \\
D_1 \\
\vdots \\
D_{m-1} \\
D_m
\end{bmatrix}
=
\begin{bmatrix}
3(x_1 - x_0) \\
3(x_2 - x_0) \\
\vdots \\
3(x_m - x_{m-2}) \\
3(x_m - x_{m-1})
\end{bmatrix}
$$

## 3. Trajectory Planning: Direct Voltage and Current Constrained Optimization via Augmented Lagrangian

The core innovation of our trajectory planning lies in bypassing traditional, conservative kinematic limits (velocity $v_{\text{max}}$, acceleration $a_{\text{max}}$) entirely. Instead, we formulate the time-optimal control problem directly in terms of the fundamental physical constraints: motor voltage $V$ and current $I$. This allows the optimizer to dynamically allocate the robot's limited electrical power between velocity and acceleration, yielding a truly time-optimal trajectory that fully exploits the system's capabilities.

### 3.1. Problem Formulation via Motor Feedforward Models

We begin by expressing the motor control inputs as functions of the path parameterization. Let $\mathbf{P}(s)$ be the geometric path in configuration space, with $s \in [0, L]$ being the arc length. The goal is to find the function $s(t)$ that minimizes the total time $T = \int_0^L (1 / \dot{s})  ds$.

The dynamics of the robotic arm are governed by its motor feedforward models. For the elevator (position $x$) and arm joint (angle $\theta$), the required motor voltages are:

$$
\begin{aligned}
V_E(s) &= K_{g,E} + K_{S,E} \cdot \text{sign}(x'(s) \dot{s}) + \frac{K_{v,E}}{i_e} x'(s) \dot{s} + \frac{K_{a,E}}{i_e} \left( x''(s) \dot{s}^2 + x'(s) \ddot{s} \right) \\
V_A(s) &= K_{g,A} \cos(\theta(s)) + K_{S,A} \cdot \text{sign}(\theta'(s) \dot{s}) + \frac{K_{v,A}}{i_a} \theta'(s) \dot{s} + \frac{K_{a,A}}{i_a} \left( \theta''(s) \dot{s}^2 + \theta'(s) \ddot{s} \right)
\end{aligned}
$$

where $K_{g}$, $K_{S}$, $K_{v}$, and $K_{a}$ are gravity, static friction, velocity feedforward gain, acceleration feedforward gain respectively, and $i_e$, $i_a$ are gear ratios.

The current drawn by each motor is a function of its voltage and speed:

$$
I(s) = \frac{1}{R} \left( V(s) - K_v \omega(s) \right)
$$

where $\omega(s) = \dot{s} \cdot \frac{d\phi}{ds}$ is the motor shaft speed, with $\phi$ being the motor shaft angle (related to $x$ or $\theta$ via the gear ratio).

To formulate this as an optimization problem over the path, we introduce the decision variables $a(s) = \ddot{s}$ and $b(s) = \dot{s}^2$. The voltages then become _quadratic functions_ of these variables:

$$
\begin{aligned}
V_E(s) &= \left( \frac{K_{a,E}}{i_e} x'(s) \right) a(s) + \left( \frac{K_{a,E}}{i_e} x''(s) + \frac{K_{v,E}}{i_e} \frac{x'(s)}{\sqrt{b(s)}} \right) \sqrt{b(s)} + \left( K_{g,E} + K_{S,E} \cdot \text{sign}(x'(s)) \right) \\
V_A(s) &= \left( \frac{K_{a,A}}{i_a} \theta'(s) \right) a(s) + \left( \frac{K_{a,A}}{i_a} \theta''(s) + \frac{K_{v,A}}{i_a} \frac{\theta'(s)}{\sqrt{b(s)}} \right) \sqrt{b(s)} + \left( K_{g,A} \cos(\theta(s)) + K_{S,A} \cdot \text{sign}(\theta'(s)) \right)
\end{aligned}
$$

The time-optimal trajectory planning problem is now:

$$
\begin{aligned}
\min_{a(s), b(s)} & \quad \int_{0}^{L} \frac{1}{\sqrt{b(s)}}  ds \\
\text{s.t.} & \quad b'(s) = 2a(s) \quad \text{(Kinematic Coupling)} \\
& \quad -V_{\max} \leq V_E(s) \leq V_{\max} \quad \text{(Voltage Constraints)} \\
& \quad -V_{\max} \leq V_A(s) \leq V_{\max} \\
& \quad -I_{\max} \leq I_E(s) \leq I_{\max} \quad \text{(Current Constraints)} \\
& \quad -I_{\max} \leq I_A(s) \leq I_{\max} \\
& \quad b(s) \geq 0 \quad \text{(Non-negativity)} \\
& \quad \text{Boundary Conditions: } \dot{s}(0) = 0, \dot{s}(L) = 0 \quad \text{(i.e., } b(0) = 0, b(L) = 0\text{)}
\end{aligned}
$$

### 3.2. Discretization and Handling Nonlinearities

We discretize the path into $K$ segments, yielding variables $a_k, b_k$ for $k = 0, \dots, K-1$. The integral objective is approximated as $\sum_{k=0}^{K-1} 2(s_{k+1} - s_k) / (\sqrt{b_k} + \sqrt{b_{k+1}})$.

The primary challenge is the non-convex term $1/(\sqrt{b_k} + \sqrt{b_{k+1}})$. We handle this by introducing slack variables $c_k$ and $d_k$ with Second-Order Cone (SOC) constraints to create a convex upper bound:

$$
\begin{aligned}
\min & \quad \sum_{k=0}^{K-1} 2(s_{k+1} - s_k) d_k \\
\text{s.t.} & \quad \left\|\begin{bmatrix} b_k - \frac{1}{2}c_k \end{bmatrix}\right\|_2 \leq b_k + \frac{1}{2} \quad \forall k \quad \text{(i.e., } \sqrt{b_k} \geq c_k\text{)} \\
& \quad \left\|\begin{bmatrix} c_k + c_{k+1} - \frac{1}{2}d_k \end{bmatrix}\right\|_2 \leq c_k + c_{k+1} + \frac{1}{2}d_k \quad \forall k \quad \text{(i.e., } \frac{1}{c_k + c_{k+1}} \leq d_k\text{)} \\
& \quad 2(s_{k+1} - s_k)a_k + b_k - b_{k+1} = 0 \quad \forall k \quad \text{(Discretized } b' = 2a\text{)} \\
& \quad \text{Discretized } V_E(s_k), V_A(s_k), I_E(s_k), I_A(s_k) \text{ constraints} \\
& \quad b_0 = 0,  b_K = 0 \quad \text{(Boundary Conditions)}
\end{aligned}
$$

The voltage and current constraints remain nonlinear due to the $\sqrt{b_k}$ terms. We treat these as general nonlinear equality and inequality constraints in our Augmented Lagrangian framework.

### 3.3. Augmented Lagrangian Formulation

We consolidate all constraints into a general form for the Augmented Lagrangian Method (ALM). Let $\mathbf{x} = [a_0, \dots, a_{K-1}, b_0, \dots, b_K, c_0, \dots, c_K, d_0, \dots, d_{K-1}]^T$ be the vector of all primal variables.

The problem has three types of constraints:

1.  **Second-Order Cone (SOC) Constraints:** $\mathbf{A}_i \mathbf{x} + \mathbf{b}_i \in \mathcal{Q}^{n_i}$ for the slack variables $c_k, d_k$.
2.  **Linear Equality Constraints:** $\mathbf{G}\mathbf{x} = \mathbf{h}$ for the kinematic coupling ($b' = 2a$) and boundary conditions.
3.  **Linear Inequality Constraints:** $\mathbf{P}\mathbf{x} \le \mathbf{q}$ for voltage and current limitations.
4.  **Nonlinear Equality Constraints:** $\mathbf{r}_j(\mathbf{x}) = 0$ for the $\sqrt{b_k}$ relaxation.

The Augmented Lagrangian function is:

$$
\begin{aligned}
\mathcal{L}_\rho(\mathbf{x}, \boldsymbol{\mu}, \boldsymbol{\nu}, \boldsymbol{\lambda}, \boldsymbol{\eta}) = & \sum_{k=0}^{K-1} 2(s_{k+1} - s_k) d_k \\
& + \frac{\rho}{2} \sum_{i} \left\| \Pi_{\mathcal{Q}^{n_i}} \left( \frac{\boldsymbol{\mu}_i}{\rho} - \mathbf{A}_i \mathbf{x} - \mathbf{b}_i \right) \right\|^2 \\
& + \frac{\rho}{2} \sum_{j \in \mathcal{J}_{\text{eq}}} \left( \mathbf{r}_j(\mathbf{x}) + \frac{\boldsymbol\nu_j}{\rho} \right)^2 \\
& + \frac{\rho}{2} \left\| \mathbf{G}\mathbf{x} - \mathbf{h} + \frac{\boldsymbol{\lambda}}{\rho} \right\|^2 \\
& + \frac{\rho}{2} \left\| \max\left(\mathbf{P}\mathbf{x}-\mathbf{q} + \frac{\boldsymbol{\eta}}{\rho}, 0\right) \right\|^2
\end{aligned}
$$

where:

- $\boldsymbol{\mu}_i$ are the dual variables for the SOC constraints.
- $\boldsymbol{\nu}_j$ are the dual variables for the nonlinear equality constraints.
- $\boldsymbol{\lambda}$ are the dual variables for the linear equality constraints.
- $\boldsymbol{\eta}$ are the dual variables for the linear inequality constraints.
- $\Pi_{\mathcal{Q}^n}(\cdot)$ is the projection onto the second-order cone, which has a closed-form solution.
- $\rho > 0$ is the penalty parameter.

### 3.4. Solution via L-BFGS

The key advantage of the ALM is that for fixed dual variables and penalty parameter, $\mathcal{L}_\rho(\mathbf{x}, \cdot)$ is an _unconstrained_, smooth (assuming $\mathbf{r}_j$ are smooth) function of $\mathbf{x}$. Its gradient $\nabla_{\mathbf{x}} \mathcal{L}_\rho$ can be computed analytically by differentiating the expression above, including the gradients of the projection operator and the constraint functions $\mathbf{r}_j(\mathbf{x})$.

We solve the inner minimization problem using the L-BFGS algorithm, a quasi-Newton method highly effective for large-scale, smooth, unconstrained optimization:

$$
\mathbf{x}^{(l+1)} \leftarrow \text{L-BFGS} \left( \min_{\mathbf{x}} \mathcal{L}_\rho(\mathbf{x}, \boldsymbol{\mu}^{(l)}, \boldsymbol{\nu}^{(l)}, \boldsymbol{\lambda}^{(l)}, \boldsymbol{\eta}^{(l)}) \right)
$$

After solving for $\mathbf{x}$, the dual variables and penalty parameter are updated:

$$
\begin{aligned}
\boldsymbol{\mu}_i^{(l+1)} &\leftarrow \Pi_{\mathcal{Q}^{n_i}} \left( \boldsymbol{\mu}_i^{(l)} - \rho (\mathbf{A}_i \mathbf{x}^{(l+1)} + \mathbf{b}_i) \right) \\
\boldsymbol\nu_j^{(l+1)} &\leftarrow \nu_j^{(l)} + \rho  \mathbf{r}_j(\mathbf{x}^{(l+1)})  \\
\boldsymbol{\lambda}^{(l+1)} &\leftarrow \boldsymbol{\lambda}^{(l)} + \rho (\mathbf{G} \mathbf{x}^{(l+1)} - \mathbf{h}) \\
\boldsymbol\eta_j^{(l+1)} &\leftarrow \max \left( \boldsymbol\eta^{(l)} + \rho  (\mathbf{P}\mathbf{x}^{(l+1)}-\mathbf{q}), 0 \right)  \\
\rho^{(l+1)} &\leftarrow \min \left( (1 + \gamma) \rho^{(l)}, \beta \right)
\end{aligned}
$$

This process iterates until convergence, yielding the time-optimal trajectory $s(t)$ that respects the robot's true physical limits.
