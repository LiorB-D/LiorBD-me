export type Book = {
  title: string;
  author: string;
  color: string;
  accentColor: string;
};

const books: Record<string, Book> = {
  "cold-start-problem": {
    title: "The Cold Start Problem",
    author: "Andrew Chen",
    color: "#0000AA",
    accentColor: "white",
  },
  "stranger-in-a-strange-land": {
    title: "Stranger in a Strange Land",
    author: "Robert A. Heinlein",
    color: "#330000",
    accentColor: "white",
  },
  "discovering-prices": {
    title: "Discovering Prices",
    author: "Paul Milgrom",
    color: "#255ea8",
    accentColor: "#cde03d",
  },
  "join-or-die": {
    title: "JOIN, OR DIE",
    author: "Patrick Gilbert",
    color: "#f5f5f5",
    accentColor: "#000000",
  },
  "ad-land": {
    title: "Adland",
    author: "Mark Tungate",
    color: "#121212",
    accentColor: "#c40202",
  },
  "scientific-advertising": {
    title: "Scientific Advertising",
    author: "Claude C. Hopkins",
    color: "#3d1515",
    accentColor: "#a8c200",
  },
  foundation: {
    title: "Foundation",
    author: "Isaac Asimov",
    color: "#4d1c00",
    accentColor: "#f5f5f5",
  },
  code: {
    title: "Code",
    author: "Charles Petzold",
    color: "#040042",
    accentColor: "#ff5100",
  },
  "man-search-for-meaning": {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    color: "#694fff",
    accentColor: "#ffffff",
  },
  "demand-side-sales-101": {
    title: "Demand Side Sales 101",
    author: "Bob Moesta",
    color: "#ffff00",
    accentColor: "#ff2e1f",
  },
};

export function getAllBooks(): { slug: string; book: Book }[] {
  return Object.entries(books).map(([slug, book]) => {
    return { slug, book };
  });
}
