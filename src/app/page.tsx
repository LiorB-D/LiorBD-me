import MarkdownBlock from "./components/Markdown";

const ENKI_EXPLANATION = `
## Enki

Enki is an AI-powered, learning platform for coding and data science skills.

I work on the web app team, building with Typescript, React, NodeJS, Postgres, and GPT.
`;

const TOPOLOGY_EXPLANATION = `
## Computational Topology

In my free time I study computational topology, a field of Math that uses computers to help solve algebraic topology problems, and uses algebraic topology to help solve computational problems.

I'm currently working on implementing an algorithm to compute connection matrices for Morse decompositions on Lefschetz complexes.

> Disclaimer: I'm cutting a lot of corners with the following definition. If you're a topologist, I'm sorry. If you're curious about a more accurate definition, please reach out to me.

A Lefschetz complex is an extremely general definition for any shape with discrete edges and faces. 
A multivector field can be thought of as a description of how things flow from one part of the complex to another.

For example, a Lefschetz complex could be a cooking pan, and a multivector field could be a description of how heat flows between different parts of the pan.

A Morse decomposition is a way to split up a complex into pieces such that a particle being moved by the multivector field generally stays within each piece. 

For example, it might be the case that heat only flows within the base of the pan and within the handle of the pan, but not between the base and the handle.

A connection matrix is a way to describe how the pieces of the Morse decomposition relate to each other.
`;

const GAMES_EXPLANATION = `
## Game Development

I also occasionally make small games.
I recently released a small puzzle game called [Coprime Sudoku](https://apps.apple.com/cn/app/coprime-sudoku/id6738853269?l=en-GB) on the iOS app store. 
It's built with React Native.

![alt](https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/24/89/60/2489606a-21c5-f8d8-32ea-be3d0df7f447/Simulator_Screenshot_-_iPhone_16_-_2024-12-05_at_15.47.32_1.png/314x0w.webp)

I also release small mini-games and demos [here](https://freewebgaming.com).
`;
export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">👋 Hi, I&apos;m Lior</h1>
      <h3 className="mt-10 text-lg">
        I&apos;m a software engineer based in Washington, DC. <br /> I write
        software at{" "}
        <a
          className="cursor-pointer underline text-blue-800"
          href="https://enki.com"
        >
          Enki
        </a>
        , study computational topology, and make small games.
      </h3>
      <h3 className="text-lg">
        I previously studied Math and Economics at the University of Virginia.
      </h3>
      <section className="mt-10">
        <MarkdownBlock content={ENKI_EXPLANATION} />
      </section>
      <section>
        <MarkdownBlock content={TOPOLOGY_EXPLANATION} />
      </section>
      <section>
        <MarkdownBlock content={GAMES_EXPLANATION} />
      </section>
    </div>
  );
}
