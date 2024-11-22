const GAME_THEORETIC_SALES = `
The cynic argues that Sales and Marketing *change* consumer preferences. They are mechanisms for manipulating consumers into a purchase decision that they would otherwise not be interested in.

I propose the following:

> Sales and Marketing *do not* brainwash consumers into purchasing products. Sales and Marketing are mechanisms for a seller to **remove transaction costs for their product,** thereby incentivizing consumers to make a purchase.
> 

In particular, the seller is “paying” the discovery cost that the consumer would otherwise need to bear before using a product.

I’ll concede that for goods and services where value is derived from social signaling, this does not really hold. For example, luxury ads (Think Gucci or Dior) are meant to trick you into thinking that these goods are status symbols. In reality, the income distribution of consumers of luxury goods tends to lean much lower than people assume.

Since the utility consumers derive from these goods tend to primarily come from perceived social status, it is much easier for marketers to manipulate them.

## Modeling the consumer choice

Consider Joe, who has just moved to the United States, and has never tried any of the American fast food chains.

Joe has 2 options of chains to go to. Let $R$ be the set of restaurants:

$$
R =\\{R_1, R_2\\}
$$

Now Joe has never ate at any of these restaurants, so the utility he will derive is unknown. In particular, let’s say that in Joe’s eyes, the utility he derived from Restaurant $R_i$ is drawn from the probability distribution $P_i$. There is a lot of uncertainty.

Joe’s goal is to maximize his expected utility

$$
\\max_{i \\in \\{1,2\\}} E[u(R_i)]
$$

As a risk averse individual, it is in Joe’s interest to have a more accurate estimate of $u(R_i)$.

For simplicities sake, let us say that Joe can pay cost $c_i$ to discover the true utility of eating at restaurant $R_i$. This cost may come in the form of researching reviews, asking friends, etc.

## Sticking with what you know

Now suppose that Joe already knows about the first restaurant because they gave him a free sample, in particular he knows that $u(R_1) = 100$.

Now Joe has three choices of how to move forward:

1. Eat at restaurant 1 and guarantee himself 100 utils (Expected utility of 100)
2. Take a gamble and eat at restaurant 2
3. Pay $c_2$ to discover $u(R_2)$, and then go to the restaurant with the higher utility.

It is feasible that even if restaurant 2 is identical or slightly better than restaurant 1, that Joe, as a risk-averse individual, will choose to stick with restaurant 1.

**Since he is already educated on $R_1$, it is not worth it to investigate other options.**

You likely experience this daily without realizing. 

When you go to your favorite restaurant and order your usual meal, how confident are you that this is the best thing on the menu? Most likely, you aren’t so confident it is the best meal, but you prefer to stick with what you know.

## Sales and Marketing is Education

Given a set of products, consumers will lean towards the products which they already know. Sellers can therefore gain an advantage by educating the consumer.

Consumers stick with what they know, so businesses invest in making sure the consumer knows them.

Sales and Marketing are nothing more but mechanisms to educate consumers.

A good ad tells the consumer that they will derive $x$ utils from consuming this product.

## Building Trust

The seller may have the incentive to overstate how much utility the consumer derives. In many circumstances, this is true.

There are, however, a variety of things that mitigate this:

1. Consumers are generally skeptical of people and businesses without existing reputations. Lying repeatedly hurts the reputation of the brand, thereby decreasing the likelihood that the consumer trusts the seller
2. False advertising laws
3. Most advertising and sales for small purchases can only be cost-effective when there is some level of organic growth (Which you will not have if you lie). Advertising and Sales for large purchases involve more due diligence from the buyer, hopefully preventing the seller from lying successfully.

There are therefore two main goals of sales and advertising:

1. Educate consumers about the high amount of utility they receive
    1. Can increase the utility by improving the product and qualifying leads
2. Make consumers trust your messages
    1. Create social proof for you business and product
`;

export default GAME_THEORETIC_SALES;
