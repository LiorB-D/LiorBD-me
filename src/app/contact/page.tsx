import MarkdownBlock from "../components/Markdown";

const content = `
You can contact me via email [here](mailto:liorbd@outlook.com).

You can also reach me on [Twitter](https://x.com/liorb_d) or [LinkedIn](https://www.linkedin.com/in/lior-ben-david-8772471b6/).
`;
export default function Page() {
  return (
    <div>
      <h1 className="mb-10 text-4xl">📬 Contact</h1>
      <MarkdownBlock content={content} />
    </div>
  );
}
