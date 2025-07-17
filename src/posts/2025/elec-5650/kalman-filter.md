# ELEC 5650 - Kalman Filter

> "We have decided to call the entire field of control and communication theory, whether in the machine or in the animal, by the name Cybernetics, which we form from the Greek ... for steersman."
>
> &nbsp;_-- by Norbert Wiener_{style="float:right"}

<CenteredImg src="/posts/2025/elec-5650/kf.png" width=75% />

This is the lecture notes for "ELEC 5650: Networked Sensing, Estimation and Control" in the 2024-25 Spring semester, delivered by Prof. Ling Shi at HKUST. In this session, we will deviate Kalman Filter from three different perspectives: Geometric, Probabilistic, and Optimization approaches. Each perspective provides unique insights into understanding and implementing the Kalman Filter algorithm.

1. [_Mathematic Tools_](./math-tools.md)
2. [_Estimation Theory_](./estimation.md)
3. [**Kalman Filter**](./kalman-filter.md) <--
4. [_Linear Quadratic Regulator_](./lqr.md)

<Badges>
<img src="/tags/hkust.svg">
<img src="/tags/sense.svg">
</Badges>

## Takeaway Notes

Consider an LTI system with initial conditions $\hat x_{0\vert0}$ and $\hat P_{0\vert0}$

$$
\begin{aligned}
x_{k+1} &= Ax_k+Bu_k+\omega_k,&\omega_k\sim\mathcal N(0,Q) \\
y_k &= Cx_k + \nu_k, &\nu_k\sim\mathcal N(0,R)
\end{aligned}
$$

Find the estimation of $x_k$ given $\set{u_0,u_1\cdots,u_k}$ and $\set{y_0,y_1\cdots,y_k}$.

### Assumptions

1. $(A,B)$ is controllable and $(A,C)$ is observable
2. $Q\succeq0,R\succeq0,P_0\succeq0$
3. $\omega_k$, $\nu_k$ and $\hat x_0$ are mutually uncorelated
4. The future state of the system is conditionally independent of the past states given the current state

### Time Update

$$
\begin{aligned}
\hat x_{k\vert k-1}&=A\hat x_{k-1\vert k-1}+Bu_k \\
\hat P_{k\vert k-1} &= A\hat P_{k-1\vert k-1}A^T+Q
\end{aligned}
$$

### Measurement Update

$$
\begin{aligned}
K_k &= \hat P_{k\vert k-1}C^T(C\hat P_{k\vert k-1}C^T+R)^{-1} \\
\hat x_{k\vert k} &= \hat x_{k\vert k-1} + K_k(y_k-C\hat x_{k\vert k-1}) \\
\hat P_{k\vert k} &= \hat P_{k\vert k-1}-K_kC\hat P_{k\vert k-1} = (\hat P_{k\vert k-1}^{-1}+C^TR^{-1}C)^{-1}\\
\end{aligned}
$$

## Geometric Perspective (LMMSE Estimation)

The Geometric perspective views Kalman Filter as a Linear Minimum Mean Square Error (LMMSE) estimator, which is rooted in orthogonal projection theory in Hilbert space. The key insight is that the Kalman Filter's innovation term $e_k$ is orthogonal to all past observations $\mathcal{Y}_{k-1}$, ensuring the **new information being incorporated is statistically independent of previous measurements**, thus maintaining the estimator's optimality.

<CenteredImg src="/posts/2025/elec-5650/lmmse.png" width = 80% />

### Time Update

$$
\begin{aligned}
\hat{x}_{k\vert k-1} &= \text{proj}_{\mathcal{Y}_{k-1}}(x_k) \\
&= \text{proj}_{\mathcal{Y}_{k-1}}(Ax_{k-1}+Bu_k+\omega_k) \\
&= A\cdot\text{proj}_{\mathcal{Y}_{k-1}}(x_{k-1}) + B\cdot\text{proj}_{\mathcal{Y}_{k-1}}(u_k)+\text{proj}_{\mathcal{Y}_{k-1}}(\omega_k) \\
&= A\hat x_{k-1\vert k-1} + Bu_k \\
\\
\tilde{x}_{k\vert k-1}&= x_k-\hat{x}_{k\vert k-1} \\
\\
\hat{P}_{k\vert k-1} &= \mathbb E[\tilde{x}_{k\vert k-1}\tilde{x}_{k\vert k-1}^T] \\
&= \mathbb{E}[(x_k-\hat{x}_{k\vert k-1})(x_k-\hat{x}_{k\vert k-1})^T] \\
&= \mathbb{E}[(A\tilde{x}_{k-1\vert k-1}+\omega_k)(A\tilde{x}_{k-1\vert k-1}+\omega_k)^T] \\
&= A\mathbb{E}[\tilde{x}_{k-1\vert k-1}\tilde{x}_{k-1\vert k-1}^T]A^T+2A\mathbb{E}[\tilde{x}_{k-1\vert k-1}\omega_k^T]+\mathbb{E}[\omega_k\omega_k^T] \\
&= A\hat{P}_{k-1\vert k-1}A^T+Q
\end{aligned}
$$

### Measurement Update

$$
\begin{aligned}
e_k &= y_k - \hat{y}_{k\vert k-1} \\
&= y_k - \text{proj}_{\mathcal{Y}_{k-1}}(y_k) \\
&= y_k - \text{proj}_{\mathcal{Y}_{k-1}}(Cx_k+\nu_k) \\
&= y_k - C\cdot\text{proj}_{\mathcal{Y}_{k-1}}(x_k)-\text{proj}_{\mathcal{Y}_{k-1}}(\nu_k) \\
&= y_k - C\hat{x}_{k\vert k-1} \\
\\
\hat{x}_{k\vert k} &= \text{proj}_{\mathcal{Y}_{k}}(x_k) \\
&= \hat{x}_{k\vert k-1}+K_ke_k \\
&= \hat{x}_{k\vert k-1}+K_k(y_k - C\hat{x}_{k\vert k-1}) \\
\\
\tilde{x}_{k\vert k}&= x_k-\hat{x}_{k\vert k} \\
\\
\hat{P}_{k\vert k} &= \mathbb{E}[\tilde{x}_{k\vert k}\tilde{x}_{k\vert k}^T] \\
&= \mathbb{E}[(x_k-\hat{x}_{k\vert k})(x_k-\hat{x}_{k\vert k})^T] \\
&= \mathbb{E}[(\tilde{x}_{k\vert k-1}-K_ke_k)(\tilde{x}_{k\vert k-1}-K_ke_k)^T] \\
&= \mathbb{E}[\tilde{x}_{k\vert k-1}\tilde{x}_{k\vert k-1}^T] - 2K_k\mathbb{E}[e_k\tilde{x}_{k\vert k-1}^T]+K_k\mathbb{E}[e_ke_k^T]K_k^T \\
&= \hat{P}_{k\vert k-1} - 2K_k\mathbb{E}[(y_k-C\hat{x}_{k\vert k-1})\tilde{x}_{k\vert k-1}^T]+K_k\mathbb{E}[(y_k-C\hat{x}_{k\vert k-1})(y_k-C\hat{x}_{k\vert k-1})^T]K_k^T \\
&= \hat{P}_{k\vert k-1} - 2K_kC\hat{P}_{k\vert k-1} + K_k(C\hat{P}_{k\vert k-1}C^T+R)K_k^T \\
\\
\frac{\partial\text{tr}(\hat{P}_{k\vert k})}{\partial K_k} &= -2C\hat{P}_{k\vert k-1} + 2K_k(C\hat{P}_{k\vert k-1}C^T+R) = 0 \\
K_k &= \hat{P}_{k\vert k-1}C^T(C\hat{P}_{k\vert k-1}C^T+R)^{-1}
\end{aligned}
$$

## Probabilistic Perspective (Bayesian Estimation)

The filter maintains a Gaussian belief state that gets refined through sequential application of Bayes' rule, where prediction corresponds to Chapman-Kolmogorov propagation and update implements Bayesian conditioning.

$$
\begin{aligned}
&p(x_{k}|y_{1:k}, u_{1:k})\\=&p(x_{k}|y_k,y_{1:k-1}, u_{1:k})\\=&\frac{p(y_{k}|x_k,y_{1:k-1}, u_{1:k})\cdot p(x_{k}|y_{1:k-1}, u_{1:k})}{p(y_{k}|y_{1:k-1}, u_{1:k})}\\
=&\eta\cdot\underbrace{p(y_k|x_k)}_\text{observation model}\cdot\underbrace{p(x_{k}|y_{1:k-1}, u_{1:k})}_\text{prior belief} \\
=&\eta\cdot p(y_k|x_k)\cdot\int p(x_{k},x_{k-1}|y_{1:k-1}, u_{1:k})\ {\rm d}x_{k-1} \\
=&\eta\cdot p(y_k|x_k)\cdot\int p(x_{k}|x_{k-1},y_{1:k-1},u_{1:k})\cdot p(x_{k-1}|y_{1:k-1},u_{1:k})\ {\rm d}x_{k-1} \\
=&\eta\cdot p(y_k|x_k)\cdot\int\underbrace{p(x_{k}|x_{k-1},u_{k})}_\text{motion model}\cdot\underbrace{p(x_{k-1}|y_{1:k-1},u_{1:k-1})}_\text{previous belief}\ {\rm d}x_{k-1} \\
=&\eta\cdot\mathcal N(y_k;H_kx_k,R_k)\cdot\int\mathcal{N}(x_k;Ax_{k-1}+Bu_k,Q_k)\cdot\mathcal{N}(x_{k-1};\hat{x}_{k-1},\hat{P}_{k-1})\ {\rm d}x_{k-1} \\
=&\eta\cdot\mathcal N(y_k;H_kx_k,R_k)\cdot\mathcal{N}(x_k;\hat{x}_{k\vert k-1},\hat{P}_{k\vert k-1}) \\
\propto&\ \mathcal{N}(x_k;\hat{x}_k,\hat{P}_k)
\end{aligned}
$$

Applying Bayesian Rule and Markov Assumptions to $p(x_k|y_{1:k},u_{1:k})$, then the time update and the measurement update becomes very explicit.

## Optimization Perspective (MAP Estimation)

The Kalman Filter solves a weighted least-squares problem where the optimal state estimate minimizes a cost function balancing prediction fidelity against measurement consistency, with **covariance matrices acting as natural weighting matrices**.

By Bayesian Rule, we know that

$$
p(x_{k}|y_{1:k}, u_{1:k})\propto\underbrace{p(y_k|x_k)}_\text{measurement}\cdot\underbrace{p(x_{k}|y_{1:k-1}, u_{1:k})}_\text{prior} \\
$$

To maximize the posterior probability, it is equivalent to minimizing its negative logarithmic posterior.

$$
-\ln{p(x_{k}|y_{1:k}, u_{1:k})}=-\ln{p(y_k|x_k)}-\ln{p(x_{k}|y_{1:k-1}, u_{1:k})}+C
$$

Applying Gaussian probability distribution

$$
J_{x_k}=\frac12||z_k-Cx_k||_{R_k^{-1}}^2+\frac12||{x_k-\hat{x}_{k\vert k-1}}||_{\hat{P}_{k\vert k-1}}^2+C
$$

$$
\hat{x}_{k\vert k-1}=\arg\min_{x_k}\left(||{x_k-\hat{x}_{k\vert k-1}}||_{\hat{P}_{k\vert k-1}}^2+|z_k-Cx_k||_{R_k^{-1}}^2\right)
$$

Prior is given by

$$
\begin{aligned}
\hat{x}_{k\vert k-1} &= \mathbb E[x_k|y_{1:k-1}, u_{1:k}] \\
\hat{P}_{k\vert k-1} &= \text{Cov}(x_k|y_{1:k-1}, u_{1:k})
\end{aligned}
$$
