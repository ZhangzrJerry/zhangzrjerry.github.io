# KKT Conditions and Optimization Techniques

[Slide](/assets/kkt.pdf): This lecture begins with an introduction to the **Karush-Kuhn-Tucker (KKT) conditions**, which are fundamental in constrained optimization. We will explore their geometric interpretation, derive the necessary conditions for optimality, and discuss their applications in solving optimization problems.

<PlayerBilibili videoId="BV1MjnHzyE3a" />

## Lagrangian Multiplier

### Optimization with Equality Constraints

Consider an optimization problem with equality constraints:

$$
\begin{aligned}
\min_{ x}f( x)\quad\text{subject to}\quad h_j( x)=0
\end{aligned}
$$

how to characterize the necessary conditions for the optimal solution $x^*$ ?

### Geometric Insight

Consider a quadratic objective function with one linear equality constraint:

$$
\min_{x,y}x^2+y^2\quad\text{subject to}\quad x+2y=5
$$

<CenteredImg src="/pic/Pasted image 20250924235015.png" width=100% />

$\nabla f( x^*)$ must lie within the linear subspace spanned by $\{\nabla h_j({x}^*)\}$; otherwise, the function value could be further decreased by moving along a feasible direction. This means there exist multipliers $\{\nu_j^*\}$ such that:

$$
\nabla f({x}^*) + \sum_j \nu_j^* \nabla h_j({x}^*) = 0
$$

### Lagrangian Function and Optimality Conditions

We introduce the **Lagrangian function** as a tool to characterize optimality:

$$
\mathcal{L}(x,\nu)=f(x)+\sum_j\nu_jh_j(x)
$$

The necessary conditions for optimality can be expressed as stationarity of the Lagrangian:

$$
\nabla\mathcal{L}( x^*,\nu^*) = 0 \quad\Longleftrightarrow\quad\begin{cases}
\nabla_{ x}\mathcal{L} = \nabla f( x^*) + \sum_j\nu_j^*\nabla h_j( x^*) = 0 \\
\nabla_{\nu}\mathcal{L} = [\dots,h_j( x^*),\dots]^\top = 0
\end{cases}
$$

## Lagrangian Relaxation

### A Min-Max Interpretation

The Lagrangian function also leads to a powerful dual interpretation:

$$
\max_\nu\mathcal{L}(x,\nu) = \begin{cases} f(x),&h_j(x)=0 \\
\infty,&\text{otherwise} \end{cases}
$$

The original constrained problem is equivalent to the following **min-max problem**:

$$
\min_xf(x),\;\text{s.t.}\; h_j(x)=0 \quad\Longleftrightarrow\quad \min_x\max_\nu\mathcal{L}(x,\nu)
$$

### The Dual Problem and Weak Duality

Solution for $\min_x\max_\nu\mathcal{L}(x,\nu)$ may be non-continuous, but solution for $\max_\nu\min_x\mathcal{L}(x,\nu)$ is easy if $\mathcal{L}(x,\nu)$ is tractable. We can form the dual problem by swapping the order of the min and the max:

$$
\max_\nu d(\nu) = \max_\nu\min_x\mathcal{L}(x,\nu)\le\min_x\max_\nu\mathcal{L}(x,\nu)
$$

Under some conditions, equality holds, which means strong duality holds.

### Uzawa's Method (Dual Ascent)

$$
\nabla d(\nu) = h[x^*(\nu)]\quad\text{where}\quad x^*(\nu) = \arg\min_x\mathcal{L}(x,\nu)
$$

This leads to Uzawa's Method:

1. **Minimization** ($x$-step):
   $$
   x^{k+1}=\arg\min_x\mathcal{L}(x,\nu^k)
   $$
2. **Ascent** ($\nu$-step):
   $$
   \nu^{k+1} = \nu^k+\alpha^kh(x^{k+1})
   $$
   where $\alpha^k>0$ is the step size.

## KKT Conditions

### General Constrained Optimization

Consider a general optimization problem with equality and inequality constraints:

$$
\begin{aligned}
\min_{ x}&f( x)\\\text{s.t. }& g_i( x)\le0\\ &h_j( x)=0
\end{aligned}
$$

the question does not change: how to characterize the necessary conditions for the optimal solution $x^*$ ?

### Geometric Insight

<CenteredImg src="/pic/Pasted image 20250925124312.png" width=100% />

**Challenge:**

1. **Directionality:** On the boundary, $\nabla g_i$ points towards the exterior of the feasible region. To prevent $f$ from pushing the point into an infeasible area, $\nabla f$ must have a component opposite to $\nabla g_i$ $\Longrightarrow$ $\mu_i\ge0$.
2. **Activity Identification:** The optimum may lie in the interior of the region with $g_i < 0$ or on the boundary with $g_i = 0$ $\Longrightarrow$ $\mu_ig_i=0$.

### Summary

<CenteredImg src="/pic/Pasted image 20250925131518.png" width=50% />

1. **Stationarity:** $0\in\partial_{ x}[f( x)+\sum_i\mu_ig_i(x)+\sum_j\nu_jh_j(x)]$
2. **Complementary Slackness:** $\mu_ig_i( x)=0$
3. **Primal Feasibility:** $g_i(x)\le0,h_j(x)=0$
4. **Dual Feasibility:** $\mu_i\ge0$
