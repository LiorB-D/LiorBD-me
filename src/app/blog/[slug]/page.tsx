import getBlogContent from "@/cms/cms";
import MarkdownBlock from "../../components/Markdown";
import NotFound from "@/app/not-found";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const blogPost = getBlogContent(slug);

  if (!blogPost) {
    return <NotFound />;
  }
  return (
    <div>
      <h1 className="text-4xl">{blogPost.title}</h1>
      <p className="mt-4">{blogPost.date.toDateString()}</p>
      <MarkdownBlock className={"mt-10"} content={blogPost.content} />
    </div>
  );
}
