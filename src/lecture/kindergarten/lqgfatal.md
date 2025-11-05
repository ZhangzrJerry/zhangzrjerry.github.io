# The Duality and the Failure of LQG Control

[Slide](/assets/lqgfatal.pdf): Explore the **duality** between state observers and feedback controllers, focusing on KF and LQR. Understand why combining the "**optimal observer**" with the "**optimal controller**" might fail. _Inspired by Dominikus Noll's page "A generalization of the Linear Quadratic Gaussian Loop Transfer Recovery procedure (LQG/LTR)"._

<PlayerBilibili videoId="BV1rppXzoE5o"  />

## Introduction

### System Model

Consider a $n$-th order linear time-invariant (LTI) discrete-time dynamic system with $m$-dimensional input and $p$-dimensional output:

$$
\begin{aligned}
x_{k+1} &= A x_{k} + B u_{k} + \omega_{k}, &\omega_{k}\sim\mathcal{N}(0, W_{k}) \\
y_{k} &= C x_{k} + \nu_{k} ,&\nu_{k}\sim\mathcal{N}(0, V_{k})
\end{aligned}
$$

- $x_k\in\mathbb{R}^n$: state vector at time step $k$
- $u_k\in\mathbb{R}^m$: control input vector at time step $k$
- $y_k\in\mathbb{R}^p$: measurement vector at time step $k$
- $A\in\mathbb{R}^{n\times n}$: state transition matrix
- $B\in\mathbb{R}^{n\times m}$: control input matrix
- $C\in\mathbb{R}^{p\times n}$: observation matrix

### Controllability

A LTI system is said to be **controllable** if,

$$
\forall x_0,x^*,\exists k>0,\mathbf u_k=[u_{k-1},\cdots,u_1,u_0],\quad\text{such that}\quad x_k=x^*.
$$

This is equivalent to $\text{rank}(M_c)=n$, where
$M_c = [B, AB, A^2B, \ldots, A^{n-1}B]\in\mathbb{R}^{n\times nm}$ is the controllability matrix.

$$
\begin{aligned} x_n &= Ax_{n-1} + Bu_{n-1} \\ &= A(Ax_{n-2} + Bu_{n-2}) + Bu_{n-1} \\ &= A^2x_{n-2} + ABu_{n-2} + Bu_{n-1} \\ &= A^nx_0 + A^{n-1}Bu_0 + \cdots + ABu_{n-2} + Bu_{n-1} \\ &= A^nx_0 + M_c\mathbf u_n \end{aligned}
$$

$$
\mathbf u_n = M_c^\top(M_cM_c^\top)^{-1}(x^*-A^nx_0)
$$

### Observability

A LTI system is said to be **observable** if,

$$
\forall x_0\in\mathbb{R}^n\exists k>0, \mathbf{y_k}=[y_0,y_1,\ldots,y_{k-1}]^\top \Rightarrow x_0.
$$

This is equivalent to $\text{rank}(M_o)=n$, where
$M_o = [C^\top, (CA)^\top, (CA^2)^\top, \ldots, (CA^{n-1})^\top]^\top\in\mathbb{R}^{np\times n}$ is the observability matrix.

$$
\begin{aligned} y_0 &= Cx_0 \\ y_1 &= Cx_1 = CAx_0 \\ &\ \ \vdots \\ y_{n-1} &= CA^{n-1}x_0 \end{aligned}\quad\Rightarrow\quad \mathbf y_n=\begin{bmatrix}y_0\\y_1\\\vdots\\y_{n-1}\end{bmatrix}=\begin{bmatrix}C\\CA\\\vdots\\CA^{n-1}\end{bmatrix}x_0=M_ox_0
$$

$$
x_0 = (M_o^\top M_o)^{-1}M_o^\top \mathbf y_n
$$

## The Optimality

### Optimal Estimator: Kalman Filter

**Goal:**

$$
\min_{\hat{x}_{k|k}} \mathbb{E}[(x_k - \hat{x}_{k|k})(x_k - \hat{x}_{k|k})^\top\mid y_1, \ldots, y_k]
$$

**Solution:**

$$
\begin{aligned} \hat x_{k\vert k-1}&=A\hat x_{k-1\vert k-1}+Bu_{k-1} \\ \hat P_{k\vert k-1} &= A\hat P_{k-1\vert k-1}A^\top+W_{k-1} \\ K_k &= \hat P_{k\vert k-1}C^\top(C\hat P_{k\vert k-1}C^\top+V_k)^{-1} \\ \hat x_{k\vert k} &= \hat x_{k\vert k-1} + K_k(y_k-C\hat x_{k\vert k-1}) \\ \hat P_{k\vert k} &= \hat P_{k\vert k-1}-K_kC\hat P_{k\vert k-1} = (\hat P_{k\vert k-1}^{-1}+C^\top V_k^{-1}C)^{-1}\\ \end{aligned}
$$

### Optimal Regulator: LQR

**Goal:**

$$
\min_{\{u_k\}} \mathbb{E}\left[x_N^\top Q_N x_N + \sum_{k=0}^{N-1}(x_k^\top Q_k x_k + u_k^\top R_k u_k)\right]
$$

**Solution:**

$$
\begin{aligned} S_N &= Q_N \\ L_k &= (R_k+B_k^\top S_{k+1}B_k)^{-1}B_k^\top S_{k+1}A_k \\ S_k &= Q_k + A_k^\top S_{k+1}(A_k-B_kL_k) \\ u_k &= -L_k x_k \end{aligned}
$$

### Linear Quadratic Gaussian (LQG)

The **separation principle** states that the design of the optimal controller and the optimal observer can be separated. The optimal control law is given by:

$$
u_k = -L_k \hat x_{k|k}
$$

where $\hat x_{k|k}$ is the state estimate provided by the Kalman filter.

<CenteredImg src="/pic/lqg_20250919171224.png" width="70%" caption="'Inertial-Based LQG Control' by Daniel Engelsman" />

## The Duality

### The Duality in Control Theory

**Controllability vs Observability**
For the original system $\Sigma=(A,B,C)$, the dual system is defined as $\Sigma^*=(A^\top,C^\top,B^\top)$.

- $\Sigma$ is controllable $\Leftrightarrow$ $\Sigma^*$ is observable
- $\Sigma$ is observable $\Leftrightarrow$ $\Sigma^*$ is controllable

**Controller vs Observer**

- Feedback controller $u_k = -L_k x_k$ "suppresses" the state deviation $x_k$ through inputs
- State observer $\hat x_{k|k} = \hat x_{k|k-1} + K_k(y_k - C\hat x_{k|k-1})$ "corrects" the state estimate $\hat x_{k|k}$ through measurements
- The design of $L_k$ and $K_k$ are dual problems

### The Duality in LQR and Kalman Filter (Optimization)

Optimization formulation of LQR:

$$
\min_{x_{1:N},u_{1:N-1}}x_N^\top Q_N x_N + \sum_{k=0}^{N-1}\bigg[x_k^\top Q_k x_k + u_k^\top R_k u_k\bigg]
$$

Optimization formulation of Kalman Filter:

$$
\min_{x_{1:N},\omega_{1:N-1}} (x_0-\hat x_{0|0})^\top P_0^{-1}(x_0-\hat x_{0|0}) + \sum_{k=0}^{N-1}\bigg[(y_k - Cx_k)^\top V_k^{-1}(y_k - Cx_k) + \omega_k^\top W_k^{-1}\omega_k\bigg]
$$

subject to $x_{k+1} = A x_k + Bu_k + \omega_k$.

**Duality:**

$$
A \leftrightarrow A^\top, \quad B \leftrightarrow C^\top, \quad Q \leftrightarrow W, \quad R \leftrightarrow V
$$

### The Duality in LQR and Kalman Filter (Riccati)

Riccati Equation in LQR:

$$
\begin{cases} L_k = (R_k+B_k^\top S_{k+1}B_k)^{-1}B_k^\top S_{k+1}A_k \\ S_k = Q_k + A_k^\top S_{k+1}(A_k-B_kL_k) \end{cases}
$$

$$
S=A^\top SA+Q-A^\top SB(B^\top SB+R)^{-1}B^\top SA
$$

Riccati Equation in Kalman Filter:

$$
\begin{cases} \hat P_{k\vert k-1} = A\hat P_{k-1\vert k-1}A^\top+W_{k-1} \\ K_k = \hat P_{k\vert k-1}C^\top(C\hat P_{k\vert k-1}C^\top+V_k)^{-1} \\ \hat P_{k\vert k} = \hat P_{k\vert k-1}-K_kC\hat P_{k\vert k-1} = (\hat P_{k\vert k-1}^{-1}+C^\top V_k^{-1}C)^{-1} \end{cases}
$$

$$
P=A P A^\top + W - A P C^\top (C P C^\top + V)^{-1} C P A^\top
$$

**Duality:**

$$
A \leftrightarrow A^\top, \quad B \leftrightarrow C^\top, \quad Q \leftrightarrow W, \quad R \leftrightarrow V, \quad S \leftrightarrow P
$$

## The Failure

### The Paradox of Optimality

**LQR Robustness (SISO systems):**

- $\geq 60 \deg$ Phase Margin
- $\geq 6 \text{ dB}$ Gain Margin
- Infinite gain reduction margin

**Kalman Filter Robustness:**

- Dual robustness properties at sensor output
- Excellent margins against sensor errors

<CenteredImg src="/pic/bode_lqr_lqg.png" width="70%" />

### The Fundamental Trade-Off

**LQR's Need for High-Gain Feedback:**

- Large **Q** & Small **R**
- Excellent stability margins

**KF's Need for High-Gain Feedback:**

- Large **W** & Small **V**
- Prompt response to new measurements

_Optimizing for individual robustness leads to a **fragile** combined LQG system._

**The Destructive Feedback Loop:**

1. High-gain **L** reacts aggressively to state deviations
2. High-gain **K** amplifies sensor noise
3. This creates a **positive feedback** loop
4. Resulting in potential **instability** of the system

**No stability guarantee** for imperfect models, leading to the development of **$H_\infty$ Control**
