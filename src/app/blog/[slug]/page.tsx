import getBlogContent from "@/cms/cms";
import MarkdownBlock from "../../components/Markdown";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const blogPost = getBlogContent(slug);

  if (!blogPost) {
    return <div>404 Not Found</div>;
  }
  return (
    <div>
      <h1 className="text-4xl">{blogPost.title}</h1>
      <p className="mt-4">{blogPost.date.toDateString()}</p>
      <MarkdownBlock className={"mt-10"} content={blogPost.content} />
    </div>
  );
}
