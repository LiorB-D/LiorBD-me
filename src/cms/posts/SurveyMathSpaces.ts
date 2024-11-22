const SURVEY_OF_MATH_SPACES = `
Though our day to day is often restricted to our 3-dimensional Euclidean space, mathematicians often are working in much more diverse and complex spaces.

For the most part, a space is a combination of a set of “points” with some operation allowing these points to interact. The different criteria for these operations are what make these spaces unique and give them different properties. 

In this article, I’ll assume an understanding of Vector Spaces and Set notation. We’ll cover:

- Metric Space
- Normed Space
- Inner Product Space
- Complete Metric Space
- Banach Space
- Hilbert Space
- Topological Space
- Hausdorff Space

### Metric Space

Let $X$ be a nonempty set and let $d: X \\times X \\to \\R$ be a function taking two elements of X and producing a real number. $d$ is called a *metric* if it satisfies four conditions for all $x,y,z \\in X$

1) Nonnegativity:  $0 \\leq d(x,y) \\leq \\infty$

2) Symmetry: $d(x,y) = d(y,x)$

3) Triangle Inequality: $d(x,z) \\leq d(x,y) + d(y,z)$

4) Uniqueness: $d(x,y) = 0$  if and only if $x = y$

A metric space is the set $X$ equipped with our metric $d$. The metric is effectively a function telling us the “distance” between two points.

The metric space you are likely most comfortable with is $\\R^2$ equipped with the euclidean metric. If we have two points in the cartesian place $(x_1,y_1), (x_2,y_2) \\in \\R^2$, our euclidean metric is $d((x_1,y_1), (x_2,y_2)) = \\sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}$. Another common metric is the “taxicab” or “manhattan” metric, which just takes the sum of each of the coordinate distances: $d'((x_1,y_1), (x_2,y_2)) = (x_1-x_2) + (y_1-y_2)$.

You can check that both of these metrics satisfy all our conditions.

An easy nonexample is to again take the real number line $\\R$, and let $d(x,y) = |2x-y|$. Note that our function d fails the symmetry requirement since $d(5,2) = |2*5-2| = 8$  but $d(2,5) = |2*2 - 5| = |-1| = 1$. Thus $d$ is not a metrics and we don’t have a metric space.

### Normed Space(Or a normed vector space)

Consider a vector space $V$ over a field $F$. $V$ is a normed linear space if there exists a function(called a norm) $||*||: V \\to \\R$ such that for all $x,y \\in V, k \\in F$ the following rules are satisfied:

1) Nonnegativity: $0 \\leq ||x||$

2) Homogeneity: $|c|||x|| = ||cx||$

3) Triangle Inequality: $||x+y|| \\leq ||x|| + ||y||$

4) Uniqueness: $||x|| = 0$ if and only if $x = 0_v$   

Note that given a norm $||*||$, one can always define a valid metric $d(x,y) = ||x-y||$. Thus every normed space is a metric space as well.(Note the opposite is not always true. Not every metric space is a normed space)

For examples, consider the ones used for metric spaces where the norm is defined $||x|| = d(x,0)$

Thus while a metric tells us “distance", a norm tells us “size”.

### Inner Product Spaces

Note to make things simple, we will only consider the field $F$ to be the real or complex numbers.

An inner product space is a vector space $V$ over a field $F$ equipped with an operation(called an inner product) $\\langle \\cdot,\\cdot\\rangle: V \\times V \\to F$ satisfying three conditions for all $x,y,z \\in V$ and 

1) Conjugate Symmetry: $\\langle x,y \\rangle = \\overline{\\langle y,x \\rangle}$ 

2) Linearity in the first argument: $\\langle ax + by, z\\rangle = a\\langle x,z \\rangle + b \\langle y,z \\rangle$

3) Positive-definiteness: $\\langle x, x \\rangle \\geq 0$  whenever $x \\neq 0$

These conditions might require a bit of unpacking.

If $x = a + bi$ is a complex number, we define its conjugate to be $\\overline{x} = a - bi$. Thus note if our field is the real numbers, for all $x \\in \\R, x = \\overline{x}$. Thus over the real numbers we have that $\\overline{\\langle y,x \\rangle} = \\langle y,x \\rangle$  so our first condition is actually just normal symmetry.

Additionally, when we are working over the real numbers we have: $\\langle ax, y \\rangle = a\\langle x,y \\rangle  = a\\langle y,x \\rangle = \\langle ay,x \\rangle = \\langle x, ay \\rangle$.

Finally consider that we can always define a norm $||x|| = \\sqrt{\\langle x,x \\rangle}$. You can check that all our requirements for a norm are satisfied.

Thus every inner product space can be a normed space, and thus also a metric space.

### Complete Metric Spaces

A metric space $(M,d)$ is called *complete* if any converging sequence $(a_n)$ of elements in $a_n \\in M$ converges to a value in $M$.

More precisely, let $(a_n)$ be a sequence where for all $n \\in \\N, a_n \\in M$. Suppose there exists a point $L$, such that 

$$
\\lim_{n \\to \\infty} d(a_n, L) = 0
$$

We say that $(a_n)$ converges to L. If for any such converging sequence $(a_n)$ we have that its limit $L$ is within $M$, then we call $(M,d)$ a complete metric space.

It may be hard to imagine an example of a metric space that isn’t complete. Consider the open interval $M = (0, 1)$ and $d(x,y) = |x-y|$. Now consider the sequence $(a_n)$ given by $a_n = \\frac{1}{n}$. Now note that 

$$
\\lim_{n\\to\\infty} d(a_n, 0) = \\lim_{n\\to\\infty} d(\\frac{1}{n}, 0) = \\lim_{n\\to\\infty} |\\frac{1}{n} - 0| = \\lim_{n\\to\\infty} \\frac{1}{n} = 0
$$

Thus we have that $L = 0$, but 0 is not in $M$. Thus M is not a complete metric space, since we have found a sequence that converges outside the space.

### Banach Space

A Banach Space $(V, ||\\cdot||)$ is a vector space $V$, paired with a norm, $||\\cdot||$ such that with respect the metric induced by the norm $d(x,y) = ||x-y||$, $V$ is a complete metric space.

Note what makes the Banach space different from any regular complete metric space is the fact that it is a vector space and that the metric is specifically defined in terms of a norm(This is not true of every metric).

### Hilbert Space

A Hilbert Space is an inner product space $(V, \\langle \\cdot, \\cdot\\rangle)$ with a metric defined $d(x,y) = \\sqrt{\\langle x-y, x-y \\rangle}$ forming a complete metric space.

The easiest example is $V = \\R^2$ with the inner product:

$$
\\langle \\begin{pmatrix}x_1 \\\\ y_1\\end{pmatrix} \\begin{pmatrix}x_2 \\\\ y_2\\end{pmatrix} \\rangle = x_1x_2 + y_1 y_2
$$

Which gives us the norm:

$$
||\\begin{pmatrix}x_1 \\\\ y_1\\end{pmatrix}|| = \\sqrt{\\langle \\begin{pmatrix}x_1 \\\\ y_1\\end{pmatrix} , \\begin{pmatrix}x_1 \\\\ y_1\\end{pmatrix}\\rangle} \\\\ = \\sqrt{x^2 + y^2} 
$$

And gives us the metric:

$$
||\\begin{pmatrix}x_1 \\\\ y_1\\end{pmatrix} - \\begin{pmatrix}x_2 \\\\ y_2\\end{pmatrix}|| = ||\\begin{pmatrix}x_1 - x_2 \\\\ y_1 - y_2\\end{pmatrix}|| \\\\ = \\sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}
$$

Which is our standard euclidean distance function.

### Topological Space

 

A Topological Space is a set $X$ combined with a set $\\tau$ called a a topology, where the elements of this topology $\\tau$ are all different subsets of $X$ following certain conditions.

There are a number of different equivalent rules, but the simplest is through the notion of ‘open sets’. $\\tau$ is a topology if the following three conditions are met.

1) The empty set and $X$ are both elements of $\\tau$

2) The union of an arbitrary number of elements of $\\tau$, must also be in $\\tau$

3) The intersection of any finite number of elements of $\\tau$, must also be in $\\tau$

With the elements of $\\tau$ being called open sets.

A very simple example is the set $X = \\{1,2, 3\\}$ with the topology $\\tau =$  $\\{\\{\\}, \\{1\\}, \\{1, 2\\}, \\{1, 2, 3\\}\\}$. 

The real numbers $\\R$ become a topological space with the topology $\\tau = \\{[a, b)| a,b \\in \\R, a <b\\}$. 

While it may be unclear how the notion of a topology is helpful, this collection of different subsets of $X$ allows us to talk about some notion of “closeness”, without requiring a form of distance. This notion of closeness is actually all we need to talk about a notion of limits and convergence. 

Topological spaces are thus much more versatile classification compared to metric and vector spaces.

### Hausdorff Space

Finally, a Hausdorff Space is a set $X$ equipped with a topology $\\tau$ where for any points $x,y \\in X$, there are subsets $\\tau_x, \\tau_y \\in \\tau$, such that $x \\in \\tau_x, y \\in \\tau_y,$ and $\\tau_x \\cap \\tau_y = \\empty$. In other words for any points in the set, there are disjoints subsets in $\\tau$containing $x$ and $y$ respectively. 

While in a regular topological space we have a notion of “closeness”, in Hausdorff spaces we can compare how close you are to two different points. 

While limits can exist in all topological spaces, such limits are only guaranteed to to be unique in Hausdorff Spaces.

`;

export default SURVEY_OF_MATH_SPACES;
