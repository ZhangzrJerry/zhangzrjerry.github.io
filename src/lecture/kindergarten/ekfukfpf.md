# EKF, UKF & Partical Filter

[Slide](/assets/ekfukfpf.pdf): Evolving from the classic Kalman Filter, the EKF, UKF, and Particle Filter address nonlinear estimation through local linearization, deterministic sampling, and stochastic sampling, respectively, forming the cornerstone of modern state estimation.

<PlayerBilibili videoId="BV114x1zQEhR" />

## Recap

### Kalman Filter in 3 Ways

The previous video has been well received. In response to fans' requests, we updated the Kalman filter visualization and unscented Kalman filter.

<div style="display: flex; justify-content: space-around; align-items: center;">
    <img src="/pic/e55efe833fa9b6ad829864c98d9491ba.png" alt="Kalman Filter Visualization 1" style="width: 40%;" />
    <img src="/pic/36dccf8005785ab50c206e57ad213368.png" alt="Kalman Filter Visualization 2" style="width: 40%;" />
</div>

### Kalman Filter Algorithm Step

**1. Prediction**

$$
\begin{aligned}
\hat{x}_{k|k-1} &= \mathbb{E}[x_k|z_{1:k-1}] \\
P_{k|k-1} &= \text{cov}[x_k-\hat{x}_{k|k-1}|z_{1:k-1}]
\end{aligned}
$$

**2. Update**

$$
\begin{aligned}
\hat{x}_{k|k} &= \mathbb{E}[x_k|z_{1:k}] \\
P_{k|k} &= \text{cov}[x_k-\hat{x}_{k|k}|z_{1:k}]
\end{aligned}
$$

## EKF

### Nonlinear System Model

The Extended Kalman Filter (EKF) linearizes nonlinear system models using first-order Taylor series expansion around the current estimate, then applies standard Kalman Filter equations.

$$
\begin{aligned}
x_k &= f(x_{k-1}, u_{k-1}, w_{k-1}), \quad & w_k \sim \mathcal{N}(0, Q_k) \\
z_k &= h(x_k, v_k), \quad & v_k \sim \mathcal{N}(0, R_k)
\end{aligned}
$$

Define the Jacobian matrices:

$$
\begin{aligned}
F_{k-1} &= \frac{\partial f}{\partial x} \Big|_{\hat{x}_{k-1|k-1}, u_{k-1}} \\
H_k &= \frac{\partial h}{\partial x} \Big|_{\hat{x}_{k|k-1}}
\end{aligned}
$$

### EKF Algorithm Steps

**1. Prediction**

$$
\begin{aligned}
\hat{x}_{k|k-1} &= f(\hat{x}_{k-1|k-1}, u_{k-1}, 0) \\
P_{k|k-1} &= F_{k-1} P_{k-1|k-1} F_{k-1}^T + Q_k
\end{aligned}
$$

**2. Update**

$$
\begin{aligned}
K_k &= P_{k|k-1} H_k^T (H_k P_{k|k-1} H_k^T + R_k)^{-1} \\
\hat{x}_{k|k} &= \hat{x}_{k|k-1} + K_k (z_k - h(\hat{x}_{k|k-1}, 0)) \\
P_{k|k} &= (I - K_k H_k) P_{k|k-1}
\end{aligned}
$$

### Pros and Cons of the EKF

- **Pros**: Intuitive concept, relatively low computational cost, performs well in many applications.
- **Cons**:
  - Only suitable for **mildly nonlinear** systems; linearization errors can be large for strong nonlinearities.
  - Requires calculation of Jacobian matrices, which can be complex and error-prone.
  - Can diverge (due to accumulation of linearization errors).

## UKF

The Unscented Kalman Filter takes a different approach: **Instead of approximating the nonlinear function, approximate the probability distribution**.

**Unscented Transform**

1.  **Select Sigma Points**: Choose $2n+1$ points ($n$ is the state dimension) based on the current state's mean and covariance.
2.  **Propagate Sigma Points**: Pass each Sigma point through the nonlinear function $f$ or $h$.
3.  **Recalculate Statistics**: Compute the new mean and covariance from the propagated points.

<CenteredImg src="/pic/Pasted%20image%2020251009230042.png" width=80% />

_Courtesy: Zhenhui Zhang_

### Sigma Point Selection

For an $n$-dimensional state vector $\hat{x}$ and covariance $P$, the Sigma points $\mathcal{X}^{(i)}$ are chosen as follows:

$$
\begin{aligned}
\mathcal{X}^{(0)} &= \hat{x} \\
\mathcal{X}^{(i)} &= \hat{x} + \left( \sqrt{(n+\lambda)P} \right)_i, \quad & i=1,\dots,n \\
\mathcal{X}^{(i)} &= \hat{x} - \left( \sqrt{(n+\lambda)P} \right)_{i-n}, \quad & i=n+1,\dots,2n
\end{aligned}
$$

Where $\lambda = \alpha^2 (n+\kappa) - n$ is a scaling parameter, $\alpha$ controls the spread of the sigma points, and $\kappa$ is typically set to $3-n$.

Each point has an associated weight:

$$
\begin{aligned}
W_m^{(0)} &= \frac{\lambda}{n+\lambda} \\
W_c^{(0)} &= \frac{\lambda}{n+\lambda} + (1-\alpha^2+\beta) \\
W_m^{(i)} = W_c^{(i)} &= \frac{1}{2(n+\lambda)}, \quad i=1,\dots,2n
\end{aligned}
$$

Here, $\beta$ is used to incorporate prior knowledge of the distribution (optimal $\beta=2$ for Gaussian).

### UKF Prediction Step

- Generate Sigma points $\mathcal{X}_{k-1}^{(i)}$ from $(\hat{x}_{k-1|k-1}, P_{k-1|k-1})$.
- Propagate Sigma points through the process model: $\mathcal{X}_{k|k-1}^{*(i)} = f(\mathcal{X}_{k-1}^{(i)}, u_{k-1})$.
- Compute the predicted mean and covariance:
  $$
  \begin{aligned}
  \hat{x}_{k|k-1} &= \sum_{i=0}^{2n} W_m^{(i)} \mathcal{X}_{k|k-1}^{*(i)} \\
  P_{k|k-1} &= \sum_{i=0}^{2n} W_c^{(i)} \left( \mathcal{X}_{k|k-1}^{*(i)} - \hat{x}_{k|k-1} \right) \left( \mathcal{X}_{k|k-1}^{*(i)} - \hat{x}_{k|k-1} \right)^T + Q_k
  \end{aligned}
  $$

### UKF Update Step

- Generate a new set of Sigma points $\mathcal{X}_{k|k-1}^{(i)}$ from $(\hat{x}_{k|k-1}, P_{k|k-1})$ (or reuse the prediction points).
- Propagate points through the observation model: $\mathcal{Z}_k^{(i)} = h(\mathcal{X}_{k|k-1}^{(i)})$.
- Calculate the predicted observation mean, its covariance, and the cross-covariance between state and observation:
  $$
  \begin{aligned}
  \hat{z}_{k|k-1} &= \sum_{i=0}^{2n} W_m^{(i)} \mathcal{Z}_k^{(i)} \\
  P_{z z} &= \sum_{i=0}^{2n} W_c^{(i)} \left( \mathcal{Z}_k^{(i)} - \hat{z}_{k|k-1} \right) \left( \mathcal{Z}_k^{(i)} - \hat{z}_{k|k-1} \right)^T + R_k \\
  P_{x z} &= \sum_{i=0}^{2n} W_c^{(i)} \left( \mathcal{X}_{k|k-1}^{(i)} - \hat{x}_{k|k-1} \right) \left( \mathcal{Z}_k^{(i)} - \hat{z}_{k|k-1} \right)^T
  \end{aligned}
  $$
- Compute the Kalman gain and update the state:
  $$
  \begin{aligned}
  K_k &= P_{x z} P_{z z}^{-1} \\
  \hat{x}_{k|k} &= \hat{x}_{k|k-1} + K_k (z_k - \hat{z}_{k|k-1}) \\
  P_{k|k} &= P_{k|k-1} - K_k P_{z z} K_k^T
  \end{aligned}
  $$

### Pros and Cons of the UKF

- **Pros**:
  - No need to calculate Jacobian matrices, making implementation simpler.
  - Higher approximation accuracy for nonlinear systems (can achieve third-order Taylor series accuracy).
  - Generally more stable and less prone to divergence.
- **Cons**:
  - Slightly higher computational cost than EKF (requires propagating $2n+1$ points).
  - Parameters ($\alpha$, $\beta$, $\kappa$) need to be tuned.

## Particle Filter

### Particles Approximation

Like UKF, Particle Filter approximates distributions through sampling. But while UKF uses deterministic sigma points, PF employs many random particles, using importance sampling and resampling to handle arbitrary nonlinear, non-Gaussian systems:

$$
p(x_k | z_{1:k}) \approx \sum_{i=1}^N w_k^{(i)} \delta(x_k - x_k^{(i)})
$$

where $\{x_k^{(i)}, w_k^{(i)}\}_{i=1}^N$ is the set of weighted particles, and $\delta(\cdot)$ is the Dirac delta function.

### Basic Algorithm Steps

**1. Initialization**

- Sample $N$ particles $\{x_0^{(i)}\}_{i=1}^N$ from the prior distribution $p(x_0)$, with initial weights $w_0^{(i)} = 1/N$.

**2. Recursive Process (for each time step $k$)**

- **Importance Sampling**:
  Sample new particles from a proposal distribution (often the state transition prior):

  $$
  x_k^{(i)} \sim p(x_k | x_{k-1}^{(i)})
  $$

- **Weight Update**:
  Update particle weights based on the observation likelihood:

  $$
  w_k^{(i)} = w_{k-1}^{(i)} \cdot p(z_k | x_k^{(i)})
  $$

- **Weight Normalization**:

  $$
  \tilde{w}_k^{(i)} = \frac{w_k^{(i)}}{\sum_{j=1}^N w_k^{(j)}}
  $$

- **Resampling** (Optional but critical):
  Resample particles based on their weights, replicating high-weight particles and eliminating low-weight particles, resulting in a new set of equally weighted particles.

**3. State Estimation**

$$
\hat{x}_k = \sum_{i=1}^N \tilde{w}_k^{(i)} x_k^{(i)}
$$

### Pros and Cons of the Particle Filter

- **Pros**:

  - Can handle **highly nonlinear and non-Gaussian** systems.
  - Solid theoretical foundation (based on Bayesian estimation and Monte Carlo methods).
  - Suitable for complex multi-modal distributions.
  - Relatively intuitive implementation.

- **Cons**:
  - **High computational cost**: Requires a large number of particles to ensure accuracy.
  - **Particle degeneracy problem**: After a few iterations, only a few particles have significant weights, while most particles have negligible weights.
  - **Sample impoverishment problem**: Resampling can lead to a loss of particle diversity.

## Summary

### Comparison

| Feature                      | Kalman Filter (KF)        | EKF                              | UKF                                     | Particle Filter                                 |
| :--------------------------- | :------------------------ | :------------------------------- | :-------------------------------------- | :---------------------------------------------- |
| **Theoretical Basis**        | Optimal Linear Estimator  | Local Linearization + KF         | Unscented Transform + KF                | Monte Carlo + Bayesian Estimation               |
| **Computational Complexity** | $O(n^3)$                  | $O(n^3)$                         | $O(n^3)$                                | $O(N)$, where $N \gg n$                         |
| **Applicable Systems**       | **Linear, Gaussian**      | Mildly Nonlinear, ~Gaussian      | Moderate to Highly Nonlinear, ~Gaussian | **Arbitrarily Complex Nonlinear, Non-Gaussian** |
| **Memory Requirements**      | Low                       | Low                              | Low                                     | High (proportional to number of particles)      |
| **Key Challenge**            | Limited to Linear Systems | Linearization Errors, Divergence | Parameter Tuning                        | **Particle Degeneracy**, Computational Cost     |

### Visualization of Kalman Filter

See https://zhangzrjerry.github.io/html/kf.html
