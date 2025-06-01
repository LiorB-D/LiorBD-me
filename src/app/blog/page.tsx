import { BLOGS } from "@/cms/cms";
import Link from "next/link";

export default function Page() {
  const allBlogs = Object.entries(BLOGS)
    .sort((a, b) => (a[1].date > b[1].date ? -1 : 1))
    .filter((b) => !b[1].hidden);

  const delay_calc = (index: number) => {
    const MIN_DELAY = 0.75;
    const MAX_DELAY = 3;
    const delay =
      MIN_DELAY + ((MAX_DELAY - MIN_DELAY) * index) / allBlogs.length;
    const rounded_delay = Math.round(delay * 10) / 10;
    return rounded_delay;
  };

  return (
    <div>
      <h1 className="text-4xl">✏️ Blog</h1>
      <div className="mt-10">
        {allBlogs.map(([slug, { title, date }], ind) => (
          <div
            key={slug}
            className={`mt-6 fade-in`}
            style={{
              animationDuration: `${delay_calc(ind)}s`,
            }}
          >
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
