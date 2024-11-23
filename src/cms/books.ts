export type Book = {
  title: string;
  author: string;
  color: string;
  accentColor: string;
  dateRead: Date;
};

const books: Record<string, Book> = {
  "cold-start-problem": {
    title: "The Cold Start Problem",
    author: "Andrew Chen",
    color: "#0000AA",
    accentColor: "white",
    dateRead: new Date("2024-04-01"),
  },
  "stranger-in-a-strange-land": {
    title: "Stranger in a Strange Land",
    author: "Robert A. Heinlein",
    color: "#330000",
    accentColor: "white",
    dateRead: new Date("2024-09-01"),
  },
  "discovering-prices": {
    title: "Discovering Prices",
    author: "Paul Milgrom",
    color: "#255ea8",
    accentColor: "#cde03d",

    dateRead: new Date("2024-01-01"),
  },
  "join-or-die": {
    title: "JOIN, OR DIE",
    author: "Patrick Gilbert",
    color: "#f5f5f5",
    accentColor: "#000000",

    dateRead: new Date("2024-02-01"),
  },
  "ad-land": {
    title: "Adland",
    author: "Mark Tungate",
    color: "#121212",
    accentColor: "#c40202",
    dateRead: new Date("2024-05-01"),
  },
  "scientific-advertising": {
    title: "Scientific Advertising",
    author: "Claude C. Hopkins",
    color: "#3d1515",
    accentColor: "#a8c200",

    dateRead: new Date("2024-06-01"),
  },
  foundation: {
    title: "Foundation",
    author: "Isaac Asimov",
    color: "#4d1c00",
    accentColor: "#f5f5f5",

    dateRead: new Date("2024-11-01"),
  },
  code: {
    title: "Code",
    author: "Charles Petzold",
    color: "#040042",
    accentColor: "#ff5100",
    dateRead: new Date("2024-09-01"),
  },
  "man-search-for-meaning": {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    color: "#694fff",
    accentColor: "#ffffff",

    dateRead: new Date("2024-08-25"),
  },
  "demand-side-sales-101": {
    title: "Demand Side Sales 101",
    author: "Bob Moesta",
    color: "#ffff00",
    accentColor: "#ff2e1f",

    dateRead: new Date("2024-07-01"),
  },
  "sacred-fragments": {
    title: "Sacred Fragments",
    author: "Neil Gillman",
    color: "#34006b",
    accentColor: "#bf6300",
    dateRead: new Date("2024-07-01"),
  },
  "art-of-doing-science-and-engineering": {
    title: "The Art of Doing Science and Engineering",
    author: "Richard W. Hamming",
    color: "#003807",
    accentColor: "#d0f000",
    dateRead: new Date("2024-09-01"),
  },
};

export function getAllBooks(): { slug: string; book: Book }[] {
  return Object.entries(books).map(([slug, book]) => {
    return { slug, book };
  });
}
