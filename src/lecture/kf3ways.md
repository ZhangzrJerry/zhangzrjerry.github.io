# Kalman Filter in 3 Ways

[Slide](/assets/kf3ways.pdf): Discover the Kalman Filter through the **Geometric perspective** of orthogonal projection, the **Probabilistic perspective** of Bayesian filtering, and the **Optimization perspective** of weighted least squares. _Inspired by Ling Shi's 2024-25 Spring lecture "Networked Sensing, Estimation and Control"._

<PlayerBilibili videoId="BV1WLp8zPEvS" />

## Introduction

### System Model and Assumptions

Consider a discrete-time linear Gaussian system with initial condition $x_0$ and $P_0$:

$$
\begin{aligned}
x_{k+1} &= A_kx_k+B_ku_k+\omega_k,&\omega_k\sim\mathcal N(0,Q_k) \\
y_k &= C_kx_k + \nu_k, &\nu_k\sim\mathcal N(0,R_k)
\end{aligned}
$$

**Assumptions:**

- $(A_k,B_k)$ is _controllable_ and $(A_k,C_k)$ is _observable_
- $Q_k\succeq0,R_k\succeq0,P_0\succeq0$
- $\omega_k$, $\nu_k$ and $x_0$ are mutually uncorrelated
- The future state of the system is conditionally independent of the past states given the current state

**Goal:** Find $\hat x_{k|k}=\mathbb{E}[x_k|y_{1:k}]$ (MMSE estimator)

## Geometric Perspective: Orthogonal Projection

### Hilbert Space of Random Variables

**Key Idea:**

- View random variables as vectors in Hilbert space
- Inner product: $\langle\xi,\eta\rangle=\mathbb{E}[\xi\eta]$
- Orthogonality: $\xi\perp\eta\Leftrightarrow\mathbb{E}[\xi\eta]=0$
- Optimal estimate is orthogonal projection onto observation space

**Geometric Interpretation:**

<CenteredImg src="/pic/projection_1758086370060_0.png" caption="Courtesy: https://math.stackexchange.com/users/117818/qqo" />

### Time Update

**State Prediction:**

$$
\begin{align*}
\hat{x}_{k|k-1} &= \mathbb{E}[x_k \mid y_{1:k-1}] \\
&= \mathbb{E}[A_{k-1} x_{k-1} + B_{k-1}u_{k-1} + w_{k-1} \mid y_{1:k-1}] \\
&= A_{k-1} \hat{x}_{k-1|k-1} + B_{k-1}u_{k-1} \qquad \text{(since $w_{k-1} \perp y_{1:k-1}$)}
\end{align*}
$$

**Covariance Prediction:**

$$
\begin{align*}
P_{k|k-1} &= \text{cov}(x_k - \hat{x}_{k|k-1}) \\
&= \text{cov}[A_{k-1}(x_{k-1} - \hat{x}_{k-1|k-1}) + w_{k-1}] \\
&= A_{k-1}\cdot\text{cov}(x_{k-1} - \hat{x}_{k-1|k-1})\cdot A_{k-1}^\top + 2A_{k-1}\cdot\text{cov}(x_k-\hat{x}_{k|k-1},\omega_{k-1}) + \text{cov}(w_{k-1}) \\
&= A_{k-1} P_{k-1|k-1} A_{k-1}^\top + Q_{k-1}
\end{align*}
$$

### Innovation Process

**Definition:**

$$
\begin{align*}
e_k &= y_k - \hat{y}_{k\vert k-1} \\
&= y_k - \text{proj}_{\mathcal{Y}_{k-1}}(y_k) \\
&= y_k - \text{proj}_{\mathcal{Y}_{k-1}}(C_kx_k+\nu_k) \\
&= y_k - C_k\cdot\text{proj}_{\mathcal{Y}_{k-1}}(x_k)-\text{proj}_{\mathcal{Y}_{k-1}}(\nu_k) \\
&= y_k - C_k\hat{x}_{k\vert k-1}
\end{align*}
$$

**Properties:**

- Zero Mean: $\mathbb{E}[e_k]=0$
- White Sequence: $\mathbb{E}[e_ke_j^\top]=0$ for $k\ne j$
- Orthogonality Principle: $\mathbb{E}[e_ky_j^\top]=0$ for $j<k$

### Measurement Update

**State Update:**

$$
\begin{align*}
\hat{x}_{k\vert k} &= \text{proj}_{\mathcal{Y}_{k}}(x_k) \\
&= \hat{x}_{k\vert k-1}+K_ke_k \\
&= \hat{x}_{k\vert k-1}+K_k(y_k - C_k\hat{x}_{k\vert k-1})
\end{align*}
$$

**Covariance Update:**

$$
\begin{align*}
P_{k|k} &= \text{cov}(x_k - \hat{x}_{k|k}) \\
&= \text{cov}(x_k - \hat{x}_{k|k-1} - K_k e_k) \\
&= \text{cov}(x_k - \hat{x}_{k|k-1}) - 2 K_k \text{cov}(x_k - \hat{x}_{k|k-1}, e_k) + K_k \text{cov}(e_k) K_k^\top \\
&= \text{cov}(x_k - \hat{x}_{k|k-1}) - 2 K_k \text{cov}(x_k - \hat{x}_{k|k-1}, y_k - C_k\hat{x}_{k|k-1}) + K_k \text{cov}(y_k - C_k\hat{x}_{k|k-1}) K_k^\top \\
&= P_{k|k-1} - K_kC_kP_{k|k-1} -P_{k|k-1}C_k^\top K^\top+ K_k (C_k P_{k|k-1} C_k^\top + R_{k}) K_k^\top \\
\end{align*}
$$

### Kalman Gain Derivation

**Optimal Kalman Gain:**
$$\frac{\partial\text{tr}(P_{k\vert k})}{\partial K_k} = -2P_{k\vert k-1}C_k^\top + 2K_k(C_kP_{k\vert k-1}C_k^\top+R_{k}) = 0$$
$$K_k = P_{k\vert k-1}C_k^\top(C_kP_{k\vert k-1}C_k^\top+R_{k})^{-1}$$

**Covariance Derivation:**
$$P_{k|k} = P_{k\vert k-1}-K_kC_kP_{k\vert k-1} = (P_{k\vert k-1}^{-1}+C_k^\top R_{k}^{-1}C_k)^{-1}$$

## Probabilistic Perspective: Bayesian Filtering

### Bayesian Filtering Framework

$$
\begin{aligned}
&p(x_{k}|y_{1:k}, u_{1:k})\\=\ &p(x_{k}|y_k,y_{1:k-1}, u_{1:k})\\=\ &\frac{p(y_{k}|x_k,y_{1:k-1}, u_{1:k})\cdot p(x_{k}|y_{1:k-1}, u_{1:k})}{p(y_{k}|y_{1:k-1}, u_{1:k})}\\
=\ &\eta\cdot p(y_k|x_k)\cdot p(x_{k}|y_{1:k-1}, u_{1:k}) \\
=\ &\eta\cdot p(y_k|x_k)\cdot\int p(x_{k},x_{k-1}|y_{1:k-1}, u_{1:k})\ {\rm d}x_{k-1} \\
=\ &\eta\cdot p(y_k|x_k)\cdot\int p(x_{k}|x_{k-1},y_{1:k-1},u_{1:k})\cdot p(x_{k-1}|y_{1:k-1},u_{1:k})\ {\rm d}x_{k-1} \\
=\ &\eta\cdot\underbrace{p(y_k|x_k)}_\text{observation model}\cdot\int\underbrace{p(x_{k}|x_{k-1},u_{k})}_\text{motion model}\cdot\underbrace{p(x_{k-1}|y_{1:k-1},u_{1:k-1})}_\text{previous belief}\ {\rm d}x_{k-1}
\end{aligned}
$$

### Prediction Step: Gaussian Propagation

$$
p(x_{k}|y_{1:k}, u_{1:k}) = \eta\cdot\mathcal N(y_k;C_kx_k,R_k)\cdot\int\mathcal{N}(x_k;A_{k-1}x_{k-1}+B_{k-1}u_{k-1},Q_{k-1})\cdot\mathcal{N}(x_{k-1};\hat{x}_{k-1},P_{k-1})\ {\rm d}x_{k-1}
$$

**Predicted Mean:**

$$
\begin{aligned}
\hat{x}_{k|k-1} &= \mathbb{E}[A_{k-1}x_{k-1} + B_{k-1}u_{k-1} + w_{k-1}] \\
&= A_{k-1}\mathbb{E}[x_{k-1}] + B_{k-1}u_{k-1} + \mathbb{E}[w_{k-1}] \\
&= A_{k-1}\hat{x}_{k-1} + B_{k-1}u_{k-1}
\end{aligned}
$$

**Predicted Covariance:**

$$
\begin{aligned}
P_{k|k-1} &= \text{cov}[A_{k-1}x_{k-1} + B_{k-1}u_{k-1} + w_{k-1}] \\
&= \text{cov}[A_{k-1}x_{k-1}] + \text{cov}[w_{k-1}] \\
&= A_{k-1}\text{cov}[x_{k-1}]A_{k-1}^\top + Q_{k-1} \\
&= A_{k-1}P_{k-1}A_{k-1}^\top + Q_{k-1}
\end{aligned}
$$

### Update Step: Gaussian Product

$$
p(x_{k}|y_{1:k}, u_{1:k}) = \eta\cdot\mathcal N(y_k;C_kx_k,R_k)\cdot\mathcal{N}(x_k;\hat x_{k|k-1},P_{k|k-1})
$$

**Gaussian Product:**

$$
\mathcal{N}(x;\mu,\Sigma)\propto\mathcal{N}(x;\mu_1,\Sigma_1)\cdot\mathcal{N}(x,\mu_2,\Sigma_2)
$$

$$
\begin{align*}
\Sigma^{-1} &= \Sigma_1^{-1} + \Sigma_2^{-1} \\
\mu &= \Sigma(\Sigma_1^{-1}\mu_1+\Sigma_2^{-1}\mu_2)
\end{align*}
$$

**Posterior Result:**

$$
\begin{align*}
\hat{x}_{k|k} &= \hat{x}_{k|k-1} + K_k (y_k - C_k \hat{x}_{k|k-1}) \\
K_k &= P_{k|k-1} C_k^\top (C_k P_{k|k-1} C_k^\top + R)^{-1} \\
P_{k|k} &= (I - K_k C_k) P_{k|k-1}
\end{align*}
$$

## Optimization Perspective: MAP Estimation

### Maximum A Posteriori Formulation

**MAP Estimation:**

$$
\begin{align*}
\hat{x}_{k|k} &= \arg\max_{x_k} p(x_k \mid y_{1:k}) \\
&= \arg\min_{x_k} \left[ -\log p(x_k \mid y_{1:k}) \right]
\end{align*}
$$

**Weighted Least Square:**

$$
\mathcal E(x) = ||Mx-n||^2_\Sigma=x^\top M^\top\Sigma^{-1}Mx-2n^\top\Sigma^{-1}Mx+n^\top\Sigma^{-1}n
$$

$$
\nabla\mathcal E = 2M^\top\Sigma^{-1}Mx - 2M^\top\Sigma^{-1}n
$$

$$
\hat x = (M^\top\Sigma^{-1}M)^{-1}M^\top\Sigma^{-1}n
$$

### MAP as Weighted Least Squares

**Posterior Distribution:**

$$
p(x_k \mid y_{1:k}) \propto p(y_k \mid x_k) p(x_k \mid y_{1:k-1})
$$

**Assume Gaussian Distributions:**

$$
\begin{align*}
p(x_k \mid y_{1:k-1}) &= \mathcal{N}(x_k; \hat{x}_{k|k-1}, P_{k|k-1}) \\
p(y_k \mid x_k) &= \mathcal{N}(y_k; C_k x_k, R_k)
\end{align*}
$$

**Negative Log-Posterior:**

$$
\begin{align*}
-\log p(x_k \mid y_{1:k}) &\propto \frac{1}{2} \|y_k - C_k x_k\|_{R_k^{-1}}^2 + \frac{1}{2} \|x_k - \hat{x}_{k|k-1}\|_{P_{k|k-1}^{-1}}^2 \\
&= \frac{1}{2} \left\| \begin{bmatrix} C_k \\ I \end{bmatrix} x_k - \begin{bmatrix} y_k \\ \hat{x}_{k|k-1} \end{bmatrix} \right\|_{\Sigma^{-1}}^2
\end{align*}
$$

where $\Sigma = \begin{bmatrix} R_k & 0 \\ 0 & P_{k|k-1} \end{bmatrix}$.

### MAP Solution

**Weighted Least Squares Form:**

$$
M = \begin{bmatrix} C_k \\ I \end{bmatrix}, \quad n = \begin{bmatrix} y_k \\ \hat{x}_{k|k-1} \end{bmatrix}, \quad \Sigma = \begin{bmatrix} R_k & 0 \\ 0 & P_{k|k-1} \end{bmatrix}
$$

**MAP Estimate:**

$$
\begin{align*}
\hat{x}_{k|k} &= \left( M^\top \Sigma^{-1} M \right)^{-1} M^\top \Sigma^{-1} n \\
&= \left( C_k^\top R_k^{-1} C_k + P_{k|k-1}^{-1} \right)^{-1} \left( C_k^\top R_k^{-1} y_k + P_{k|k-1}^{-1} \hat{x}_{k|k-1} \right)
\end{align*}
$$

### Equivalence Proof

**Using Matrix Inversion Lemma:**

$$
\begin{align*}
\hat{x}_{k|k} &= \left( C_k^\top R_k^{-1} C_k + P_{k|k-1}^{-1} \right)^{-1} \left( C_k^\top R_k^{-1} y_k + P_{k|k-1}^{-1} \hat{x}_{k|k-1} \right) \\
&= \hat{x}_{k|k-1} + P_{k|k-1} C_k^\top (C_k P_{k|k-1} C_k^\top + R_k)^{-1} (y_k - C_k \hat{x}_{k|k-1})
\end{align*}
$$

**Proof:**

$$
\begin{align*}
\left( C_k^\top R_k^{-1} C_k + P_{k|k-1}^{-1} \right)^{-1} C_k^\top R_k^{-1} = P_{k|k-1} C_k^\top (C_k P_{k|k-1} C_k^\top + R_k)^{-1}
\end{align*}
$$

This shows the equivalence between the MAP solution and the Kalman update.

## Conclusion

### Theoretical Insights and Extensions

**Key Insights:**

- **Geometric**: Reveals orthogonality principle and innovation process
- **Probabilistic**: Shows optimality under Gaussian assumptions
- **Optimization**: Connects to weighted least squares and regularization

**Unified Algorithm:** All approaches yield the same recursive equations:

$$
\begin{align*}
\text{time update } & \begin{cases}
\hat{x}_{k|k-1} = A_{k-1} \hat{x}_{k-1|k-1} \\
P_{k|k-1} = A_{k-1} P_{k-1|k-1} A_{k-1}^\top + Q
\end{cases} \\
\text{measurement update } & \begin{cases}
K_k = P_{k|k-1} C_k^\top (C_k P_{k|k-1} C_k^\top + R)^{-1} \\
\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (y_k - C_k\hat{x}_{k|k-1}) \\
P_{k|k} = (I - K_k C_k) P_{k|k-1}
\end{cases}
\end{align*}
$$

**Extensions:**

- Nonlinear systems: EKF, UKF, particle filters
- Non-Gaussian noise: robust Kalman filters
