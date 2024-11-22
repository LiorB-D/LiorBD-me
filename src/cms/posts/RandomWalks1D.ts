const RANDOM_WALKS_1D = `
> **Theorem: An infinite, random walk in 1 dimension, starting at 0, will return to the origin with probability 1.**
> 

## A simple random walk along a straight line

Suppose you start at position 0:

- During every period you flip a fair coin
- If heads, you go right to 1, if tails you go left -1.
- Repeat $n$ times

With what probability will your return to 0 at least once?

For example, for $n=2$, there are four probabilities:

- HH: 0 → 1 → 2
- HT: 0 → 1 → 0
- TT: 0 → -1 → -2
- TH: 0 → -1 → 0

So for $n=2$ you have probability $\\frac{1}{2}$.

We can also iterate this manually for $n= 3$:

- HHH: 0 → 1 → 2 → 3
- HHT: 0 → 1 → 2 → 1
- HTH: 0 → 1 → 0 → 1 ✅
- HTT: 0 → 1 → 0 → -1 ✅
- THH: 0 → -1 → 0 → 1 ✅
- THT: 0 → -1 → 0 → -1 ✅
- TTH: 0 → -1 → -2 → -1
- TTT: 0 → -1 → -2 → -3

Note that in no event do we end back on 0, this is because to end on 0, we need an equal amount of heads and tails. That cannot happen with an odd amount of coin flips.

Also note that the 4 outcomes where we do return to 0 are precisely the 2 outcomes from the $n = 2$ case (With the different heads + tails combination). 

I’d encourage you to go through the outcomes for $n=4$ manually by hand so that you get comfortable with the pattern.

## Reframing the problem

Let $f(n)$ be the probability that you end up back at 0 in exactly $n$ steps. 

As explained above, we know that for odd $n$, f(n) = 0.

The probability of not ending at 0 in exactly $n$ steps, is $(1-f(n))$. Thus the probability of not hitting 0 at all in $n$ steps is the product:

$$
(1-f(1))(1-f(2))(1-f(3))...(1-f(n))
$$

If we let $n$ go to infinity, the the probability of never hitting 0 is given by the infinite product:

$$
\\prod_{n=1}^\\infty (1-f(n))
$$

Thus our theorem amounts to showing that:

$$
1 - \\prod_{n=1}^\\infty (1-f(n)) = 1 \\\\ \\prod_{n=1}^\\infty (1-f(n)) =  0
$$

## The Binomial Distribution

We don’t actually need to define $f(n)$ for this proof, but you may have already realized that $f(2n)$ is the probability of flipping exactly $n$ heads and $n$ tails. This is because we only get back to 0 if we go right and left the same amount fo time.

## Proving the product converges to 0

To prove the infinite product converges to 0, we can first be a little clever in order to rearrange the product into an infinite sum.

$$
\\prod_{n=1}^\\infty (1-f(n)) = e^{\\ln(\\prod_{n=1}^\\infty 1-f(n))} \\\\ = e^{\\sum_{n=1}^\\infty(\\ln(1-f(n)))}
$$

We can show that $\\sum_{n=1}^\\infty(\\ln(1-f(n)))$ diverges down to infinity, and therefore that 

$$
e^{\\sum_{n=1}^\\infty(\\ln(1-f(n)))} = 0
$$

Consider that:

$$
f(n) = \\frac{\\text{Number of paths where you go right and left equally}}{n}
$$

We know that there are always at least 2 ways to achieve this, you can

- Go left $\\frac{n}{2}$ times and then go right $\\frac{n}{2}$
- Go right $\\frac{n}{2}$ times and then go left $\\frac{n}{2}$

Thus we know that $f(n) > \\frac{1}{n}$ for even $n$.

From there we can conclude the following inequalities for even $n$:

$$
f(n) \\geq \\frac{1}{n} \\\\ 1-f(n) \\leq 1 - \\frac{1}{n} \\\\ 1-f(n) \\leq \\frac{n-1}{n} \\\\ \\ln(1-f(n)) \\leq \\ln(\\frac{n-1}{n})
$$

From here, I’m going to abuse notation a bit and treat our summations as only being over even numbers. This is because $\\ln(1-f(n)) = 0$ for odd $n$, so it contributes nothing to the summation.

Since $\\ln(1-f(n)) \\leq \\ln(\\frac{n-1}{n})$, if we show that $\\sum^\\infty \\ln(\\frac{n-1}{n})$ diverges to $- \\infty$, then it follows that $\\sum \\ln(1-f(n))$ diverges to $\\infty$.

We can show that the latter series diverges to infinity through it’s telescoping behavior:

$$
\\sum^\\infty \\ln(\\frac{n-1}{n}) = \\sum^\\infty \\ln(n-1) - \\ln(n)  \\\\ = \\ln(1) - \\ln(2) + \\ln(2) - \\ln(3) + \\ln(3) -... - \\ln(\\infty)) \\\\ = \\ln(1) - \\ln(\\infty)
$$

The end tail grows infinity larger, and so the series diverges to $-\\infty$.

From there we can conclude that $\\sum_{n=1}^\\infty(\\ln(1-f(n)))$ diverges to $-\\infty$

Since $\\lim_{N \\to -\\infty} e^{N} = 0$, we have that 

$$
0 = e^{\\sum_{n=1}^\\infty(\\ln(1-f(2n)))} \\\\ =  \\prod_{n=2}^\\infty (1-f(2n))
$$

Which means that the probability of never hitting a 0, approaches $0$, and therefore the probability of hitting 0 at some point, approaches $1$. $\\blacksquare$

`;

export default RANDOM_WALKS_1D;
