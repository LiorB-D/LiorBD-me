const SIMPLICIAL_COMPLEXES = `

Topological Data Analysis(TDA) is a growing subfield of data science which seeks to use tools from Topology to study data. One of the building blocks of TDA is the simplicial complex, which allows practitioners to build spaces and shapes from a set of discrete data points.

### Simplexes

A simplex is a generalization of a triangle. More precisely, it is the simplest polytope(closed, flat-sided shapes) that can be drawn in a certain dimension.

The 0-simplex is a point, the 1-simplex is a line, the 2-simplex is a triangle, and the 3-simplex is a tetrahedron. While we might lose our visual intuition, these simplexes exist for any positive dimension, by just taking n points in n-dimensional space(With the requirement that none are colinear) and connecting these points with a line.

Additionally any n-simplex can be talked about having faces which are also simplexes of lower dimension. So the faces of a tetrahedron are the four triangles, 6 edges, and 4 vertices.

![Simplexes Diagram](https://i.imgur.com/jf1dcKk.png)

### Simplicial Complexes and Carriers

A simplicial complex *K* is a collection of these simplexes satisfying two conditions:

1) Any face of a simplex in K, will also be in K. So if a triangle is in K, all of its edges, and all of its vertices must also be in K.

2) If two simplices in K intersect, then its intersection will be a face of both simplices. Think of two triangles that share an edge. Their intersection would be an edge and two vertices, all of which are faces of both.

Thus given a collection of points and the connections between these points, we are left with a simplical complex. We can then take the union of these simplices, often called its *carrier*, and we can be left with an actual space that can be studied.

### Veitoris-Rips Complexes

So suppose we have a collection of data points in n-dimensional space. While a collection of discrete points is technically already a simplical complex, it’s not exactly a “shape” that can be studied in a fruitful way.

One way to build our shape is using a *Veitoris-Rips Complex.* To form the V-R complex, pick a positive distance $\\delta$, and connect any of our points that are within $\\delta$ of each other with a line. Thus if two points are close enough, a line will be formed, and if three points are close enough a triangle will be formed, and so on.

For example, suppose this is our original set of data points:

![Raw points](https://i.imgur.com/PYlLmxL.png)

After generating a Veitoris-Rips Complex with $\\delta = 2.5$, we get the following plot:

![VR complex](https://i.imgur.com/OAn6ZhV.png)

So we went from a collection of data points to a shape resembling a torus. Now this is obviously a fairly simple shape, but for high dimensional data, this same process can yield much more interesting spaces.

### Filtrations of Complexes

A filtration is a sequence of mathematical objects that are each a subset of the object after it in the sequence. In the context fo simplicial complexes, we can form a filtration of complexes by increasing our $\\delta$. When $\delta = 0$, we have just our collection of points. When we increase $\delta$ to some positive value, and start to connect some of these points with higher dimensional simplices, we have a superset of our collection of points. 

In fact, for two Veitoris-Rips Complexes of a set of points, given by distances $\\delta_1$ and $\\delta_2$(Denoted $V(\\delta_1), V(\\delta_2)$ respectively). $V(\\delta_1)$ will be a subset of $V(\\delta_2)$ if and only if $\\delta_1 < \\delta_2$

Data scientists using Simplicial Complexes most often study these filtrations. The idea is that what these shapes look like as you increase $\\delta$ tells you about the underlying population in a way that is more resistent to noise from random sampling.

The most common algorithm to study these filtrations is *Persistent Homology,* which looks at the dimension and number of holes of the complex as you iterate through your filtration.

`;

export default SIMPLICIAL_COMPLEXES;
