# ELEC 5650 - Mathematic Tools

> "We have decided to call the entire field of control and communication theory, whether in the machine or in the animal, by the name Cybernetics, which we form from the Greek ... for steersman."
>
> &nbsp;_-- by Norbert Wiener_{style="float:right"}

<CenteredImg src="/posts/elec-5650/linear-algebra.png" width=50% />

This is the lecture notes for "ELEC 5650: Networked Sensing, Estimation and Control" in the 2024-25 Spring semester, delivered by Prof. Ling Shi at HKUST. In this session, we will cover essential mathematical tools and concepts from linear algebra, matrix theory, and system theory that are fundamental to networked sensing, estimation, and control.

1. [**Mathematic Tools**](./math-tools.md) <--
2. [_Estimation Theory_](./estimation.md)
3. [_Kalman Filter_](./kalman-filter.md)
4. [_Linear Quadratic Regulator_](./lqr.md)

<Badges>
<img src="/tags/hkust.svg">
<img src="/tags/math.svg">
</Badges>

## Eigenvalues

$A\in\mathbb R^{n\times n}$, $\lambda$ can be solved by

$$\text{det}(\lambda I-A)=0$$

$$
\prod_{i=1}^n\lambda_i=\text{det}(A),\quad\sum_{i=1}^n\lambda_i=\text{Tr}(A),\quad Av_i=\lambda_iv_i
$$

### Lemme

Let $A\in\mathbb R^{n\times m}, B$ the non-zero eigenvalues of $AB$ and $BA$ are the same

### Proof

$$
\underbrace{\begin{bmatrix}I&0\\B&I\end{bmatrix}}_{P}\underbrace{\begin{bmatrix}I&0\\-B&I\end{bmatrix}}_{P^{-1}}=\begin{bmatrix}I&0\\0&I\end{bmatrix}=I
$$

$$
\underbrace{\begin{bmatrix}I&0\\B&I\end{bmatrix}}_{P}\begin{bmatrix}AB&A\\0&0\end{bmatrix}\underbrace{\begin{bmatrix}I&0\\-B&I\end{bmatrix}}_{P^{-1}}=\begin{bmatrix}0&A\\0&BA\end{bmatrix}
$$

### Corollary

$$
\text{Tr}(AB)=\text{Tr}(BA),\quad \text{Tr}(ABC)=\text{Tr}(BCA)=\text{Tr}(CAB)
$$

$$
\text{Tr}(ABC)\neq\text{Tr}(ACB)
$$

## Cholesky Decomposition

If $A\succeq0$, then $\exists$ a lower triangular matrix $L$ with **real** and **non-negative diagonal entrie**s such that

$$
A=LL^T=\begin{bmatrix}
\ddots & & 0 \\
& \ddots & \\
\ddots & & \ddots
\end{bmatrix}\begin{bmatrix}
\ddots & & \ddots \\
& \ddots & \\
0 & & \ddots
\end{bmatrix}
$$

$$
A=\begin{bmatrix}a_{11}&\mathbf a_{12}\\\mathbf a_{21}&A_{22}\end{bmatrix},\quad L=\begin{bmatrix}l_{11}&\mathbf 0\\\mathbf l_{21}&L_{22}\end{bmatrix}
$$

$$
\begin{bmatrix}a_{11}&\mathbf a_{12}\\\mathbf a_{21}&A_{22}\end{bmatrix}=\begin{bmatrix}l_{11}&\mathbf 0\\\mathbf l_{21}&L_{22}\end{bmatrix}\begin{bmatrix}l_{11}&\mathbf l_{21}^T\\\mathbf 0&L_{22}^T\end{bmatrix}=\begin{bmatrix}l_{11}^2 & l_{11}\mathbf l_{21}^T\\l_{11}\mathbf l_{21}&\mathbf l_{21}\mathbf l_{21}^T+L_{22} L_{22}^T\end{bmatrix}
$$

$$
l_{11}=\sqrt{a_{11}},\quad\mathbf l_{21}=\frac1{l_{11}}\mathbf a_{21},\quad L_{22}L_{22}^T=A_{22}-\mathbf l_{21}\mathbf l_{21}^T
$$

**Recursive Calculation !!!**

<!-- ##  Positive Definite

Already very familiar, omit #TODO: finish it -->

## Matrix Inversion Lemma

For matrix $A$ and $B$

$$
(A+B)^{-1} = A^{-1}(I+BA^{-1})^{-1}
$$

For any matrix $A,B,C,D$ with compatible dimensions, $A,C$ nonsingular, then

$$
\begin{aligned}
(A+BCD)^{-1} &= [A(I+A^{-1}BCD)]^{-1} \\
&= (I+A^{-1}BCD)^{-1}(I+A^{-1}BCD-A^{-1}BCD)A^{-1} \\
&= [I-(I+A^{-1}BCD)^{-1}A^{-1}BCD]A^{-1} \\
&= A^{-1}-(I+A^{-1}BCD)^{-1}A^{-1}BCDA^{-1} \\
&= A^{-1}-(I+A^{-1}BCDA^{-1}A)^{-1}A^{-1}BCDA^{-1} \\
&= A^{-1}-A^{-1}BCDA^{-1}(I+AA^{-1}BCDA^{-1})^{-1} \\
&= A^{-1}-A^{-1}B[CDA^{-1}(I+BCDA^{-1})^{-1}] \\
&= A^{-1}-A^{-1}B[(I+CDA^{-1}B)^{-1}CDA^{-1}] \\
&= A^{-1}-A^{-1}B[CC^{-1}+CDA^{-1}B]^{-1}CDA^{-1} \\
&= A^{-1}-A^{-1}B[C(C^{-1}+DA^{-1}B)]^{-1}CDA^{-1} \\
&= A^{-1}-A^{-1}B(C+DA^{-1}B)^{-1}DA^{-1} \\
\end{aligned}
$$

### Schur Complement

$$
\begin{bmatrix}
\rm A & \rm B \\ \rm C & \rm D
\end{bmatrix}=\begin{bmatrix}
\rm I & 0 \\ \rm CA^{-1} & \rm I
\end{bmatrix}\begin{bmatrix}
\rm A & 0 \\ 0 & \rm D-CA^{-1}B
\end{bmatrix}\begin{bmatrix}
\rm I & \rm A^{-1}B \\ 0 & \rm I
\end{bmatrix}
$$

$$
\begin{bmatrix}
\rm A & \rm B \\ \rm C & \rm D
\end{bmatrix}=\begin{bmatrix}
\rm I & \rm BD^{-1} \\ 0 & \rm I
\end{bmatrix}\begin{bmatrix}
\rm A-BD^{-1}C & 0 \\ 0 & \rm D
\end{bmatrix}\begin{bmatrix}
\rm I & 0 \\ \rm D^{-1}C & \rm I
\end{bmatrix}
$$

## Inner Product Space

$\mathbf u,\mathbf v\in\mathcal V$, the inner product $\langle\mathbf u,\mathbf v\rangle$ satisfies

1. **Linearity**: $\langle\alpha_1\mathbf u_1+\alpha_2\mathbf u_2,\mathbf v\rangle=\alpha_1\langle\mathbf u_1,\mathbf v\rangle+\alpha_2\langle\mathbf u_2,\mathbf v\rangle$
2. **Conjugate Symmetry**: $\langle\mathbf u,\mathbf v\rangle=\langle\mathbf v,\mathbf u\rangle^*$, $(·)^*$ means transpose
3. **Positive Definiteness**: $||\mathbf u||^2=\langle\mathbf u,\mathbf u\rangle=0\Leftrightarrow\mathbf u=0$

For two random variables $X,Y$, define $\langle X,Y\rangle=E[XY^T]$

### Projection Theorem

Let $\mathcal H\in\mathbb R^{m}$ be a linear **subspace** of $\mathcal S\in\mathbb R^n,(m<n)$. For some vector $\mathbf y\in\mathcal S$, the projection of $\mathbf y$ onto $\mathcal H$ denoted as $\hat{\mathbf y}_{\mathcal H}$ is a **uniyque** element in $\mathcal H$, such that $\forall\mathbf x\in\mathcal H,\langle\mathbf y-\hat{\mathbf y}_{\mathcal H},\mathbf x\rangle=0$, in other word $\mathbf y-\hat{\mathbf y}_{\mathcal H}\perp\mathbf x$.

## Gram-Schmidt Process

Let $\set{\mathbf v_1,\mathbf v_2,...\mathbf v_n}$ be a set of **linearly independent** vectors in an inner product space VV. The Gram-Schmidt process constructs an **orthonormal basis** $\set{\mathbf u_1,\mathbf u_2,\cdots,\mathbf u_n}$ for the subspace spanned by $\set{\mathbf v_1,\mathbf v_2,...\mathbf v_n}$ as follows:

$$
\begin{aligned}
\mathbf u_1 &= \mathbf v_1 \\
\mathbf u_2 &= \mathbf v_2 - \text{proj}_{\mathbf u_1}(\mathbf v_2) \\
&\quad\vdots \\
\mathbf u_k &= \mathbf v_k - \sum_{j=1}^{k-1}\text{proj}_{\mathbf u_j}(\mathbf v_k)
\end{aligned}\qquad\mathbf e_i = \frac{\mathbf u_i}{||\mathbf u_i||}
$$

## Autonomous System

A linear system $x_{k+1}=Ax_k$ is said to be stable if

$$
\forall x_0,\lim_{k\to\infty}|x_k|=0
$$

The system is stable if and only if

$$
\max_i|\lambda_i(A)|<1
$$

## Controllability

A linear system $x_{k+1}=Ax_k+Bu_k$ is said to be controllable if

$$
\forall x_0,x^*,\exists k>0,\mathbf u_k=[u_{k-1},\cdots,u_1,u_0],\quad\text{s.t.}\quad x_k=x^*.
$$

$(A,B)$ is **controllable** is equivalent to the following

1. $M_c=[B,AB,A^2B,\cdots,A^{n-1}B]$ is full rank
2. $W_c=\sum_{k=0}^{n-1}A^kBB^T(A^T)^k$ is full rank
3. **PBH test**: $\forall\lambda\in\mathbb C,[A-\lambda I, B]$ is full rank

Assume $(A,B)$ is controllable, given $x_0, x^*$, find $\mathbf u_n$ such that $x_n=x^*$

$$
\begin{aligned}
x^* = x_n &= Ax_{n-1} + Bu_{n-1} \\
&= A(Ax_{n-2} + Bu_{n-2}) + Bu_{n-1} \\
&= A^2x_{n-2} + ABu_{n-2} + Bu_{n-1} \\
&= A^nx_0 + A^{n-1}Bu_0 + \cdots + ABu_{n-2} + Bu_{n-1} \\
&= A^nx_0 + M_c\mathbf u_n
\end{aligned}
$$

$$
\mathbf u_n = M_c^T(M_cM_c^T)^{-1}(x^*-A^nx_0)
$$

## Observability

A linear system $x_{k+1}=Ax_k, y_k=Cx_k$ is said to be observable if $\forall x_0,\exists k>0$, such that $x_0$ can be computed from $\mathbf y_k=[y_0,y_1,\cdots,y_{k-1}]^T$.

$(A,C)$ is **observable** is equivalent to the following

1. $M_o=\begin{bmatrix}C\\CA\\\vdots\\CA^{n-1}\end{bmatrix}$ is full rank
2. $W_o=\sum_{k=0}^{n-1}(A^k)^TC^TCA^k$ is full rank
3. **PBH test**: $\forall\lambda\in\mathbb C,\begin{bmatrix}A-\lambda I\\C\end{bmatrix}$ is full rank

Assume $(A,C)$ is observable, find $x_0$ from $\mathbf y_k$.

$$
\begin{aligned}
y_0 &= Cx_0 \\
y_1 &= Cx_1 = CAx_0 \\
&\ \ \vdots \\
y_{n-1} &= CA^{n-1}x_0
\end{aligned}\Rightarrow \mathbf y_n=\begin{bmatrix}y_0\\y_1\\\vdots\\y_{n-1}\end{bmatrix}=\begin{bmatrix}C\\CA\\\vdots\\CA^{n-1}\end{bmatrix}x_0=M_ox_0
$$

$$
x_0=(M_o^TM_o)^{-1}M_o^T\mathbf y_n
$$

## Controllability & Observability

$(A,C)$ is observable if and only if $(A^T,C^T)$ is controllable.
