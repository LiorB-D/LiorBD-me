const CAPSET_PROBLEM = `
Google Deepmind recently published an exciting paper purporting to use an LLM to find new solutions to a variety of open math problems.

Unsurprisingly, there are many hyperbolic headlines:

![Screenshot 2023-12-28 at 7.42.06 PM.png](https://i.imgur.com/1Mjob1u.png)

![Screenshot 2023-12-28 at 7.49.26 PM.png](https://i.imgur.com/lsHGLsy.png)

A lot of misinformation about STEM discoveries seem to come from assuming that *research problems are simply more complex versions of what we all had to do in high school*. This is, of course, far from the truth. 

In this case, the math problem is called the **Cap Set Problem**. It is not a problem with one specific solution. There are different degrees of solutions and all different kind of ways to study it.

Breakthroughs on the Cap Set Problem are not displays of genius but displays of ingenuity.

I don’t say this to minimize the work of the Deepmind researchers — The paper is definitely incredibly exciting.

We do a disservice to breakthroughs by overhyping them. To get people to be excited about a breakthrough, we should get people to actually understand what has been broken through.

And so I will attempt to explain the Cap Set problem. 

We’ll start with an aggressively formal definition that we will unpack piece by piece. I’ve tailored this post for someone with at minimum a tenuous grasp on sets.

> Let $a,b,c$ be distinct elements of $\\Z_3^n$. We say that $a,b,c$ form a line if $a + b + c = 0$
> 

> Let $X$ be a subset of $\\Z_3^n$. We call $X$ a *cap set* if no three distinct elements of $X$ form a *line.*
> 

The Cap Set problem refers to a number of questions related to these sets such as:

- For a given $n$ what is the largest $X$ can be?
- For a given $n$, what explicit Cap Sets can we find?

## What in the world is $\\Z_3^n$ (Pronounced Z-three-n)?

Mathematicians are often interested in studying unconventional number systems. $\\Z_3$ is a relatively simple number system composed of exactly three numbers: $[0], [1], [2]$. 

Now I write the brackets to make it clear that these aren’t the normal numbers $0,1, \\text{ and } 2$. Though you will see soon that they share some key similarities.

We can also construct number systems by combining $\\Z_3$ with itself. $\\Z^2_3$ is set of all pairs of elements in $\\Z_3$. $([1],[2]), ([1],[1]), \\text{ and }([0],[2])$ are all examples of elements of $\\Z_3^2$. 

$([2],[4])$ is not in $\\Z_3^2$ because $[4]$ is not an element in $\\Z_3$.

We can similarly talk about $\\Z_3^3$ which is the set of groups of 3 elements of $\\Z_3^3$ such as $([1],[2],[3]), ([1],[2],[1]), ([0],[0], [2])$ or $([0],[0],[0])$.

When we write $\\Z_3^n$ we refer to collections of $n$ elements of $\\Z_3$. If $x$ is an element of $\\Z_3^n$ we denote the i’th point of $x$ as $x_i$.

So if $x = ([1],[2],[0],[1])$ we have that $x_1 = [1], x_2 = [2], x_3 = [0], x_4 =[1]$.

## Adding elements of $\\Z_3^n$

When mathematicians construct these alternative number systems, they are also often interested in conducting operations in the number systems that are analogous to addition or multiplication.

But what does “addition” even mean in the context of $\\Z_3$? We can’t say that $[1] + [2] = [3]$ because $[3]$ is not even in our number system.

Instead, we can add our three numbers like so:

$$
\\begin{array}{c|ccc}+ & [0] & [1] & [2] \\\\ 
\\hline [0] & [0] & [1] & [2] \\\\ [1] & [1] & [2] & [0] \\\\ [2] & [2] & [0] & [1] \\end{array}
$$

That means we can add two elements in $\\Z_3$ and get another element in $\\Z_3$. In other words, it is “closed” over addition.

Our “addition” operation functions as follows:

$$
[x] + [y] = [\\text{Remainder obtained by } \\frac{x+y}{3}] \\\\ 
{[2]} + {[2]} = [\\text{Remainder obtained by } \\frac{4}{3}] = [1]\\\\ 
{[1]} + [2] = [\\text{Remainder obtained by } \\frac{3}{3}] = [0]
$$

An interesting (and soon to be important) thing to notice:

> Let $x,y, \\text{ and } z$ be elements in $\\Z^3$. $x+y+z=[0]$ if and only $x,y, \\text{ and } z$ are all equal or all different.
> 

You can show this by hand:

$$
[0] + [0] + [0] = [0] \\\\ {[1]} + [1] + [1] = [2] + [1] = [0] \\\\ {[2]} + [2] + [2] = [1] + [2] = [0] \\\\ {[0]} + [1] + [2] = [1] + [2] = [0]
$$

We similarly can add elements of $\\Z_3^n$ by component:

$$
([x], [y]) + ([z], [w]) = ([x] + [z], [y] + [w])
$$

For example:

$$
([1], [2]) + ([2], [2]) = ([0], [1]) \\\\ ([1], [2], [0]) + ([1], [0], [2]) = ([2], [2], [2])
$$

So if we apply our “add up $0$ rule” from above we get that:

> Let $x,y, \\text{ and } z$ be elements in $\\Z_3^n$. $x+y+z = ([0],[0],....,[0])$ if and only if for each $i$ from $1$ to $n$, either $x_i,y_i, \\text{ and } z_i$ are equal or $x_i,y_i, \\text{ and } z_i$ are all different.
> 

For example for $n = 3$:

$$
([1],[0],[2]) + ([1],[0],[2]) + ([1],[0],[2]) = ([0],[0],[0]) \\\\ 
([1],[2],[0]) + ([0],[1],[2]) + ([2],[0],[1]) = ([1], [0], [2]) + ([2],[0],[1]) = ([0], [0], [0])
$$

Finally a note on notation:

> For simplicities sake we write “$[0]$” and we write “$([0], [0], ..., [0])$” as simply “$0$”. Similarly for the sake of simplicity we write “$[1]$” as “$1$” and “$[2]$” as “$2$”
> 

## Returning to Cap Sets

With that context, let us know return to the original definition:

> Let $a,b,c$ be distinct elements of $\\Z_3^n$. We say that $a,b,c$ form a line if $a + b + c = 0$
> 

> Let $X$ be a subset of $\\Z_3^n$. We call $X$ a *cap set* if no three distinct elements of $X$ form a *line.*
> 

Now validating the examples here can get quite arduous, especially as $n$ gets big. Let’s consider the case $n=4$(So we want subsets of  $\\Z_3^4$). An example of a cap set of size four would be:

$$
A = (1,0,0,0) \\\\ B = (1,1,0,0) \\\\ C = (1,1,0,0) \\\\ D = (0,1,0,0)
$$

To prove this is a cap set, we can directly add up every triplet:

$$
A+ B + C = (0, 2, 0, 0) \\\\ A + B + D = (2, 2, 0, 0) \\\\ A + C +D = (2, 0, 0, 0) \\\\  B + C + D = (2, 0, 0, 0)
$$

Thus no three elements in our set form a line, which means $\{A,B,C,D\}$ is a Cap Set!

> To get a feel for how these works, try to add a fifth element to this cap set
> 

## Why not just guess and check to find all the Cap Sets?

For each $n$, there are $3^n$ total elements in $\\Z_3^n$. So the absolute upper bound on a Cap Set is $3^n.$ 

For a set of size $K$, there are $2^K$ unique subsets. That means just for $\\Z_3^4$ there are $2^{3^{4}}= 2^{81}$ possible candidates for Cap Sets. That is larger than $10^{24}$ for reference. 

As soon as we get to $n=6$, we now have to consider over $10^{219}$ possible cap sets. For reference, there are estimated to be roughly $10^{80}$ atoms in the universe.

So in practice, trying to find Cap Sets can be an extremely difficult task. When trying to find large Cap Sets, you do not want to rely on brute force or guess and check.

Instead, it is more efficient to produce a Cap Set indirectly. For example in $\\Z_3^4$:

> Consider all the elements in $x \\in \\Z_3^4$ that do not contain 2. For example $(0,0,0,1) \\text{ and } (1,1,1,0)$ would count, but $(2,2,0,0)$ would not.
> 

One can prove that this forms a cap set of size $16$:

<aside>

💡 Let $x, y, \\text{ and } z$ be distinct elements of $\\Z_3^4$ that satisfy the rule above. 
Suppose for the sake of contradiction that $x+ y+z = 0$. By definition, for each $i \\in \{1,2,3,4\}$, we have that $x_i + y_i + z_i = 0$. That means that $x_i,y_i, \\text{ and } z_i$ must either be all equal or all different.

Let $i \\in \{1,2,3,4\}$. Note that by construction $x_i, y_i, z_i$ are all not equal to $2$. Thus they are each either equal to $0 \\text{ or } 1$.  So we have three variables that each are equal to $0 \\text{ or } 1$. Thus they cannot possibly each take on different values.

Thus the only way for $x_i + y_i + z_i = 0$ to be satisfied is if $x_i = y_i = z_i$.

However, if $x+y+z = 0$ then this must hold for each $i \\in \{1,2,3,4\}$. This would mean $x=y=z$, which cannot be case since we require them to be distinct elements of $\\Z_3^4$. Theriein lies the contradiction.

Thus no three distinct elements of $\\Z_3^4$ that satisfy our rule could possibly form a line. This means the set of all elements of $\\Z_3^4$, which do no contain $2$, form a Cap Set.
</aside>

## What did Google DeepMind discover?

What makes problems like the Cap Set Problem so great for LLMs is that progress on this problem is not made by brute force and is not made by one wide-ranging solution.

It is made by designing clever algorithms and techniques. **To say it differently, it is an art not a science.**

The DeepMind team created a model called *FunSearch* which attempts to find these algorithms using LLMs. Any further explanation of there method would not do it justice, but I encourage you to read more [here](https://deepmind.google/discover/blog/funsearch-making-new-discoveries-in-mathematical-sciences-using-large-language-models/).

They discovered:

- A cap set of size 512 for $\\Z_3^8$, which is the largest Cap Set ever found for $\\Z_3^8$. We do not yet know how large a Cap Set in $\\Z_3^8$ can be.
- Let $c_n$ be the size of the largest Cap set in $\\Z_3^n$. Mathematicians are also interested in the size of the value $\\sup_{n}\\sqrt[n]{c_n}$. You can think of this value as the limit as $n$ goes to infinity of $\\sqrt[n]{c_n}$. *FunSearch* found a new lower bound for this value of $2.2202$. This is the largest improvement to estimating the lower bound in the past 20 years.

These breakthroughs are an extremely promising look into what AI-assisted STEM research is capable of. There are no shortage of these types of problems. We’ve already seen similar breakthroughs (Much of which conducted by the DeepMind team) in areas such as:

- Sphere Packing
- Knot Theory
- Algorithmic Design
`;

export default CAPSET_PROBLEM;
