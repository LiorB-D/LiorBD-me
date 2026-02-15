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

    dateRead: new Date("2024-01-02"),
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
  "the-pragmatic-programmer": {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt and David Thomas",
    color: "#222222",
    accentColor: "#f5f5f5",
    dateRead: new Date("2024-01-10"),
  },
  "Operating Systems: Three Easy Pieces": {
    title: "Operating Systems: Three Easy Pieces",
    author: "Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau",
    color: "#000000",
    accentColor: "#ffffff",
    dateRead: new Date("2024-12-17"),
  },
  "foundation-and-empire": {
    title: "Foundation and Empire",
    author: "Isaac Asimov",
    color: "#4d1c00",
    accentColor: "#f5f5f5",
    dateRead: new Date("2025-01-02"),
  },
  "second-foundation": {
    title: "Second Foundation",
    author: "Isaac Asimov",
    color: "#4d1c00",
    accentColor: "#f5f5f5",
    dateRead: new Date("2025-01-25"),
  },
  "the-algorithm-design-manual": {
    title: "The Algorithm Design Manual",
    author: "Steven S. Skiena",
    color: "#FF0000",
    accentColor: "#000088",
    dateRead: new Date("2025-01-30"),
  },
  "the-moon-is-a-harsh-mistress": {
    title: "The Moon Is a Harsh Mistress",
    author: "Robert A. Heinlein",
    color: "#FFFF00",
    accentColor: "#000000",
    dateRead: new Date("2025-02-25"),
  },
  dune: {
    title: "Dune",
    author: "Frank Herbert",
    color: "#FFA500",
    accentColor: "#000000",
    dateRead: new Date("2025-04-01"),
  },
  spqr: {
    title: "SPQR",
    author: "Mary Beard",
    color: "#FFDD99",
    accentColor: "#000000",
    dateRead: new Date("2025-04-25"),
  },
  "stubborn-attachments": {
    title: "Stubborn Attachments",
    author: "Tyler Cowen",
    color: "#FF4444",
    accentColor: "#000000",
    dateRead: new Date("2025-05-04"),
  },
  "the-time-machine": {
    title: "The Time Machine",
    author: "H. G. Wells",
    color: "#4d1c00",
    accentColor: "#f5f5f5",
    dateRead: new Date("2025-05-10"),
  },
  "computer-networking-a-top-down-approach": {
    title: "Computer Networking: A Top-Down Approach",
    author: "Jim Kurose and Keith Ross",
    color: "#000000",
    accentColor: "#ffffff",
    dateRead: new Date("2025-05-16"),
  },
  "working-in-public": {
    title: "Working in Public",
    author: "Nadia Eghbal",
    color: "#FF4444",
    accentColor: "#FFFF99",
    dateRead: new Date("2025-05-25"),
  },
  "man-is-not-alone": {
    title: "Man is Not Alone",
    author: "Abraham Joshua Heschel",
    color: "#FFFF99",
    accentColor: "#000000",
    dateRead: new Date("2025-06-07"),
  },
  "children-of-time": {
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    color: "#0F0F0F",
    accentColor: "#BBFFBB",
    dateRead: new Date("2025-07-20"),
  },
  "database-internals": {
    title: "Database Internals",
    author: "Alex Petrov",
    color: "#FAFAFA",
    accentColor: "#0B0B0B",
    dateRead: new Date("2025-07-22"),
  },
  "dune-messiah": {
    title: "Dune Messiah",
    author: "Frank Herbert",
    color: "#330033",
    accentColor: "#FFFFFF",
    dateRead: new Date("2025-08-23"),
  },
  "crafting-interpreters": {
    title: "Crafting Interpreters",
    author: "Robert Nystrom",
    color: "#EEEEAA",
    accentColor: "#212121",
    dateRead: new Date("2025-08-30"),
  },
  "elements-of-eloquence": {
    title: "Elements of Eloquence",
    author: "Mark Forsyth",
    color: "#DEDE88",
    accentColor: "#55AA55",
    dateRead: new Date("2025-08-29"),
  },
  "the-soul-of-a-new-machine": {
    title: "The Soul of a New Machine",
    author: "Tracy Kidder",
    color: "#772222",
    accentColor: "#EEFFFF",
    dateRead: new Date("2025-09-01"),
  },
  "boom-bubbles-and-the-end-of-stagnation": {
    title: "Boom: Bubbles and the End of Stagnation",
    author: "Byrne Hobart & Tobias Huber",
    color: "#AA4444",
    accentColor: "#FFFFFF",
    dateRead: new Date("2025-09-28"),
  },
  "the-jewish-war": {
    title: "The Jewish War",
    author: "Flavius Josephus",
    color: "#FFFF99",
    accentColor: "#000000",
    dateRead: new Date("2025-11-22"),
  },
  "an-elegant-puzzle": {
    title: "An Elegant Puzzle: Systems of Engineering Management",
    author: "Will Larson",
    color: "#FFFFFF",
    accentColor: "#000000",
    dateRead: new Date("2025-12-15"),
  },
  "designing-data-intensive-applications": {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    color: "#FFFFFF",
    accentColor: "#880000",
    dateRead: new Date("2025-12-15"),
  },
  "sephardi-and-mizahi-jewry": {
    title:
      "Sephardic and Mizrahi Jewry: From the Golden Age of Spain to Modern Times",
    author: "Zion Zohar",
    color: "#FFFFFF",
    accentColor: "#000000",
    dateRead: new Date("2026-01-04"),
  },
  "there-is-no-antimemetics-division": {
    title: "There is no antimemetics division",
    author: "qntm",
    color: "#0F0F0F",
    accentColor: "#FF8888",
    dateRead: new Date("2026-01-18"),
  },
  "nature-and-selected-essays": {
    title: "Nature and Selected Essays",
    author: "Ralph Waldo Emerson",
    color: "#000000",
    accentColor: "#AAFFAA",
    dateRead: new Date("2026-01-25"),
  },
  "fahrenheit-451": {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    color: "#000000",
    accentColor: "#FFAAAA",
    dateRead: new Date("2026-02-02"),
  },
  "slaughterhouse-five": {
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    color: "#FF6666",
    accentColor: "#000000",
    dateRead: new Date("2026-02-15"),
  },
};

export function getAllBooks(): { slug: string; book: Book }[] {
  return Object.entries(books).map(([slug, book]) => {
    return { slug, book };
  });
}
