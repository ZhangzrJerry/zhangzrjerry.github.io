C. Forster, L. Carlone, F. Dellaert, and D. Scaramuzza, “On-Manifold Preintegration for Real-Time Visual--Inertial Odometry,” _IEEE Trans. Robot._, vol. 33, no. 1, pp. 1–21, Feb. 2017, doi: [10.1109/TRO.2016.2597321](https://doi.org/10.1109/TRO.2016.2597321). ==TODO==

感觉这篇的数学表示很详细，结合之前李群李代数的笔记，小小重新推一遍

##### 特殊正交群 $SO(3)$

定义特殊正交群 SO(3)$

$$
SO(3) = \set{R\in\R^{3\times3}:R^TR=I,\det(R)=1}
$$

定义流形上的切空间 $\mathfrak {so}(3)$

$$
\boldsymbol\omega^\wedge = \begin{bmatrix}
\omega_1 \\ \omega_2 \\ \omega_3
\end{bmatrix}^\wedge = \begin{bmatrix}
0 & -\omega_3 & \omega_2 \\
\omega_3 & 0 & -\omega_1 \\
-\omega_2 & \omega_1 & 0 \\
\end{bmatrix} \in \mathfrak{so}(3) \tag{1}
$$

$\mathfrak {so}(3)$ 和 $\R^3$ 的转换由反对称算子给出

$$
S=\boldsymbol\omega^\wedge, S^\vee=\boldsymbol\omega
$$

由指数映射的泰勒展开和叉积的性质可以得到 $\exp:\mathfrak {so}(3)\to SO(3)$

$$
\begin{aligned}
R
&= \exp(\phi^\wedge) \\
&= \sum_{n=0}^\infty\frac{(\phi^\wedge)^n}{n!} \\
&= I + \bigg(||\phi||-\frac{||\phi||^3}{3!}+\frac{||\phi||^5}{5!}+\cdots\bigg)\phi^\wedge+\bigg(\frac{||\phi||^2}{2!}-\frac{||\phi||^4}{4!}+\frac{||\phi||^6}{6!}-\cdots\bigg)(\phi^\wedge)^2 \\
&= I + \frac{\sin||\phi||}{||\phi||}\phi^\wedge+\frac{1-\cos||\phi||}{||\phi||^2}(\phi^\wedge)^2 \\
&\approx I + \phi^\wedge
\end{aligned} \tag{3}
$$

对数映射则由特殊正交群的迹和李群性质得到

$$
\begin{aligned}
{\rm tr}(R) &= {\rm tr}(I) + \frac{\sin||\phi||}{||\phi||}{\rm tr}(\phi^\wedge)+\frac{1-\cos||\phi||}{||\phi||^2}{\rm tr}[(\phi^\wedge)^2] \\
&= 3 + 0 + \frac{1-\cos||\phi||}{||\phi||^2}(-||\phi^\wedge||^2) \\
&= 3 + 0 + \frac{1-\cos||\phi||}{||\phi||^2}(-2||\phi||^2) \\
&= 3 + 2\cos||\phi|| - 2
\end{aligned}
$$

$$
||\phi|| = \arccos\bigg(\frac{{\rm tr}(R) - 1}2\bigg) + 2k\pi
$$

当 $\phi\ne0\Leftrightarrow R\ne I$ 时，构造对此部分和非对称部分

$$
R=\underbrace{\frac{\sin||\phi||}{||\phi||}\phi^\wedge}_{\frac12(R-R^T)}+\underbrace{I+\frac{1-\cos||\phi||}{||\phi||^2}(\phi^\wedge)^2}_{\frac12(R+R^T)}
$$

于是

$$
\begin{aligned}
\phi &= \log(R)^\vee \\
&= \bigg[\frac{||\phi||(R-R^T)}{2\sin||\phi||}\bigg]^\vee \\
&= \frac{||\phi||}{2\sin||\phi||}\begin{bmatrix}
r_{32} - r_{23} \\
r_{13} - r_{31} \\
r_{21} - r_{12}
\end{bmatrix}
\end{aligned} \tag{5}
$$

为简便下面将 $\text{Exp}$ 和 $\text{Log}$ 定义在 $\R^3$ 和 $SO(3)$ 之间

记三维空间中一任意向量 $\bf v$ 绕旋转轴 $\bf n=\begin{pmatrix}n_x\\n_y\\n_z\end{pmatrix}$ 旋转 $\theta$ 得到新向量 $\bf v_{rot}$，其中 $\bf n$ 为单位向量，$n_x^2+n_y^2+n_z^2=1$. 则 $\bf v$ 可以根据平行和正交于 $\bf n$ 分为两部分 $\bf v_\parallel$ 和 $\bf v_\perp$，满足 $\bf v=\bf v_\parallel+\bf v_\perp$

其中

$$
\begin{cases}
\mathbf v_\parallel = (\mathbf v\cdot\mathbf n)\mathbf n \\
\mathbf v_\perp = \mathbf v-(\mathbf v\cdot\mathbf n)\mathbf n = -\mathbf n\times(\mathbf n\times\mathbf v)
\end{cases}
$$

$$
\begin{aligned}
\mathbf v_{rot} &= \mathbf v_{\parallel rot} + \mathbf v_{\perp rot} \\
&= \mathbf v_\parallel + \cos\theta\mathbf v_\perp + \sin\theta\mathbf n\times\bf v_\perp \\
&= (\mathbf v\cdot\mathbf n)n + \cos\theta\mathbf v_\perp + \sin\theta\mathbf n\times\mathbf v \\
&= \cos\theta\mathbf v+(1-\cos\theta)(\mathbf n\cdot\mathbf v)\mathbf n + \sin\theta\mathbf n\times\mathbf v
\end{aligned}
$$

也就得到了罗德里格斯旋转公式 Rodrigues' Rotation Formula

将其重新写在流形上则有

$$
R = \cos(||\phi||)I+[1-\cos(||\phi||)]\frac{\phi\phi^T}{||\phi||^2} + \sin(||\phi||)\phi^\wedge
$$

由此得到$R$ 的左右扰动雅可比矩阵

$$
\begin{cases}
J_l(\phi) &= I + \frac{1-\cos(||\phi||)}{||\phi||^2}\phi^\wedge + \frac{||\phi||-\sin(||\phi||)}{||\phi||^3}(\phi^\wedge)^2 \\
J_r(\phi) &= I - \frac{1-\cos(||\phi||)}{||\phi||^2}\phi^\wedge + \frac{||\phi||-\sin(||\phi||)}{||\phi||^3}(\phi^\wedge)^2 \\
J_l^{-1}(\phi) &= I - \frac12\phi^\wedge + \left(\frac1{||\phi||^2} + \frac{1+\cos(||\phi||)}{2||\phi||\sin(||\phi||)}\right)(\phi^\wedge)^2 \\
J_r^{-1}(\phi) &= I + \frac12\phi^\wedge + \left(\frac1{||\phi||^2} + \frac{1+\cos(||\phi||)}{2||\phi||\sin(||\phi||)}\right)(\phi^\wedge)^2 \\
\end{cases} \tag{8}
$$

由于特殊正交群无法定义一般形式的增量，只能利用李代数的扰动模型

$$
\text{Exp}(\phi+\Delta\phi) = \text{Exp}(\bold J_l\Delta\phi)\text{Exp}(\phi) = \text{Exp}(\phi) = \text{Exp}(\bold J_r \Delta\phi) \tag{7}
$$

李群上有二元运算符李括号

$$
[A,B] = AB-BA
$$

由贝克-坎贝尔-豪斯多夫公式 Baker-Campbell-Hausdorff Formula 可得

$$
\begin{aligned}
&\log(\text{Exp}(\alpha)\text{Exp}(\beta))\\
=&\log(AB)\\=&\sum_{n=1}^\infty\frac{(-1)^{n-1}}n\sum_{r_i+s_i>0,i\in[1,n]}\frac{(\sum_{i=1}^n(r_i+s_i))^{-1}}{\Pi_{i=1}^n(r_i!s_i!)}[A^{r_1}B^{s_1}A^{r_2}B^{s_2}\cdots A^{r_n}B^{s_n}]\\
=&A+B+\frac12[A,B]+\frac1{12}[A,[A,B]]-\frac1{12}[B,[A,B]]+\cdots\\
\approx&
\begin{cases}
\beta+J_l(\beta)^{-1}\alpha,&\alpha\to0\\
\alpha+J_r(\alpha)^{-1}\beta,&\beta\to0\\
\end{cases}
\end{aligned}\tag{9}
$$

对任意向量 $v\in\R^3$, 由叉积及特殊正交群的性质可得

$$
(Rp)^\wedge v = (Rp) \times v = (Rp) \times (RR^{-1}v) = R[p\times (R^{-1}v)] = Rp^\wedge R^Tv
$$

$Rp^\wedge R^T=(Rp)^\wedge$ 对指数映射泰勒展开的每一项成立，因此有

$$
R\exp(\phi^\wedge)R^T = \exp((R\phi)^\wedge)
$$

等价地有

$$
R\text{Exp}(\phi)R^T=\text{Exp}(R\phi) \tag{10}
$$

##### 特殊正交群的不确定性描述

一种直觉地定义是在旋转矩阵上右乘一个微小扰动，这个扰动服从正态分布

$$
\tilde R=R\cdot\text{Exp}(\epsilon),\ \epsilon\in\mathcal N(0,\Sigma)\tag{12}
$$

对高斯分布有积分模型

$$
\int_{\R^3}p(\epsilon){\rm d}\epsilon = \int_{\R^3}\frac1{\sqrt{(2\pi)^3\det(\Sigma)}}\cdot\exp\bigg({-\frac12||\epsilon||^2_\Sigma}\bigg){\rm d}\epsilon=1 \tag{13}
$$

将 $\epsilon$ 用 $\text{Log}(R^{-1}\tilde R)$ 进行替换

$$
\int_{SO(3)}\frac1{\sqrt{(2\pi)^3\det(\Sigma)}}\cdot\exp\bigg({-\frac12\big|\big|\text{Log}(R^{-1}\tilde R)\big|\big|^2_\Sigma}\bigg)\left|\frac{{\rm d}\epsilon}{{\rm d}\tilde R}\right|{\rm d}\tilde R=1
$$

缩放因子由右乘模型给出

$$
\left|\frac{{\rm d}\epsilon}{{\rm d}\tilde R}\right| = \left|\frac1{J_r(\text{Log}(R^{-1}\tilde R))}\right|
$$

重新整理得到

$$
\int_{SO(3)}\frac1{\sqrt{(2\pi)^3\det(\Sigma)}}\cdot\left|\frac1{J_r(\text{Log}(R^{-1}\tilde R))}\right|\cdot\exp\bigg({-\frac12\big|\big|\text{Log}(R^{-1}\tilde R)\big|\big|^2_\Sigma}\bigg){\rm d}\tilde R=1\tag{14}
$$

由多元高斯分布模型可得

$$
p(\tilde R) =\frac1{\sqrt{(2\pi)^3\det(\Sigma)}}\cdot\left|\frac1{J_r(\text{Log}(R^{-1}\tilde R))}\right|\cdot\exp\bigg({-\frac12\big|\big|\text{Log}(R^{-1}\tilde R)\big|\big|^2_\Sigma}\bigg) \tag{15}
$$

对于微小扰动，利用常数项近似 $\frac1{\sqrt{(2\pi)^3\det(\Sigma)}}\cdot\left|\frac1{J_r(\text{Log}(R^{-1}\tilde R))}\right|$, 得到旋转矩阵的负对数似然函数

$$
\begin{aligned}
\mathcal L(R) &= \frac12\big|\big|\text{Log}(R^{-1}\tilde R)\big|\big|^2_\Sigma + c \\
&= \frac12\big|\big|\text{Log}(\tilde R^{-1}R)\big|\big|^2_\Sigma + c
\end{aligned} \tag{16}
$$

##### 流形上的高斯牛顿法

对于一般的高斯牛顿法有

$$
\mathbf x^* = \arg\min_{\mathbf x} f(\mathbf x) \Rightarrow \mathbf x^* = \mathbf x + \arg\min_{\Delta\mathbf x}f(\mathbf x+\Delta\mathbf x)
$$

对于流形则有

$$
x^*=\arg\min_{x\in\mathcal M} f(x) \Rightarrow x^* = \mathcal R_x\cdot\arg\min_{\delta x\in\R^n} f(\mathcal R_x(\delta x))\tag{18}
$$

在 $SO(3)$ 群中映射被定义为

$$
\mathcal R_R(\delta\phi) = R\text{Exp}(\delta\phi),\ \delta\phi\in\R^3\tag{20}
$$

在 $SE(3)$ 群中则为

$$
\mathcal R_T(\delta\phi,\delta\mathbf p)=\begin{bmatrix}R\text{Exp}(\delta\phi) & \mathbf p+R\delta\mathbf p\end{bmatrix},\ \begin{bmatrix}\delta\phi \\ \delta\mathbf p\end{bmatrix}\in\R^6\tag{21}
$$
