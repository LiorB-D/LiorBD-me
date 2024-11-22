const THOUGHTS_ON_LLMS = `
Last week I saw another ridiculous sounding tweet about how *AI is here and its changing everything:*


<blockquote class="twitter-tweet"><p lang="en" dir="ltr">GPT4 just passed all MIT Math, EE &amp; CS (EECS) courses test with near 100% accuracy 🤯<br><br>-4,550 questions from the 30 MIT Math &amp; CS courses required for a degree<br><br>Test set, excluding image Questios, w/ prompt engineering:<br><br>-GPT-3.5 solves 33%<br>-GPT-4 solves nearly 100% <a href="https://t.co/8CyEdwoDyo">pic.twitter.com/8CyEdwoDyo</a></p>&mdash; AI Daily (@AIDailyNewsNow) <a href="https://twitter.com/AIDailyNewsNow/status/1669819712321081346?ref_src=twsrc%5Etfw">June 16, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
As someone who has tested ChatGPT on some past math problem sets, this instantly set off my B*.S. alarm™.* 

The headline alone doesn’t even make any sense. The model passed every MIT Math, EE, and CS course? What does that even mean to pass? 

Surely the CS courses include projects — Did they GPT generate entire software projects?

Most proofs done for math courses have to be done within the context of theorems proven already in class — Was ChatGPT prompted to only use theorems already proven?

Usually I just block the AI/Blockchain/Whatever-is-currently-hyped influencer, but this struck a personal nerve.

Lo and behold a quick skim of the paper makes it clear that what actually happened was GPT was asked a specific (and not released) set of questions with significant prompting. To “grade” this test, they used GPT itself.

There don’t show the prompts, they don’t show the questions, they don’t show the answers.

[This](https://www.notion.so/No-GPT4-can-t-ace-MIT-b27e6796ab5a48368127a98216c76864?pvs=21) is a good explainer about the issues with this paper.

And nevertheless it trends…

### Opportunists and Engineers

It hurts to be excited by AI the same way it hurts to be excited by blockchain.

Innovation is incredibly exciting. Breakthroughs expand the frontiers of what an engineer can do.

When engineers hear about breakthroughs a spark is lit on what new things could be built.

But then this breakthrough is abused by snake-oil salesman.

Opportunists see the excitement of engineers and they know it can be leveraged by inflating the breakthrough to a level that the public could understand.

I mean engineer in the general sense. Someone who builds. Mathematicians, Gardeners, Doctors all have something they are building.

But to the Mathematician, the gardener is not an engineer of logic. To the Doctor, the mathematician is not an engineer of health.

So when the Mathematician reads a headline about a breakthrough cancer drug, they smile, but the Doctor winces.

When the Doctor reads about the discovery of the equation that explains the universe,  they smile, but the Mathematician winces.

### LLMs are incredibly exciting

I’m most excited by Embedding. The ability to place a metric on bodies of text can help us better funnel users into successful product experiences.

User preferences are continuously distributed, but developers can only build a discrete amount of user journeys.

So then the user has to figure out which user journey to go down. This decision is very error prone and has a transaction cost.

GPT allows us to programmatically take diverse user input and better place them in the correct journey. GPT also allows us to create me personalized user journeys.

To use Siri you need to draw your goal (In whatever words come to mind) from a continuous set, and funnel it into one of the discrete phrases that Siri can understand.

To find the information they want. a googler has to figure out exactly what they should search in order to be shown the correct user pathway.

And then they search and odds are they clicked on the wrong user journey.

### SEO is a virus infecting LLMs

The internet has been polluted with SEO spam. 

Articles are over-engineered to Google’s Page ranking algorithm. They are overly verbose, use unnecessary key words, and my personal frustration: restating and expanding your question.

Now if I’m looking for the answer to a question, surely I know the question. I don’t need an article to explain to me what I must already know.

If you are writing an article called *“What’s the new Mortal Kombat Release Date?*”, it is safe to assume that the people clicking this article already know what Mortal Kombat is.

But to help your chances of being the first result, you need the text in the user’s query to closely match the content of the page.

A lightbulb went off a couple weeks when ChatGPT set off the same internal rant.

Whenever you ask ChatGPT a question it verbosely restates the question.

I can’t prove this, but if ChatGPT is trained off of public websites, certainly a lot of that content has to be over-engineered SEO bullshit. And hence the SEO infects GPT.


`;

export default THOUGHTS_ON_LLMS;
