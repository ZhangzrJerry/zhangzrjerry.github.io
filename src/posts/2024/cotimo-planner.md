# CoTiMo Planner Implementation Report

CoTiMo represents Collision-Free Smooth Path Generation, Time-Optimal Path Parameterization, and Model Predictive Control Planner. It is a comprehensive solution for robotic motion planning.

![](https://github.com/ZhangzrJerry/CoTiMo/raw/main/assets/result.gif)

This report provides a detailed explanation of the planner's core algorithmic implementations, covering key modules such as path generation, time parameterization, and model predictive control.

<Badges>
<img src="/tags/ros.svg">
<img src="/tags/cpp.svg">
<a href="https://github.com/zhangzrjerry/cotimo"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zhangzrjerry/cotimo"></a>
</Badges>

## Slide

<Revealjs src="https://zhangzrjerry.github.io/CoTiMo" />

## Collision-Free Smooth Path Generation

### Cubic Spline

For a group of certain points $(x_{0,1},x_{0,2},\cdots,x_{0,m}),(x_{1,1},x_{1,2},\cdots,x_{1,m}), (x_{2,1},x_{2,2},\cdots,x_{2,m}), \cdots, (x_{n,1},x_{n,2},\cdots,x_{n,m})$, we want to find a smooth enough curve that passes all these points to achieve the interpolation goal. To do so, we can use piecewise cubic functions to fitting the points.

<CenteredImg src="/posts/cotimo-planner/1.svg" />

Let's talk about a specific dimention $k$ first. To simplify the denotation, we let $x_i=x_{i,k}$. For a set of $n+1$ points $(x_{0,k},x_{1,k},x_{2,k},\cdots,x_{n,k})$ and for the $i$-th piece of the spline, we can represent it by

$$
q_i(s)=a_is^3+b_is^2+c_is+d_i, \ \ \ \ s\in[0,1],\ i=0,1,\cdots,n-1
$$

To ensure the smooth of the curve, we write down the constraints,

$$
\begin{cases}
q_{i-1}(1)=q_i(0)=x_{i} \\
q_{i-1}'(1)=q_i'(0) \\
q_{i-1}''(1)=q_i''(0)
\end{cases}
$$

Apply $a_i,b_i,c_i,d_i$ to the constraints, we get

$$
\begin{cases}
a_{i-1}+b_{i-1}+c_{i-1}+d_{i-1}=d_i \\
3a_{i-1}+2b_{i-1}+c_{i-1}=c_i \\
6a_{i-1}+2b_{i-1}=2b_i \\
\end{cases}
$$

So we can get the following expressions

$$
\begin{cases}
a_i=x_{i+2}-2x_{i+1}+x_{i} \\
b_i=-x_{i+2}+2x_{i+1,k}-x_{i} \\
c_{i}=x_{i+1}-x_{i} \\
d_i=x_{i}
\end{cases}\ ,\ i=1,2,\cdots,n-1
$$

In open loop case, assume stationary boundary $q_0'(0)=0,q_{n-1}'(1)=0$, which is $c_0=0, 3a_{n-1}+2b_{n-1}+c_{n-1}=0$.

You can also regard $x_{n+2}$ as $x_{n+1}$, so that $x_{n+2}-2x_{n+1}+x_n=-x_{n+1}+x_n$

Convert the expressions to vector form, we have

$$
\left[\begin{matrix}
a_0\\a_1\\a_2\\a_3\\\vdots\\a_{n-2}\\a_{n-1}\\
\end{matrix}\right]=
\left[\begin{matrix}
2&-3&1&0&\cdots&0&0&0\\
0&1&-2&1&\cdots&0&0&0\\
0&0&1&-2&\cdots&0&0&0\\
0&0&0&1&\cdots&0&0&0\\
\vdots&\vdots&\vdots&\vdots&\ddots&\vdots&\vdots&\vdots\\
0&0&0&0&\cdots&1&-2&1\\
0&0&0&0&\cdots&0&1&-1\\
\end{matrix}\right]
\left[\begin{matrix}
x_0\\x_1\\x_2\\x_3\\\vdots\\x_{n-2}\\x_{n-1}\\x_{n}
\end{matrix}\right]
$$

$$
\left[\begin{matrix}
b_0\\b_1\\b_2\\b_3\\\vdots\\b_{n-2}\\b_{n-1}\\
\end{matrix}\right]=
\left[\begin{matrix}
-3&4&-1&0&\cdots&0&0&0\\
0&-1&2&-1&\cdots&0&0&0\\
0&0&-1&2&\cdots&0&0&0\\
0&0&0&-1&\cdots&0&0&0\\
\vdots&\vdots&\vdots&\vdots&\ddots&\vdots&\vdots&\vdots\\
0&0&0&0&\cdots&-1&2&-1\\
0&0&0&0&\cdots&0&-1&1\\
\end{matrix}\right]
\left[\begin{matrix}
x_0\\x_1\\x_2\\x_3\\\vdots\\x_{n-2}\\x_{n-1}\\x_{n}
\end{matrix}\right]
$$

$$
\left[\begin{matrix}
c_0\\c_1\\c_2\\c_3\\\vdots\\c_{n-2}\\c_{n-1}\\
\end{matrix}\right]=
\left[\begin{matrix}
0&0&0&0&\cdots&0&0&0\\
0&-1&1&0&\cdots&0&0&0\\
0&0&-1&1&\cdots&0&0&0\\
0&0&0&-1&\cdots&0&0&0\\
\vdots&\vdots&\vdots&\vdots&\ddots&\vdots&\vdots&\vdots\\
0&0&0&0&\cdots&-1&1&0\\
0&0&0&0&\cdots&0&-1&1\\
\end{matrix}\right]
\left[\begin{matrix}
x_0\\x_1\\x_2\\x_3\\\vdots\\x_{n-2}\\x_{n-1}\\x_{n}
\end{matrix}\right]
$$

$$
\left[\begin{matrix}
d_0\\d_1\\d_2\\d_3\\\vdots\\d_{n-2}\\d_{n-1}\\
\end{matrix}\right]=
\left[\begin{matrix}
1&0&0&0&\cdots&0&0&0\\
0&1&0&0&\cdots&0&0&0\\
0&0&1&0&\cdots&0&0&0\\
0&0&0&1&\cdots&0&0&0\\
\vdots&\vdots&\vdots&\vdots&\ddots&\vdots&\vdots&\vdots\\
0&0&0&0&\cdots&1&0&0\\
0&0&0&0&\cdots&0&1&0\\
\end{matrix}\right]
\left[\begin{matrix}
x_0\\x_1\\x_2\\x_3\\\vdots\\x_{n-2}\\x_{n-1}\\x_{n}
\end{matrix}\right]
$$

For every dimension in $x$, we would obtain four vector $a, b, c, d$

### Minimize Stretch Energy

Then, we can define energy function by acceleration

$$
Energy(x_0,x_1,\cdots,x_n)=\sum_{i=1}^{n-1}\int_0^1||q_i''(s)||_1{\rm d}s
$$

But in practice, I use the following formula

$$
Energy(x_0,x_1,\cdots,x_n)=\sum_{i=1}^{n-1}||x_{i-1}-2x_i+x_{i+1}||^2
$$

### Collision Free

We want to avoid our robot get crashed into the obstacle. So that we also need to define a potential function.

First, we need to calculate the distance between the robot and the obstacle. Which is find a point $o$ in obstacle ($Ao\leq b$), to minimize the distance from robot $x$ to point $o$

$$
\begin{aligned}
\min\ & ||o-x||^2 \\
\text{s.t.}\ &Ao\leq b
\end{aligned}
$$

$$
\begin{aligned}
\min\ & o^To-2x^To+x^Tx \\
\text{s.t.}\ &Ao\leq \text{b}
\end{aligned}
$$

<CenteredImg src="/posts/cotimo-planner/2.gif" width="50%" />

By SOCP, we can obtain the distance vector

$$
d(x)=\left[\begin{matrix}
d(x,o_1),d(x,o_2),\cdots,d(x,o_m)
\end{matrix}\right]^T
$$

And the potential function would be defined as below

$$
Potential(x_0,x_1,\cdots,x_n) = \sum_{i=0}^{n}\exp(||d(x_i)||_\infty)
$$

### Loss Function

$$
Loss(x_0,x_1,\cdots,x_n)=\eta\cdot Energy(x_0,x_1,\cdots,x_n)+(1-\eta)\cdot Potential(x_0,x_1,\cdots,x_n)
$$

Finally, we convert the problem to an optimization problem, we can use Line Search, Quasi Newton, LBFGS, or Newton-CG to solve it.

$$
\min_{x_0,x_1,\cdots,x_n}Loss(x_0,x_1,\cdots,x_n)
$$

In practice, I add some trick to make the optimizer more stable. Additional to five different $\eta$, I introduce **sigmoid** function in update step.

$$
\sigma(x)=\frac1{1+e^{-x}}=\frac{e^x}{1+e^x}=1-\sigma(-x)
$$

$$
x^{k+1}=x^{k}-\eta_k\left[2\cdot\sigma\big(\nabla Loss(x)\big)-1\right]
$$

## Time Optimal Path Parameterization

### Continuous Case

After optimizing the control points $x_0, x_1, \cdots, x_n$, we get a spline $q$ uniquely determined by arc-length $s$.

Then the optimal time $T$ is integrated by

$$
T = \int_0^T 1\ {\rm d}t = \int_0^L\frac1{\frac{{\rm d}s}{{\rm d}t}}{\rm d}s
$$

Additional to $q(s)$, $\frac{{\rm d}q}{{\rm d}s}$ and $\frac{{\rm d}^2q}{{\rm d}s^2}$ are also known. Because the cubic spline is second order differentiable.

We also have velocity constraint,

$$
-v_{max}\leq v\leq v_{max}
$$

acceleration constraint,

$$
-a_{max}\leq a\leq a_{max}
$$

and always move forward constraint

$$
\frac{{\rm d}s}{{\rm d}t}>0
$$

The true velocity is

$$
\frac{{\rm d}q}{{\rm d}t} = \frac{{\rm d}q}{{\rm d}s}\cdot\frac{{\rm d}s}{{\rm d}t}
$$

The true acceleration is

$$
\frac{{\rm d}^2q}{{\rm d}t^2}=\frac{{\rm d}^2q}{{\rm d}s^2}\cdot\frac{{\rm d}s}{{\rm d}t}+\frac{{\rm d}q}{{\rm d}s}\cdot\frac{{\rm d}^2s}{{\rm d}t^2}
$$

Denote

$$
a(s) = \frac{{\rm d}^2s}{{\rm d}t^2},\ b(s)=\bigg(\frac{{\rm d}s}{{\rm d}t}\bigg)^2
$$

Then the problem is described by

$$
\begin{aligned}
\min_{a(s),b(s)}\ & \int_0^L\frac1{\sqrt{b(s)}}{\rm d}s \\
\text{s.t.}\ & b'(s)=2a(s) \\
& q'(0)\sqrt{b(0)} = v_0 \\
& q'(L)\sqrt{b(L)} = v_L  \\
& b(s) > 0\ \ \  (\geq) \\
& ||q'(s)\sqrt{b(s)}||_\infty\le v_\max \\
& ||q''(s)b(s) + q'(s)a(s) ||_\infty \le a_\max \\
\end{aligned}
$$

### Discrete Case

Try to obtain the discretized form $a\in{\mathbb R}^K,s,b\in{\mathbb R}^{K+1}$. $K$ is different from the number of curves or control points $N$ and is the result of resampling the curve. Usually $K$ is greater than $N$.

$$
\begin{aligned}
\min_{a,b} & \sum_{k=1}^{K}\frac{2(s^{k+1}-s^k)}{\sqrt{b^{k+1}}+\sqrt{b^k}} \\
{\text s.t.}\
& \frac{b^{k+1}-b^k}{s^{k+1}-s^k}=2a^k, &\forall k\in[1,K]\\
& q'(s^0)\sqrt{b^0} = v_0 \\
& q'(s^{K+1})\sqrt{b^{K+1}}=v_L \\
& b^k \ge 0, &\forall k\in[1,K+1] \\
& ||q'(s^k)\sqrt{b^k}||_\infty\le v_\max, &\forall k\in[1,K+1] \\
& ||q''(s^k)b^k + q'(s^k)a^k ||_\infty \le a_\max, &\forall k\in[1,K]\\
\end{aligned}
$$

### Second-Order Cones

To rewrite the problem to a second-order conic programming form, we first try to bound nonlinear term $\sqrt{b^k}$ with $c^k$, such that $\sqrt{b^k}\ge c^k,k\in[1,K+1]$. Going a step further, we introduce one more slack variable $d^k$, which satisfies $\frac1{c^{k+1}+c^k}\le d^k,k\in[1,K]$.

$$
\min_{a,b} \sum_{k=1}^{K}\frac{2(s^{k+1}-s^k)}{\sqrt{b^{k+1}}+\sqrt{b^k}}  \Leftrightarrow\
\begin{aligned}
\min_{a,b,c,d} &\sum_{k=1}^K 2d^k(s^{k+1}-s^k) \\
{\text s.t.}\
& \left|\left|\begin{matrix}c^k+c^{k+1}-d^k\\2\end{matrix}\right|\right|_2\le c^{k}+c^{k+1}+d^k, &\forall k\in[1,K] \\
& \left|\left|\begin{matrix}b^k-1\\2c^k\end{matrix}\right|\right|_2\le b^k+1, &\forall k\in[1,K+1] \\
\end{aligned}
$$

$$
\begin{aligned}
\left|\left|\begin{matrix}c^k+c^{k+1}-d^k\\2\end{matrix}\right|\right|_2\le c^{k}+c^{k+1}+d^k & \Leftrightarrow \begin{bmatrix}c^k+c^{k+1}+d^k\\c^k+c^{k+1}-d^k\\2\end{bmatrix}\in{\mathcal Q^3} \\
\left|\left|\begin{matrix}b^k-1\\2c^k\end{matrix}\right|\right|_2\le b^k+1 & \Leftrightarrow \begin{bmatrix}b^k+1\\b^k-1\\2c^k\end{bmatrix}\in{\mathcal Q^3} \\
\end{aligned}
$$

Rewriting the constraints of the optimization problem, especially the nonlinear terms $\sqrt{b_k}$, we get the final objective function (2D case).

$$
\begin{aligned}
\min_{a,b,c,d}& \sum_{k=1}^K 2(s^{k+1}-s^k)d^k \\
{\text s.t.}&
\begin{flalign*}
\begin{bmatrix}c^k+c^{k+1}+d^k\\c^k+c^{k+1}-d^k\\2\end{bmatrix} &\in {\mathcal Q^3}, &&\forall k\in[1,K] \\
\begin{bmatrix}b^k+1\\b^k-1\\2c^k\end{bmatrix} &\in {\mathcal Q^3},
&&\forall k\in[1,K+1] \\
2(s^{k+1}-s^k)a^k+b^k-b^{k+1} &=0, &&\forall k\in[1,K] \\
\left\{\left[q'_x(s^0)\right]^2+\left[q_y'(s^0)\right]^2\right\}(b^0)^2 &= v_0^2 \\
\left\{\left[q'_x(s^{K+1})\right]^2+\left[q_y'(s^{K+1})\right]^2\right\}(b^{K+1})^2 &= v_L^2 \\
-b^k &\le 0, &&\forall k\in[1,K+1] \\
\left[q'_x(s^k)\right]^2b^k &\le v^2_\max, &&\forall k\in[1,K+1] \\
\left[q'_y(s^k)\right]^2b^k &\le v^2_\max, &&\forall k\in[1,K+1] \\
\left[q''_x(s^k)\right]^2b^k+q'_x(s^k)a^k &\le a_\max, &&\forall k\in[1,K] \\
\left[q''_y(s^k)\right]^2b^k+q'_y(s^k)a^k &\le a_\max, &&\forall k\in[1,K] \\
-\left[q''_x(s^k)\right]^2b^k-q'_x(s^k)a^k &\le a_\max, &&\forall k\in[1,K] \\
-\left[q''_y(s^k)\right]^2b^k-q'_y(s^k)a^k &\le a_\max, &&\forall k\in[1,K] \\
\end{flalign*}
\end{aligned}
$$

### PHR ALM for Symmetric Cones

All constraints are divided into second-order cone constraints, equality constraints and inequality constraints.

$$
\begin{aligned}
\min_x\ & c^Tx \\
{\text s.t.}\
& A_i+b_i\in K_i \\
& Gx=h \\
& Px\le q \\
\end{aligned}
$$

Therefore, we can reformulate the problem using the Augmented Lagrangian method for Symmetric Cones.

$$
\begin{aligned}
{\mathcal L}_\rho(x,\mu,\lambda,\eta) =
& c^Tx + \\
& \frac\rho2\sum_{i=1}^m ||P_{K_i}(\frac{\mu_i}\rho-A_ix-b_i)||^2 + \\
& \frac\rho2||Gx-h-\frac\lambda\rho||^2 + \\
& \frac\rho2||\max[Px-Q+\frac\eta\rho,0]||^2
\end{aligned}
$$

$P_{\mathcal K}$ is the projection of a vector on a symmetric cone

$$
P_{\mathcal K}(v)=\arg\min_{x\in\mathcal K}||v-x||^2
$$

In second order cone case,

$$
P_{\mathcal K=\mathcal Q^n}(v)=\begin{cases}
0, &v_0\le-||v_1||_2 \\
\frac{v_0+||v_1||_2}{2||v_1||_2}(||v_1||_2,v_1)^T, &|v_0|<||v_1||_2 \\
v, &v_0\ge||v_1||_2
\end{cases}
$$

And the gradient of the augmented Lagrangian function is given by

$$
\begin{aligned}
\nabla{\mathcal L}_\rho(x,\mu,\lambda,\eta) =
& c + \rho\sum_{i=1}^m A_i^TP_{K_i}(\frac{\mu_i}\rho-A_ix-b_i) + \\
& \rho G^T(Gx-h-\frac\lambda\rho) + \\
& \rho P\{\max[Px-Q+\frac\eta\rho,0]\}
\end{aligned}
$$

So we can use a L-BFGS method to solve this convex and unconstrained function.

$$
\begin{aligned}
x &\leftarrow \arg\min_x \mathcal L_\rho(x,\mu,\lambda,\eta) \\
\mu_i &\leftarrow P_{\mathcal K_i}(\mu_i-\rho(A_ix+b_i)) \\
\lambda &\leftarrow \lambda + \rho(Gx-h) \\
\eta &\leftarrow \max[\eta+\rho(Px-q),0] \\
\rho &\leftarrow \min[(1+\gamma)\rho,\beta] \\
\end{aligned}
$$

$\gamma$ is the growth rate of $\rho$ and $\beta$ is the upper bound of $\rho$, which is typically `1e3`

## Model Predictive Control

### Swerve Kinematic Model

<RightImg src="/posts/cotimo-planner/3.webp" width="40%" />

A simple omnidirectional platform is mecanum wheel chassis. But for a FRC player, a swerve chassis is what we need.

Consider only the translation case. Let's simply denote $(x,y)$ for position, $v$ for velocity, $a$ for acceleration, $\theta$ for angle, $\omega$ for angular velocity, $\alpha$ for angular acceleration.

$$
\begin{bmatrix}
\dot x \\
\dot y \\
\dot v \\
\dot \theta \\
\dot \omega \\
\end{bmatrix} = \begin{bmatrix}
v\cos\theta \\
v\sin\theta \\
a \\
\omega \\
\alpha \\
\end{bmatrix}
$$

So that, we can use the following equation to update the states in discrete time domian.

$$
\begin{cases}
v_{k+1} = v_k +a\cdot\Delta t \\
\omega_{k+1} = \omega_k + \alpha\cdot\Delta t \\
\theta_{k+1} = \theta_k + \frac12(\omega_k+\omega_{k+1})\cdot\Delta t \\
x_{k+1} = x_k+\frac12(v_k\cos\theta_k+v_{k+1}\cos\theta_{k+1})\cdot\Delta t \\
y_{k+1} = y_k+\frac12(v_k\sin\theta_k+v_{k+1}\sin\theta_{k+1})\cdot\Delta t \\
\end{cases},\ \ u_k=\begin{bmatrix}a\\\alpha\end{bmatrix}
$$

### Objective Function

Denote the number of control points of optimal control is $M$, and $\bar u_k=\begin{bmatrix}u_{k}^T&u_{k+1}^T&\cdots u_{k+M-1}^T\end{bmatrix}^T\in\mathbb R^{2M}$

$$
{\text Loss}(\bar u_k)=\sum_{i=0}^{M-1}\left[
\begin{aligned}
&(x_{k+i}-\hat x_{k+1})^2+ \\
&(y_{k+i}-\hat y_{k+1})^2+ \\
&\omega_a(a_{k+i-1}-a_{k+i})^2+\\
&\omega_\alpha(\alpha_{k+i-1}-\alpha_{k+1})^2
\end{aligned}\right]
$$

$$
\begin{aligned}
\min_{\bar u_k}\ & {\text Loss}(\bar u_k) \\
{\text s.t.}\ & a_\min\le a_i\le a_\max, &\forall i\in[k,k+M-1] \\
& \alpha_\min\le \alpha_i\le \alpha_\max, &\forall i\in[k,k+M-1] \\
\end{aligned}
$$

The method to solve this objective function is similar to the PHR ALM method mentioned above, except that the terms related to the symmetric cone are removed.

## Reference

|               Image               | Link                                                                                                  |
| :-------------------------------: | ----------------------------------------------------------------------------------------------------- |
| ![](/posts/cotimo-planner/1.svg)  | https://mathworld.wolfram.com/images/eps-svg/CubicSpline_700.svg                                      |
| ![](/posts/cotimo-planner/2.gif)  | https://www.tandfonline.com/cms/asset/bc9fed8a-15a8-49ee-96be-ce81ead2a54b/tgis_a_1988088_f0001_b.gif |
| ![](/posts/cotimo-planner/3.webp) | https://www.freshconsulting.com/wp-content/uploads/2023/02/image-1536x1022.png                        |
