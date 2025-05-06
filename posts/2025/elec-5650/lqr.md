# ELEC 5650 - Linear Quadratic Regulator

> "We have decided to call the entire field of control and communication theory, whether in the machine or in the animal, by the name Cybernetics, which we form from the Greek ... for steersman."
>
> &nbsp;_-- by Norbert Wiener_{style="float:right"}

<CenteredImg src="/public/posts/elec-5650/lqg.png" width=60% />

This is the lecture notes for 'ELEC 5650: Networked Sensing, Estimation and Control' in the 2024-25 Spring semester, delivered by Prof. Ling Shi at HKUST. In this session, we will cover Linear Quadratic Regulator (LQR) theory and its applications in control systems.

1. [_Mathematic Tools_](./math-tools.md)
2. [_Estimation Theory_](./estimation.md)
3. [_Kalman Filter_](./kalman-filter.md)
4. [**Linear Quadratic Regulator**](./lqr.md) <--

<Badges>
<img src="/public/tags/hkust.svg">
<img src="/public/tags/control.svg">
</Badges>

## Linear Quadratic Regulator

### Dynamic Programming

Consider a discrete-time dynamical system over a finite horizon $N$. The goal is to find a control policy that minimizes the expected cumulative cost:

$$
J^\pi(x_0)=\mathbb E_{\omega_k}\left\{g_N(x_N)+\sum_{k=0}^{N-1}g_k[x_k,\mu_k(x_k),\omega_k]\right\}
$$

The system evolves according to:

$$
x_{k+1} = f_k(x_k,u_k,\omega_k)
$$

#### Principle of Optimality

> "An optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision."
>
> &nbsp;_-- Richard Bellman_{style="float:right"}

Optimal principle allows us to break down the multi-stage optimization problem into a sequence of simpler single-stage problems.

Let $\pi^*=\set{\mu_0^*,\cdots,\mu_{N-1}^*}$ be an optimal policy. Then for any $k$ and reachable state $x_k$, the sub-policy $\pi_{k\to N-1}^*=\set{\mu_k^*,\cdots,\mu_{N-1}^*}$ must minimize the cost-to-go:

$$
J_{k\to N}(x_k)=\mathbb E_{\omega_k}\left\{g_N(x_N)+\sum_{i=k}^{N-1}g_i[x_i,\mu_i(x_i),\omega_i]\right\}
$$

This implies

$$
J_k(x_k) = \min_{u_k}\mathbb E_{\omega_k}\left\{g_k[x_k,\mu_k(x_k),\omega_k]+J_{k+1}f[x_k,\mu_k(x_k),\omega_k]\right\}
$$

#### Dynamic Programming Algorithm

The solution is computed recursively through the following steps:

#### Terminal Cost

$$
J_N(x_N)=g_N(x_N)
$$

#### Backward Recursion

$$
J_k(x_k)=\min_{u_k\in\mathcal U}\mathbb E_{\omega_k}\left\{g_k(x_k,u_k,\omega_k)+J_{k+1}[f(x_k,u_k,\omega_k)]\right\}
$$

$$
\mu_k^*(x_k)=\arg\min_{u_k\in\mathcal U}\mathbb E_{\omega_k}\left\{g_k(x_k,u_k,\omega_k)+J_{k+1}[f(x_k,u_k,\omega_k)]\right\}
$$

Consider the following linear system

$$
x_{k+1} = Ax_k+Bu_k
$$

We wants to find a series of $u_0,\cdots,u_{N-1}$ to minimize

$$
J=\underbrace{x_N^TQx_N}_{g_N(x_N)}+\sum_{k=0}^{N-1}(\underbrace{x_k^TQx_k+u_k^TRu_k}_{g_k(x_k,u_k,\omega_k)}),\quad Q\succeq0,R\succ0
$$

### Solution

#### Terminal Cost

$$
J_N(x_N)=g_N(x_N)=x_N^TQx_N\triangleq x_N^TP_Nx_N
$$

#### Backward Recursion

$$
\begin{aligned}
J_{N-1}(x_{N-1}) &= \min_{u_{N-1}}\left\{ x_{N-1}^TQx_{N-1}+u_{N-1}^TRu_{N-1} + J_N(x_N) \right\} \\
&= \min_{u_{N-1}}\left\{ x_{N-1}^TQx_{N-1}+u_{N-1}^TRu_{N-1} + x_N^TP_Nx_N \right\} \\
&= \min_{u_{N-1}}\left\{ x_{N-1}^TQx_{N-1}+u_{N-1}^TRu_{N-1} + (Ax_{N-1}+Bu_{N-1})^TP_N(Ax_{N-1}+Bu_{N-1}) \right\} \\
&= \min_{u_{N-1}}\left\{u_{N-1}^T(R+B^TP_NB)u_{N-1}+2x_{N-1}^TA^TP_NBu_{N-1} + x_{N-1}^T(Q+A^TP_NA)x_{N-1}\right\} \\
\end{aligned}
$$

$$
u_{N-1}^*= \underbrace{-(R+B^TP_NB)^{-1}B^TP_NA}_{L_{N-1}}x_{N-1}
$$

$$
\begin{aligned}
J_{N-1}(x_{N-1}) &= x_{N-1}^TP_{N-1}x_{N-1} \\
&= u_{N-1}^T(R+B^TP_NB)u_{N-1}+2x_{N-1}^TA^TP_NBu_{N-1} + x_{N-1}^T(Q+A^TP_NA)x_{N-1} \\
&= x_{N-1}^T[A^TP_N^TB(R+B^TP_NB)^{-1}B^TP_NA - 2A^TP_NB(R+B^TP_NB)^{-1}B^TP_NA+Q+A^TP_NA]x_{N-1}\\
&= x_{N-1}^T[Q+A^TP_NA-A^TP_N^TB(R+B^TP_NB)^{-1}B^TP_NA]x_{N-1}
\end{aligned}
$$

$$
P_{N-1} = Q+A^TP_NA-A^TP_N^TB(R+B^TP_NB)^{-1}B^TP_NA
$$

#### Summary

$$
P_N=Q,\quad
\begin{cases}
u_k^* = L_kx_k \\
L_k = -(B^TP_{k+1}B+R)^{-1}B^TP_{k+1}A \\
P_k = A^TP_{k+1}A+Q-A^TP_{k+1}B(B^TP_{k+1}B+R)^{-1}B^TP_{k+1}A
\end{cases}
$$

## Riccati Equation

Define

$$P_{k+1}=h(P_k)=A^TP_{k}A+Q-A^TP_{k}B(B^TP_{k}B+R)^{-1}B^TP_{k}A$$

Assume $(A,B)$ is controllable, $(A,\sqrt{Q})$ is observable, then the following holds

1. $\exists P\succ0,\forall P_0\succeq0,\lim_{k\to\infty}P_k=P$
2. $P$ is the unique solution to $P=h(P)$
3. $D=A+BL$ is stable, where $L=-(B^TPB+R)^{-1}B^TPA$

### Existence

We firstly prove $\exists P\succ0,P=h(P)$

Assume $P_0=0$, then $P_k=h(P_{k-1})=h^{k-1}(P_1)=h^k(P_0)=h(0)\succeq0$. So for any control sequence

$$
\min_{i=0}^{k-1}\underbrace{(x_i^TQx_i+u_i^TRu_i)}_{x_0^Tg^{k}(0)x_0}\le\min_{i=0}^{k}\underbrace{(x_i^TQx_i+u_i^TRu_i)}_{x_0^Tg^{k+1}(0)x_0}
$$

If $P_0=0$, then $\forall X\succeq Y,h(X)\succeq h(Y)$. For any specific control sequence $\bar u_0,\cdots\bar u_k$, there exist an associated cost $\bar J_k=\sum_{i=0}^{k-1}(x_i^TQx_i+\bar u_i^TRu_i)$ woule be a constant.

$$
\forall k, x_0^TP_kx_0=x_0^Th^k(P_0)x_0=x_0^Th^k(0)x_0\le\bar J_k
$$

So $P_k$ converges when $P_0=0$

### Stability

$$
\begin{aligned}
P &= h(P) \\
&= A^TP_{k}A+Q-A^TP_{k}B(B^TP_{k}B+R)^{-1}B^TP_{k}A \\
&= D^TPD+Q+L^TRL
\end{aligned}
$$

$$
x_{k+1}=Ax_k+Bu_k=(A+BL)x_k = Dx_k
$$

To show $D$ is stable, we only need to show that $\forall x_0,x_k\to0$ as $k\to\infty$

$$
\begin{cases}
x_{k+1}^TPx_{k+1} - x_k^TPx_k = x_k^TD^TPDx_k-x_k^TPx_k=-x_k^T(Q+L^TRL)x_k\\
x_{k}^TPx_{k} - x_{k-1}^TPx_{k-1} =-x_{k-1}^T(Q+L^TRL)x_{k-1} \\
\qquad\vdots \\
x_{1}^TPx_{1} - x_{0}^TPx_{0} =-x_{0}^T(Q+L^TRL)x_{0} \\
\end{cases}
$$

$$
x_{k+1}^TPx_{k+1}=x_0^TPx_0-\sum_{i=0}^kx_i^T(Q+L^TRL)x_i
$$

Because $P\ge0$, $x_{k+1}^TPx_{k+1}\succeq0$, hence

$$
\sum_{i=0}^kx_i^T(Q+L^TRL)x_i \le x_0^TPx_0 < \infty
$$

This implies

$$
\lim_{k\to\infty}x_k^T(Q+L^TRL)x_k=0
$$

While $Q+L^TRL\succ0$, we must have

$$
\lim_{k\to\infty}x_k=0
$$

Hence, the stability is proved.

### Convergence

Next we prove $\forall P\succeq0,P=h(P)$. Because $\rm u^*$ is the optimal solution, $\bar J_k\ge x_0^Th^k(P_0)x_0$.

$$
\begin{aligned}
\bar J_k &= x_k^TP_0x_k+\sum_{i=0}^{k-1}(x_i^TQx_i+u_i^TRu_i) \\
&= x_0^T(D^k)^TP_0D^kx_0+\sum_{i=0}^{k-1}(x_i^T(Q+L^TRL)x_i) \\
&= x_0^T\left[(D^k)^TP_0D^k+\sum_{i=0}^{k-1}(D^i)^T(Q+L^TRL)D^i\right]x_0 \\
&= x_0^T\left[(D^k)^TP_0D^k+P-(D^k)^TPD^k\right]x_0 \\
\end{aligned}
$$

$$
\lim_{k\to\infty}\bar J_k = x_0^TPx_0
$$

$$
\forall P_0,
\lim_{k\to\infty}x_0^Th^k(P_0)x_0 = x_0^TPx_0
$$

$$
\lim_{k\to\infty}P_k=\lim_{k\to\infty}h^k(P_0)=P
$$

### Uniqueness

Assume $\bar P$ is another solution to $\bar P=h(\bar P)$. If $P'\ne P$, then $\exists x_0,x_0^TP'X_0<x_0^TPx_0$. Contradict to the optimal feature. Hence, $P'=P$

## Linear Quadratic Gaussian

$$
\begin{aligned}
x_{k+1} &= Ax_k+Bu_k+\omega_k,&\omega_k\sim\mathcal N(0,W) \\
y_k &= Cx_k + \nu_k, &\nu_k\sim\mathcal N(0,V)
\end{aligned}
$$

We want to minimize the quadratic cost function:

$$
J=\mathbb E\left[{x_N^TQx_N}+\sum_{k=0}^{N-1}(x_k^TQx_k+u_k^TRu_k)\right],\quad Q\succeq0,R\succ0
$$

By seperation principle, we can decomposed the problem to an optimal estimatior and an optimal controller.

<CenteredImg src="/public/posts/elec-5650/lqg.png" width="50%" />

### Kalman Filter

The Kalman filter provides the optimal state estimate $\hat{x}_k$ with error covariance $\Sigma_k$:

#### Time Update

$$
\begin{aligned}
\hat{x}_{k|k-1} &= A\hat{x}_{k-1\vert k-1} + Bu_{k-1} \\
\hat{P}_{k|k-1} &= A\hat{P}_{k-1\vert k-1}A^T + W
\end{aligned}
$$

#### Measurement Update

$$
\begin{aligned}
K_k &= \hat{P}_{k|k-1}C^T(C\hat{P}_{k|k-1}C^T + V)^{-1} \\
\hat{x}_{k\vert k} &= \hat{x}_{k|k-1} + K_k(y_k - C\hat{x}_{k|k-1}) \\
\hat{P}_{k\vert k} &= (I - K_kC)\hat{P}_{k|k-1}
\end{aligned}
$$

### Linear Quadratic Regulator

$$
J = \sum_{k=0}^{\infty} (x_k^T Q x_k + u_k^T R u_k)
$$

Solve $P$ from

$$
P = A^T P A - A^T P B (R + B^T P B)^{-1} B^T P A + Q
$$

And solve $L$ from

$$
L = -(R + B^T P B)^{-1} B^T P A
$$

$$
u_k=Lx_k
$$
