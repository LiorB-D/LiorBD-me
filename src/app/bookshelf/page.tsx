import { Book, getAllBooks } from "@/cms/books";
import Image from "next/image";

export default function Page() {
  const allBooks = getAllBooks().sort((a, b) =>
    a.book.dateRead > b.book.dateRead ? -1 : 1
  );
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

  const currentlyReading: Array<{
    title: string;
    author: string;
    img_url: string;
  }> = [
    {
      title: "Operating Systems: Three Easy Pieces",
      author: "Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau",
      img_url:
        "https://m.media-amazon.com/images/I/41lmWk6muIL._SY445_SX342_.jpg",
    },
    {
      title: "Blood, Sweat, and Pixels",
      author: "Jason Schreier",
      img_url:
        "https://m.media-amazon.com/images/I/51Sz0Lfa6TL._SY445_SX342_.jpg",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl">📖 Bookshelf</h1>
      <h2 className="mt-6 text-lg">I&apos;m currently reading:</h2>
      <div className="mt-4 flex flex-col gap-y-4">
        {currentlyReading.map((book) => (
          <div
            key={book.title}
            className="glossy-bg p-4 flex rounded-xl gap-x-2"
          >
            <Image
              src={book.img_url}
              width={100}
              height={150}
              alt={book.title}
            />
            <div>
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="mt-2 italic">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
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
        <div className="h-36">
          <p
            className="h-full w-full text-left text-lg font-bold line-clamp-2"
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
