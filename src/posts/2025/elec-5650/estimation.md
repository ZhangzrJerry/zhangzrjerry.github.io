# ELEC 5650 - Estimation Theory

> "We have decided to call the entire field of control and communication theory, whether in the machine or in the animal, by the name Cybernetics, which we form from the Greek ... for steersman."
>
> &nbsp;_-- by Norbert Wiener_{style="float:right"}

<CenteredImg src="/posts/elec-5650/probability.png" width=50% />

This is the lecture notes for "ELEC 5650: Networked Sensing, Estimation and Control" in the 2024-25 Spring semester, delivered by Prof. Ling Shi at HKUST. In this session, we will explore fundamental concepts and techniques in estimation theory, including maximum a posteriori (MAP) estimation, minimum mean squared error (MMSE) estimation, maximum likelihood (ML) estimation, weighted least squares estimation, and linear minimum mean square error (LMMSE) estimation.

1. [_Mathematic Tools_](./math-tools.md)
2. [**Estimation Theory**](./estimation.md) <--
3. [_Kalman Filter_](./kalman-filter.md)
4. [_Linear Quadratic Regulator_](./lqr.md)

<Badges>
<img src="/tags/hkust.svg">
<img src="/tags/math.svg">
</Badges>

## MAP (Maximum A Posterior) Estimation

$x$ is the parameter to be estimated

$$
\hat x=\arg\max_x \begin{cases}
f(x|y),&x\text{ is continuous} \\
p(x|y),&x\text{ is discrete} \\
\end{cases}
$$

## MMSE (Minimum Mean Squared Error) Estimation

$$
\hat x=\arg\min_{\hat x}E[e^Te|y]=\arg\min_{\hat x}E[\hat x|y],\ e=x-\hat x
$$

$$
\hat x=\int x\cdot f(x|y)\ {\rm d}x\quad\text{or}\quad\sum x\cdot p(x|y)
$$

**Proof**:

$$
\begin{aligned}
E[e^Te] &= E[(x-\hat x)^T(x-\hat x)|y] \\
&= E[x^Tx|y] - 2\hat x^TE[x|y]+\hat x^T\hat x \\
\end{aligned}
$$

$$
\frac\partial{\partial\hat x}(E[x^Tx|y] - 2\hat x^TE[x|y]+\hat x^T\hat x)=0
$$

$$
-2E[X|Y]+2\hat x=0
$$

$$
\hat x_\text{MMSE} = E[X|Y]
$$

## ML (Maximum Likelihood) Estimation

Non Bayesian. $p(y|x)$ is conditional probability and $p(y;x)$ is parameterized probability, $p(y|x)\not\Leftrightarrow p(y;x)$.

Assume we have $n$ measurements $\mathcal X=(X_1,\cdots,X_n)$, we use $p(\mathcal X;\theta)$ to describe the joint probability of $\mathcal X$.

$$
\hat\theta_n=\arg\max_\theta\begin{cases}
f(\mathcal X;\theta),&\theta\text{ is continuous} \\
p(\mathcal X;\theta),&\theta\text{ is discrete} \\
\end{cases}
$$

$$
p(\mathcal X;\theta)=\prod_{i=1}^np(X_i;\theta)\quad\Leftrightarrow\quad\log p(\mathcal X;\theta)=\sum_{i=1}^n\log p(X_i;\theta)
$$

### MAP & ML

$$
\begin{aligned}
\hat\theta_\text{MAP} &= \arg\max_{\theta} p(\theta|x)=\arg\max_\theta\frac{p(\theta)p(x|\theta)}{p(x)}p(\theta|x)=\arg\max_\theta p(\theta)p(x|\theta) \\
\hat\theta_\text{ML} &= \arg\max_\theta p(x;\theta)
\end{aligned}
$$

## Weighted Least Square Estimation

$$
\mathcal E(x) = ||Ax-b||^2_\Sigma=x^TA^T\Sigma^{-1}Ax-2b^T\Sigma^{-1}Ax+b^T\Sigma^{-1}b
$$

$$
\nabla\mathcal E = 2A^T\Sigma^{-1}Ax - 2A^T\Sigma^{-1}b
$$

$$
\hat x = (A^T\Sigma^{-1}A)^{-1}A^T\Sigma^{-1}b
$$

## LMMSE (Linear Minimum Mean Square Error) Estimation

LMMSE estimation wants to find a linear estimator

$$
\hat x=Ky+b
$$

such that minimize the mean square error

$$
\begin{aligned}
\text{MSE} &= E[(x-\hat x)^T(x-\hat x)] \\
&= E[x^Tx]-2E[x^T\hat x]+E[\hat x^T\hat x] \\
&= E[x^Tx]-2E[x^T(Ky+b)]+E[(Ky+b)^T(Ky+b)] \\
\end{aligned}
$$

$$
\frac{\partial\text{MSE}}{\partial b} = -2E[x]+2b+2KE[y] = 0
$$

$$
b=\mu_x-K\mu_y
$$

$$
\begin{aligned}
\text{MSE} &= E[x^Tx]-2E[x^T(Ky+b)]+E[(Ky+b)^T(Ky+b)] \\
&= E[x^Tx]-2E[x^T(Ky+\mu_x-K\mu_y)]+E[(Ky+\mu_x-K\mu_y)^T(Ky+\mu_x-K\mu_y)] \\
&= E[x^Tx]-2E[x^TKy]-2\mu_x^T\mu_x+2\mu_x^TK\mu_y+E[y^TK^TKy]+\mu_x^T\mu_x-2\mu_x^TK\mu_y+\mu_y^TK^TK\mu_y
\end{aligned}
$$

$$
\frac{\partial\text{MSE}}{\partial K} = -2\Sigma_{xy}+2K\Sigma_{yy}=0
$$

$$
K=\Sigma_{xy}\Sigma_{yy}^{-1}
$$

$$
\hat x=Ky+b=\mu_x+\Sigma_{xy}\Sigma_{yy}^{-1}(y-\mu_y)
$$

$$
\Sigma_{\hat x\hat x} = \Sigma_{xx}-\Sigma_{xy}\Sigma_{yy}^{-1}\Sigma_{yx}
$$

### Orthogonality Principle

$$
\begin{aligned}
\langle x-Ky-b,y\rangle &= E[(x-Ky-b)y^T] \\
&= E[xy^T]-KE[yy^T]-bE[y^T] \\
&= \Sigma_{xy}+\mu_x\mu_y^T-K(\Sigma_{yy}+\mu_y\mu_y^T)-(\mu_x-K\mu_y)\mu_y^T \\
&= \Sigma_{xy} - (\Sigma_{xy}\Sigma_{yy}^{-1})\Sigma_{yy} \\
&=0
\end{aligned}
$$

$$
x-(Ky+b)\perp y
$$

This shows that error $e=x-\hat x$ is independent of observation $y$.

### Innovation Process

Calculating $\Sigma_{yy}$ consumes lots of time, however, if $\Sigma_{yy}$ is diagonal the thing becomes easy. By G.S. process, we can obtain orthogonality vectors $\vec e_1,\cdots\vec e_k$ and the lower triangular transform matrix $F$ from $\vec y_1,\cdots,\vec y_k$. The key idea of ​​orthogonal projection is to decompose the observation vector $y_k$ into **a part related to the past prediction value**, which can be predicted by $y_1,\cdots y_{k-1}$, and **a new part that is irrelevant to the past prediction value (innovation)**.

$$
e=Fy
$$

<CenteredImg src="/posts/elec-5650/gs-process.svg" width = 90% />

Then the covariance can be calculated by

$$
\Sigma_{ee}=F\Sigma_{yy}F^T,\quad\Sigma_{ex}=F\Sigma_{yx}
$$

$$
K_e=\Sigma_{ex}\Sigma_{ee}^{-1}=F\Sigma_{yx}(F^T)^{-1}\Sigma_{yy}^{-1}F^{-1}
$$

Although $K_e$ is not equal to $K$, it serves as the Kalman gain in the transformed or projected space defined by the matrix $F$.

For new coming $\vec y_{t+1}$ we can find $\vec e^{k+1}$ by G.S. process

$$
\begin{aligned}
e_{k+1}&=y_{k+1}-\hat y_{k+1|k}\\
&=y_{k+1}-\text{proj}(y_{k+1};\mathcal E_k)\\
&=y_{k+1}-\sum_{i=1}^k\frac{\langle y_{k+1},e_i\rangle}{\langle e_i,e_i\rangle}\cdot e_i
\end{aligned}
$$

It satisfies

$$
\langle e_{k+1},y_{i}\rangle=E[e_{k+1}y_{i}^T]=0,\quad\forall i\in[1,k]
$$

To estimate $x$ at $k+1$

$$
\begin{aligned}
\hat x_{k+1}&=\text{proj}(x_{k+1};\mathcal E_{k+1})\\
&=\sum_{i=1}^{k+1}\frac{\langle x_{k+1},e_i\rangle}{\langle e_i,e_i\rangle}\cdot e_i \\
&=\sum_{i=1}^k\frac{\langle x_{k+1},e_i\rangle}{\langle e_i,e_i\rangle}\cdot e_ + \frac{\langle x_{k+1},e_{k+1}\rangle}{\langle e_{k+1},e_{k+1}\rangle}\cdot e_{k+1}\\
&=\sum_{i=1}^k\frac{\langle x_k,e_i\rangle}{\langle e_i,e_i\rangle}\cdot e_i + \frac{\langle x_{k+1},e_{k+1}\rangle}{\langle e_{k+1},e_{k+1}\rangle}\cdot e_{k+1}\\
&= \hat x_k+ \frac{\langle x_{k+1},e_{k+1}\rangle}{\langle e_{k+1},e_{k+1}\rangle}\cdot e_{k+1}
\end{aligned}
$$

<!-- #TODO: Prove $\langle x_{k+1},e_i\rangle=\langle x_k,e_i\rangle,\forall i\in[1,k]$ -->
