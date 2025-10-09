# Factor Graph for Pose Estimation

[Slide](/assets/factorgraph.pdf): Overview of factor graphs in pose estimation, emphasizing their benefits over Kalman Filters for handling complex dependencies. Covers dynamic Bayesian networks, information forms, and smoothing for efficient state estimation.

## Kalman Filter

### Markov Chain

The classic Kalman Filter corresponds to a simple **Markov Chain**:

<CenteredImg src="/pic/Pasted%20image%2020251009150759.png" width=50% />

**Core Assumptions:**

- **Markov Property:** The current state $x_k$ depends *only* on the immediate previous state $x_{k-1}$ and input $u_k$
- **Conditional Independence:** Given the current state $x_k$, the observation $y_k$​ is independent of all other states and observations.

### Scenario 1: Spatio-Temporal Constraints

A robot revisits a location, observing the same landmark $l$ at two different times, $k_1$​ and $k_2$:

$$
\underset{\text{obs. }l}{x_{k_1}}\to x_{k_1+1} \to \cdots {x_{k_2-1}\to \underset{\text{obs. }l}{x_{k_2}}}
$$

These two observations create a **direct constraint** between pose $x_{k_1}$​​ and pose $x_{k_2}$​​. In the Kalman Filter, this connection is not direct. We need a way to directly link $x_{k_1}$ and $x_{k_2}$.

### Scenario 2: Physical Constraints

When tracking multiple objects, they may be subject to physical interaction constraints

$$
\begin{aligned}
\text{Object A: }\; x_0^A\to\underbrace{x_1^A \to x_2^A}_\text{interact with B} \to \cdots \\
\text{Object B: }\; x_0^B\to\underbrace{x_1^B \to x_2^B}_\text{interact with A} \to \cdots
\end{aligned}
$$

The Kalman Filter, designed for a single Markov chain, cannot natively represent this cross-object dependency.

## Factor Graph

### Dynamic Bayesian Networks

**Dynamic Bayesian Networks (DBNs)** provide a more flexible framework than a simple Markov chain for representing probabilistic dependencies across time.

<CenteredImg src="/pic/Pasted%20image%2020251009150820.png" width=55% />

**Extensions:**

1. **Arbitrary Time-Span Dependencies:** States can depend on states several steps back.
2. **Complex Inter-Variable Constraints:** Multiple variables within a time slice can be interconnected.
3. **Hierarchical State Representations:** States can be decomposed into sub-states with their own dependencies.

### Dynamic Bayesian Networks (cont.)

It is a **bipartite graph** consisting of two types of nodes:

1. **Variable Nodes:** Represent the unknown quantities we wish to estimate.
2. **Factor Nodes:** Represent a **constraint** or a **measurement** on the set of variables they are connected to.

**Goal:** Find the most probable assignment of the variables that maximizes the product of all factors.

$$
\mathbf{X}^*=\arg\max_{\mathbf X}\prod_i f_i(\mathcal{X}_i)
$$

**Under Gaussian assumptions**, this becomes a nonlinear least-squares problem:

$$
\mathbf{X}^*=\arg\min_{\mathbf{X}}\sum_i||h_i(\mathcal{X}_i)-z_i||^2_{\mathbf S_i}
$$

## Unified View

### The Dual Information Form

$$
p(\boldsymbol\alpha,\boldsymbol\beta)=\mathcal{N}\left(\begin{bmatrix}\boldsymbol\mu_{\boldsymbol\alpha}\\\boldsymbol\mu_{\boldsymbol\beta}\end{bmatrix}, \begin{bmatrix}\boldsymbol\Sigma_{\boldsymbol{\alpha\alpha}}&\boldsymbol\Sigma_{\boldsymbol{\alpha\beta}}\\\boldsymbol\Sigma_{\boldsymbol{\beta\alpha}}&\boldsymbol\Sigma_{\boldsymbol{\beta\beta}}\end{bmatrix}\right)=\mathcal{N}^{-1}\left(\begin{bmatrix}\boldsymbol\eta_{\boldsymbol\alpha}\\\boldsymbol\eta_{\boldsymbol\beta}\end{bmatrix}, \begin{bmatrix}\boldsymbol\Lambda_{\boldsymbol{\alpha\alpha}}&\boldsymbol\Lambda_{\boldsymbol{\alpha\beta}}\\\boldsymbol\Lambda_{\boldsymbol{\beta\alpha}}&\boldsymbol\Lambda_{\boldsymbol{\beta\beta}}\end{bmatrix}\right)
$$

| **Operation**                                                                                                              | **Covariance Form**                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Information Form**                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marginalization $p(\boldsymbol\alpha) = \int p(\boldsymbol\alpha, \boldsymbol\beta) \, {\rm d}\boldsymbol\beta$            | $\begin{aligned} \boldsymbol\mu &= \boldsymbol\mu_{\boldsymbol\alpha} \\ \boldsymbol\Sigma &= \boldsymbol\Sigma_{\boldsymbol{\alpha\alpha}} \end{aligned}$                                                                                                                                                                                                                                                                                                       | $\begin{aligned} \boldsymbol\eta &= \boldsymbol\eta_{\boldsymbol\alpha} - \boldsymbol\Lambda_{\boldsymbol{\alpha\beta}} \boldsymbol\Lambda_{\boldsymbol{\beta\beta}}^{-1} \boldsymbol\eta_{\boldsymbol\beta} \\ \boldsymbol\Lambda &= \boldsymbol\Lambda_{\boldsymbol{\alpha\alpha}} - \boldsymbol\Lambda_{\boldsymbol{\alpha\beta}} \boldsymbol\Lambda_{\boldsymbol{\beta\beta}}^{-1} \boldsymbol\Lambda_{\boldsymbol{\beta\alpha}} \end{aligned}$ |
| Conditioning $p(\boldsymbol\alpha \mid \boldsymbol\beta) = {p(\boldsymbol\alpha, \boldsymbol\beta)}/{p(\boldsymbol\beta)}$ | $\begin{aligned} \boldsymbol\mu' &= \boldsymbol\mu_{\boldsymbol\alpha} + \boldsymbol\Sigma_{\boldsymbol{\alpha\beta}} \boldsymbol\Sigma_{\boldsymbol{\beta\beta}}^{-1} (\boldsymbol\beta - \boldsymbol\mu_{\boldsymbol\beta}) \\ \boldsymbol\Sigma' &= \boldsymbol\Sigma_{\boldsymbol{\alpha\alpha}} - \boldsymbol\Sigma_{\boldsymbol{\alpha\beta}} \boldsymbol\Sigma_{\boldsymbol{\beta\beta}}^{-1} \boldsymbol\Sigma_{\boldsymbol{\beta\alpha}} \end{aligned}$ | $\begin{aligned} \boldsymbol\eta' &= \boldsymbol\eta_{\boldsymbol\alpha} - \boldsymbol\Lambda_{\boldsymbol{\alpha\beta}} \boldsymbol\beta \\ \boldsymbol\Lambda' &= \boldsymbol\Lambda_{\boldsymbol{\alpha\alpha}} \end{aligned}$                                                                                                                                                                                                                   |

### The Dual Information Filter

|                 | Kalman Filter                                                                                                                                                                                                                                                                                                                                                                                                      | Information Filter                                                                                                                                                                                                                                                                        |
| :-------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prediction Step | $\begin{aligned}\boldsymbol\mu_{t\vert t-1} &= \mathbf{A}_t \boldsymbol\mu_{t-1} \\ \boldsymbol\Sigma_{t\vert t-1} &= \mathbf{A}_t \boldsymbol\Sigma_{t-1} \mathbf{A}_t^\top + \mathbf{Q}_t \end{aligned}$                                                                                                                                                                                                         | $\begin{aligned} \boldsymbol\Lambda_{t\vert t-1} &= (\mathbf{A}_t \boldsymbol\Lambda_{t-1}^{-1} \mathbf{A}_t^\top + \mathbf{Q}_t)^{-1} \\ \boldsymbol\eta_{t\vert t-1} &= \boldsymbol\Lambda_{t\vert t-1} \mathbf{A}_t \boldsymbol\Lambda_{t-1}^{-1} \boldsymbol\eta_{t-1} \end{aligned}$ |
|   Update Step   | $\begin{aligned} \mathbf{K}_t &= \boldsymbol\Sigma_{t\vert t-1} \mathbf{H}_t^\top (\mathbf{H}_t \boldsymbol\Sigma_{t\vert t-1} \mathbf{H}_t^\top + \mathbf{R}_t)^{-1} \\ \boldsymbol\mu_t &= \boldsymbol\mu_{t\vert t-1} + \mathbf{K}_t (\mathbf{z}_t - \mathbf{H}_t \boldsymbol\mu_{t\vert t-1}) \\ \boldsymbol\Sigma_t &= (\mathbf{I} - \mathbf{K}_t \mathbf{H}_t) \boldsymbol\Sigma_{t\vert t-1} \end{aligned}$ | $\begin{aligned} \boldsymbol\Lambda_t &= \boldsymbol\Lambda_{t\vert t-1} + \mathbf{H}_t^\top \mathbf{R}_t^{-1} \mathbf{H}_t \\ \boldsymbol\eta_t &= \boldsymbol\eta_{t\vert t-1} + \mathbf{H}_t^\top \mathbf{R}_t^{-1} \mathbf{z}_t \end{aligned}$                                        |

### Factor Graph with Information Form

The global nonlinear optimization problem

$$
\mathbf{X}^*=\arg\min_{\mathbf{X}}\sum_i||h_i(\mathcal{X}_i)-z_i||^2_{\mathbf S_i}
$$

can be linearized at current estimation $\mathbf{X}_0$:

$$
h_i(\mathcal{X}_i)\approx h_i(\mathcal{X}_{i,0})+\mathbf{J}_i\cdot\delta\mathcal{X}_i
$$

where:

- $\mathbf{J}_i = \frac{\partial h_i}{\partial \mathcal{X}_i}\big|_{\mathcal{X}_{i,0}}$ is the **Jacobian matrix** of measurement function $h_i$
- $\mathbf{r}_i = z_i - h_i(\mathcal{X}_{i,0})$ is the **residual vector**

### Factor Graph with Information Form (cont.)

| Local Information Form                                                                                                                                                                | Global Information Form                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $\begin{aligned} \boldsymbol{\Lambda}_i &= \mathbf{J}_i^\top \mathbf{S}_i^{-1} \mathbf{J}_i \\ \boldsymbol{\eta}_i &= \mathbf{J}_i^\top \mathbf{S}_i^{-1} \mathbf{r}_i \end{aligned}$ | $\begin{aligned} \boldsymbol{\Lambda} &= \sum_i \mathbf{A}_i^\top \boldsymbol{\Lambda}_i \mathbf{A}_i \\ \boldsymbol{\eta} &= \sum_i \mathbf{A}_i^\top \boldsymbol{\eta}_i \end{aligned}$ |

where $\mathbf{A}_i$ is the **selection matrix** that maps local variables $\mathcal{X}_i$ to the global state vector $\mathbf{X}$.

The optimal update is then:

$$
\mathbf{X}^*=\mathbf{X}_0 + (\boldsymbol\Lambda)^{-1}\boldsymbol\eta
$$

### From Filtering to Smoothing

Kalman Filter, Information Filter, and Factor Graph are fundamentally solving the same problem: **state estimation under Gaussian assumptions**. They are probabilistically equivalent.

Despite mathematical equivalence, FG-based smoothing dominates modern applications because:

1. It naturally encodes arbitrary constraints;
2. It exploits sparse structure for efficient solving;
3. It's batch-based update enabling non-linear optimization;
4. It corrects past states by future evidence.
