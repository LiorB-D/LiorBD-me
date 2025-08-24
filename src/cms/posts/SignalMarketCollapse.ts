const SIGNAL_MARKET_COLLAPSE = `

There is a particular type of AI startup that I am particularly bearish of:
- AI job application bot
- AI cold calling / emailing bot
- AI dating app bot *(There is more reason than one to be bearish of these)*

I will group these products together under the label **Signal Collapsers**, 
as their value proposition is to help lower transaction costs in markets that rely heavily on signaling.


## Transaction Costs

A **transaction cost** is a cost paid to complete a transaction, 
independent of the cost paid for the actual good or service.

For example, if you pay $20 for a taxi but spent 5 minutes explaining
to the driver where your destination is, you paid a transaction cost of 5 minutes.

If you spent 20 minutes searching for a taxi, you also paid a 20 minute **search cost**, 
though for the sake of simplicity we will group search costs with their transaction cost cousins.

Similarly, if you spent $100 on a Bed and Breakfast, 
but spent 2 hours finding the booking the Bed and Breakfast, you have incurred a transaction cost of 2 hours.

I picked these two examples because Uber and AirBnB have 
created large amounts of value by removing these transaction costs.

For entrepreneurs, it is incredibly tempting to cargo-cult these stories. 
If technology can remove a transaction cost, isn't there a business to be built by removing it?

## Signaling Games

In Game Theory, a signaling game is a scenario where one set of people send (possibly truthful) messages 
to another set of people that convey information about themselves. 
The receiver(s) can then infer information about the various senders and respond accordingly.

I'll illustrate with an example. 

Suppose we have three risk-neutral salespeople: Sam, Sylvia, and Siraj. 
As risk-neutral salespeople, they make decisions in such a way to maximize their expected value.

The three of them all operate via cold phone calls where they sell their various food items.

Sam sells burritos, Sylvia sells tacos, Siraj sells quesadillas. Each is selling their item for \\$10. 
For simplicity, assume the salesperson keeps the entirety of the \\$10.

In this fictional world, every phone call they make costs $5. Their possible rewards therefore are:
- Successful cold call -> \\$10 - \\$5 = \\$5
- Failed cold call -> -$5
- No cold call -> \\$0

More generically, if a salesperson believes that they have a $x%$ chance of closing a sale, 
their expected return on a cold call is:

$$
\\$10 * \\frac{x}{100} - \\$5
$$

Therefore, **a rational risk-neutral salesperson will only make the cold call if they believe there is a greater than 50% chance of closing the sale.**

Now imagine a buyer named Rachel who really likes burritos (80% chance of buying in the eyes of Sam) 
but not particularly tacos and quesadillas (10% chance of buying in the eyes of Sylvia and Siraj). 

It is therefore only worthwhile for Sam to call Rachel, as he is the only seller with a sufficient chance of conversion.
**The transaction cost filters out the other sellers!**

Now suppose that Rachel understands this dynamic -- 
When she receives a phone call from Sam, she instantly knows that Sam has a relevant offer.

In this game, the phone call (or lack thereof) **signals** to the receiver the relevance of the offer.

The fact that Sam is willing to pay the transaction cost ($10), 
**signals** to Rachel that he believes he has a decent chance of making an offer that Rachel wants.

Game theorists call equilibriums like this a **Separating Equilibrium**, 
as the receiver can use the signal to separate the senders apart from one another.

Game theorists will often model hiring, dating, and admissions in this way. 
There is a transaction cost to making an offer (e.g. applying to a job), 
so senders only make an offer if it has a sufficient chance of being accepted.

## The cost of receiving

I will introduce one more component to our sales game: The very real cost which receivers bear when receiving messages.

In dating, hiring, and admissions, considering offers takes real time and money.

Receivers in these games are constantly looking for ways to filter out the low value options and avoid the consideration cost.

In our sales game, let's imagine that it costs Rachel \\$3 of her time to accept the sales call. 
Additionally, she values the burrito at \\$14, so when she accepts and buys the burrito she will:

- Pay $3 in consideration costs
- Pay $10 for the burrito
- Earn $14 of value for the burrito
- Nets $1 (14 - 10 - 3) worth of value


## A world without transaction costs

Now suppose, a company comes along that has figured out how to make these phone calls for only $0.50.

Sam, Sylvia, and Siraj are stoked!

Suddenly their calculus has changed. 
If they believe Rachel has a x% chance of purchasing then their expected value of a phone call is:

$$
\\$10 * \\frac{x}{100} - \\$0.50
$$

That means it is worthwhile to make the phone call as long as Rachel has greater than a 5% chance of purchasing.
It is now rational for Sylvia and Siraj to make the cold call.


This is seemingly good news for Sylvia and Siraj.
It is certainly not good news for Rachel.

Previously, when Rachel received a cold call she knew it was 
Sam calling about a burrito and it was worthwhile to take the $3 consideration cost to answer the phone.

However, after the transaction cost was removed, Rachel can no longer expect the call to be Sam. It might be Sylvia or Siraj.

To make the math simple here, suppose Rachel will never accept the Taco or Quesadilla, but will always accept the Burrito.

When Rachel receives a call, there are three possible outcomes:
- Sam is calling, Rachel nets $1 as math above
- Sylvia is calling, Rachel loses $3 in consideration cost
- Siraj is calling, Rachel loses $3 in consideration cost

Given those odds, **it is not worthwhile for Rachel to pick up the phone at all!** 
By removing the transaction cost, you did not expand the business of Sylvia and Siraj,
you diluted the signal that allowed the market to operate in the first place. The signal market has collapsed.

Now not even Sam can sell Rachel the burrito, as Rachel has no way to distinguish the cold calls!

Game theorists call this outcome a **Pooling Equilibrium**, as the senders are no longer distinguishable in the eyes of the receiver.

## Beyond the model

This trend has occurred to some extent in:
- Mail marketing
- Email marketing
- Cold phone outbound
- Cold LinkedIn outreach
- Dating (Cost of expressing interest has gone down via swiping)

The transaction cost was the pillar on which these signaling games rested.

You cannot remove the pillar without removing the market as a whole.

I anticipate three things:
- These *Signal Collapser* startups will make some money in the next 5 years
- These *Signal Collapser* startups will all decline afterwards as the pooling equilibrium is reached.
- There will be new startups built around reconstructing transaction costs in these markets

`;

export default SIGNAL_MARKET_COLLAPSE;
