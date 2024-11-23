import { Book, getAllBooks } from "@/cms/books";

export default function Page() {
  const allBooks = getAllBooks();
  // Group it into shelves of max 4 books
  const shelves = allBooks.reduce((acc, { slug, book }) => {
    const lastShelf = acc[acc.length - 1];
    if (!lastShelf || lastShelf.length === 4) {
      acc.push([{ slug, book }]);
    } else {
      lastShelf.push({ slug, book });
    }
    return acc;
  }, [] as { slug: string; book: Book }[][]);
  return (
    <div>
      <h1 className="text-4xl">Bookshelf</h1>
      <div className="mt-10 flex gap-x-12 flex-wrap gap-y-24 justify-center">
        {shelves.map((shelf) => {
          return (
            <div
              key={shelf[0].slug}
              className={`flex flex-col justify-end items-center `}
            >
              <div className="flex gap-x-2">
                {shelf.map(({ slug, book }) => (
                  <BookComponent key={slug} book={book} />
                ))}
              </div>
              <div className="bookshelf"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BookComponent({ book }: { book: Book }) {
  return (
    <div className="book flex flex-col">
      <div
        className="booktop rounded-r-sm"
        style={{
          borderColor: book.color,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
        }}
      ></div>

      <div
        className="bookspine pb-6 pt-8 flex flex-col justify-between"
        style={{
          backgroundColor: book.color,
          color: book.accentColor,
          borderColor: "rgba(100, 100, 100, 0.1)",
        }}
      >
        <div className="h-32">
          <p
            className="h-full w-full text-left text-lg font-bold"
            style={{ writingMode: "vertical-rl" }}
          >
            {book.title}
          </p>
        </div>

        <div
          className="h-4 w-full"
          style={{ backgroundColor: book.accentColor }}
        ></div>
      </div>
    </div>
  );
}
