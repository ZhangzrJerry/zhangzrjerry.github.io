# PHR Conic Augmented Lagrangian Method

[Slide](/assets/conicalm.pdf): Starting from the penalty method, we extend to the augmented Lagrangian method for improved stability. By introducing $s$, symmetric cone constraints are integrated, forming a unified framework for solving constrained optimization problems iteratively. _Inspired by Dr. Zhepei Wang's Lecture "Numerical Optimization for Robotics"._

<PlayerBilibili videoId="BV1EaxXzaE9g" />

## Introduction

### Penalty Method

Consider the constrained optimization problem:

$$
\min_xf(x)\quad\text{s.t.}\quad h(x)=0
$$

Penalty method solves a series of unconstrained problems:

$$
Q_\rho(x) = f(x) + \frac\rho2||h(x)||^2
$$

**Challenge:**

- Requires $\rho\to\infty$ for exact solution, causing ill-conditioned Hessian.
- Finite $\rho$ leads to constraint violation $h(x)\neq 0$.

### Lagrangian Relaxation

The Lagrangian is defined as:

$$
\mathcal{L}(x,\lambda) = f(x) + \lambda^\top h(x)
$$

At the optimal solution $x^*$, there exists $\lambda^*$ such that $\nabla_x \mathcal{L}(x^*,\lambda^*) = 0$.

Uzawa's method iteratively updates $x$ and $\lambda$:

$$
\begin{cases}
x^{k+1} = \arg\min_x \mathcal{L}(x,\lambda^k) \\
\lambda^{k+1} = \lambda^k + \alpha_k h(x^{k+1})
\end{cases}
$$

where $\alpha_k > 0$ is a step size.

However, when $\lambda$ is fixed and one attempts to minimize $\mathcal{L}(x,\lambda)$:

- $\min_x\mathcal{L}(x,\lambda)$ can be non-smooth even for smooth $f$ and $h$.
- $\min_x \mathcal{L}(x,\lambda)$ may be unbounded or have no finite solution.

## Equality Constraint

### PHR Augmented Lagrangian Method

Consider the optimization problem with a penalty on the deviation from a prior $\bar{\lambda}$:

$$
\min_x\max_\lambda f(x) + \lambda^\top h(x) - \frac1{2\rho}||\lambda-\bar{\lambda}||^2
$$

The inner problem:

$$
\nabla_\lambda = h(x) - \frac1\rho(\lambda-\bar\lambda)\quad\Rightarrow\quad\lambda^*(\bar\lambda)=\bar\lambda+\rho h(x)
$$

The outer problem:

$$
\begin{aligned}
& \min_x\max_\lambda f(x)+\lambda^\top h(x) - \frac1{2\rho}||\lambda-\bar\lambda||^2 \\
=& \min_x f(x)+[\lambda^*(\bar\lambda)]^\top h(x) - \frac1{2\rho}||\lambda^*(\bar\lambda)-\bar\lambda||^2 \\
=& \min_x f(x)+[\bar\lambda+\rho h(x)]^\top h(x) - \frac\rho2||h(x)||^2 \\
=& \min_x f(x)+\bar\lambda^\top h(x) + \frac\rho2||h(x)||^2
\end{aligned}
$$

### PHR Augmented Lagrangian Method (cont.)

To increase precision:

- Reduce the penalty weight $1/\rho$
- Update the prior multiplier $\bar\lambda\leftarrow\lambda^*(\bar\lambda)$

Uzawa's method for the augmented Lagrangian function is:

1. $x\leftarrow\arg\min_x f(x)+\bar\lambda^\top h(x)+\frac\rho2||h(x)||^2$
2. $\bar\lambda\leftarrow\bar\lambda+\rho h(x)$

### Penalty Method Perspective

The corresponding primal problem of the augumented Lagrangian Function is obviously:

$$
\begin{aligned}
\min_x\ & f(x)+\frac\rho2||h(x)||^2 \\
\text{s.t. } & h(x) = 0
\end{aligned}
$$

**Advantages:**

- Even without $\rho \to \infty$, the constraints can be exactly satisfied in the limit through multiplier updates.
- For large $\rho$, the penalty term $\frac{\rho}{2}||h(x)||^2$ dominates, ensuring $\min_x \mathcal{L}_\rho(x, \lambda)$ has a local solution.
- The augmented dual function $q_\rho(\lambda)$ is smooth in proper conditions, with $\nabla q_\rho(\lambda) \approx h(x(\lambda))$.

### Practical PHR-ALM

In practical, we use its equivalent form:

$$
\mathcal{L}_\rho(x,\lambda) = f(x) + \frac\rho2\left\lVert h(x)+\frac\lambda\rho\right\rVert^2 - \underbrace{\frac1{2\rho}||\lambda||^2}_{x\text{-independent}}
$$

The KKT solution can be solved via:

$$
\begin{cases}
x^{k+1} = \arg\min_x\mathcal{L}_{\rho^k}(x,\lambda^k) \\
\lambda^{k+1} = \lambda^k + \rho^k\;h(x^{k+1}) \\
\rho^{k+1} = \min[(1+\gamma)\rho^k, \rho_\max]
\end{cases}
$$

where $\rho^k$ can be any nondecreasing positive sequence.

## Inequality Constraint

### Slack Variables Relaxation

Consider the optimization problem with inequality constraints:

$$
\min_xf(x)\quad\text{s.t.}\quad g(x)\le0
$$

We use the equivalent formulation using slack variables:

$$
\min_{x,s} f(x)\quad\text{s.t.}\quad g(x)+[s]^2=0
$$

where $[\cdot]^2$ means element-wise squaring.

We can directly form Lagrangian like equality-constrained case

$$
\begin{aligned}
&\min_{x,s}\left\{f(x)+\frac\rho2\left\lVert g(x)+[s]^2+\frac\lambda\rho\right\rVert^2\right\}\\=&\min_xf(x)+\min_x\min_s\frac\rho2\left\lVert g(x)+[s]^2+\frac\lambda\rho\right\rVert^2\\=&\min_x f(x)+\frac\rho2\left\lVert\max[g(x)+\frac\lambda\rho,0]\right\rVert^2
\end{aligned}
$$

### Simplified Form

Summing over all components gives the final form:

$$
\mathcal{L}_\rho(x,\mu) = f(x) + \frac\rho2\left\lVert\max[g(x)+\frac\mu\rho,0]\right\rVert^2 - \underbrace{\frac1{2\rho}||\mu||^2}_{x\text{-independent}}
$$

For the dual update, from the optimality condition:

$$
\begin{aligned}
\mu^{k+1} &= \mu^k + \rho\left(g(x^{k+1})+[s^{k+1}]^2\right) \\
&= \max\left[\mu^k+\rho g(x^{k+1}), 0\right]
\end{aligned}
$$

### Summary

PHR Augmented Lagrangian Method for General Nonconvex cases:

$$
\begin{aligned}
\min_x\; & f(x) \\
\text{s.t. } & h(x) = 0 \\
& g(x) \le 0
\end{aligned}
$$

Its PHR Augmented Lagrangian is defined as

$$
\mathcal{L}_\rho=f(x)+\frac\rho2\left\lVert h(x)+\frac\lambda\rho\right\rVert^2+\frac\rho2\left\lVert\max[g(x)+\frac\mu\rho,0]\right\rVert^2-\frac1{2\rho}\left\{||\lambda||^2+||\mu||^2\right\}
$$

The PHR-ALM is simply repeating the primal descent and dual ascent iterations:

$$
\begin{cases}
x^{k+1} = \arg\min_x\mathcal{L}_{\rho^k}(x,\lambda^k,\mu^k) \\
\lambda^{k+1} = \lambda^k + \rho^k\;h(x^{k+1}) \\
\mu^{k+1} = \max[\mu^k+\rho^k g(x^{k+1}), 0] \\
\rho^{k+1} = \min[(1+\gamma)\rho^k, \rho_\max]
\end{cases}
$$

_Courtesy: Z. Wang_

## Symmetric Cone Constraint

### Extension to Symmetric Cone Constraints

Consider the symmetric cone constrained optimization problem:

$$
\begin{aligned}
\min_x\; & f(x) \\
\text{s.t. } & h(x) = 0 \\
& g(x) \in \mathcal{K}
\end{aligned}
$$

|               Second Order Cone               |            Positive Definite Cone             |
| :-------------------------------------------: | :-------------------------------------------: |
| ![](/pic/Pasted%20image%2020251006072831.png) | ![](/pic/Pasted%20image%2020251006072849.png) |

### Generalized Inequality Constraint

For the symmetric cone constraint $x \in \mathcal{K}$, we can equivalently express it as:

$$
g(x) = -x \preceq_{\mathcal{K}} 0
$$

The standard inequality constraint $g(x)\le0$ corresponds to the **nonnegative orthant cone**:

$$
\mathcal{K}=\mathbb{R}^n_+=\set{x\in\mathbb{R}^n:x_i\ge0,\;i=1,\dots,n}
$$

t's projection operator is exactly element-wise max function:

$$
\Pi_{\mathbb{R}^n_+}(v) = \max[v,0],\quad(\mathbb{R}^n_+)^*=\mathbb{R}^n_+
$$

### Slack Variables Relaxation

Consider the optimization problem with inequality constraints:

$$
\min_xf(x)\quad\text{s.t.}\quad g(x)\in\mathcal{K}
$$

By Euclidean Jordan algebra, the conit program is equivalent to

$$
\min_{x,s} f(x)\quad\text{s.t.}\quad g(x)=s\circ s
$$

We can directly form Lagrangian like equality-constrained case

$$
\begin{aligned}
&\min_{x,s}\left\{f(x)+\frac\rho2\left\lVert g(x)-s\circ s+\frac\lambda\rho\right\rVert^2\right\}\\=&\min_xf(x)+\min_x\min_s\frac\rho2\left\lVert g(x)-s\circ s+\frac\lambda\rho\right\rVert^2\\=&\min_x f(x)+\frac\rho2\left\lVert\Pi_{\mathcal{K}}\left(-g(x)-\frac\lambda\rho\right)\right\rVert^2
\end{aligned}
$$

### Simplified Form

Let $\mu=-\lambda$, we get the final form:

$$
\mathcal{L}_\rho(x,\mu) = f(x) + \frac\rho2\left\lVert\Pi_{\mathcal{K^*}}\left(-g(x)+\frac\mu\rho\right)\right\rVert^2 - \underbrace{\frac1{2\rho}||\mu||^2}_{x\text{-independent}}
$$

For the dual update, from the optimality condition:

$$
\begin{aligned}
\mu^{k+1} &= \mu^k + \rho\left[g(x^{k+1})-s^{k+1}\circ s^{k+1}\right] \\
&= \Pi_{\mathcal{K^*}}[\mu^k-\rho\cdot g(x^{k+1})]\end{aligned}
$$

where $\mathcal{K}^*$ is the dual cone of $\mathcal{K}$.

### Summary

PHR Augmented Lagrangian Method for General Nonconvex cases:

$$
\begin{aligned}
\min_x\; & f(x) \\
\text{s.t. } & h(x) = 0 \\
& g(x) \in \mathcal{K}
\end{aligned}
$$

Its PHR Augmented Lagrangian is defined as

$$
\mathcal{L}_\rho=f(x)+\frac\rho2\left\lVert h(x)+\frac\lambda\rho\right\rVert^2+\frac\rho2\left\lVert\Pi_{\mathcal{K}}\left(-g(x)+\frac\mu\rho\right)\right\rVert^2-\frac1{2\rho}\left\{||\lambda||^2+||\mu||^2\right\}
$$

The PHR-ALM is simply repeating the primal descent and dual ascent iterations:

$$
\begin{cases}
x^{k+1} = \arg\min_x\mathcal{L}_{\rho^k}(x,\lambda^k,\mu^k) \\
\lambda^{k+1} = \lambda^k + \rho^k\;h(x^{k+1}) \\
\mu^{k+1} = \Pi_\mathcal{K^*}(\mu^k-\rho^kx^{k+1}) \\
\rho^{k+1} = \min[(1+\gamma)\rho^k, \rho_\max]
\end{cases}
$$
