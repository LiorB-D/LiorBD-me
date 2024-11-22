import HAMMERS_SEARCHING_NAILS from "./HammersSearchingNails";

export type BlogContent = {
  title: string;
  content: string;
  date: Date;
};

export const BLOGS: Record<string, BlogContent> = {
  "hammers-searching-nails": {
    title: "In Defense of Hammers Without Nails",
    content: HAMMERS_SEARCHING_NAILS,
    date: new Date("2023-10-01"),
  },
};
export default function getBlogContent(slug: string): BlogContent {
  return BLOGS[slug];
}
