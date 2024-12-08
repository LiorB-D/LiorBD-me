import { BLOGS } from "@/cms/cms";
import Link from "next/link";

export default function Page() {
  const allBlogs = Object.entries(BLOGS)
    .sort((a, b) => (a[1].date > b[1].date ? -1 : 1))
    .filter((b) => !b[1].hidden);

  return (
    <div>
      <h1 className="text-4xl">✏️ Blog</h1>
      <div className="mt-10">
        {allBlogs.map(([slug, { title, date }]) => (
          <div key={slug} className="mt-6">
            <Link className="underline text-blue-800" href={`/blog/${slug}`}>
              <h2 className="text-2xl">{title}</h2>
            </Link>
            <p className="mt-1">{date.toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
