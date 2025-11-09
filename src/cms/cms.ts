import BUILDING_VR_WEBSITES from "./posts/BuildingVRSites";
import CAPSET_PROBLEM from "./posts/CapSetProblem";
import DRIVING_NEUROEVOLUTION from "./posts/DrivingNeuroevolution";
import GAME_THEORETIC_SALES from "./posts/GameTheoreticSales";
import GENERATING_TIKTOK_SLOP from "./posts/GeneratingTiktokSlop";
import HAMMERS_SEARCHING_NAILS from "./posts/HammersSearchingNails";
import LET_YOURSELF_BE_EMBRACED from "./posts/LetYourselfBeEmbraced";
import QUARTERLY_COUNTER_ARGUMENTS from "./posts/QuarterlyCounterArguments";
import RANDOM_WALKS_1D from "./posts/RandomWalks1D";
import SALES_AND_CUSTOMER_DISCOVERY from "./posts/SalesAndCustomerDiscovery";
import SHORT_ARGUMENT_FOR_FAITH from "./posts/ShortArgumentForFaith";
import SIGNAL_MARKET_COLLAPSE from "./posts/SignalMarketCollapse";
import SIMPLICIAL_COMPLEXES from "./posts/SimplicialComplexes";
import SURVEY_OF_MATH_SPACES from "./posts/SurveyMathSpaces";
import THOUGHTS_ON_LLMS from "./posts/ThoughtsOnLLMs";
import THOUGHTS_ON_OCT_SEVEN from "./posts/ThoughtsOnOctSeven";
import BURNOUT from "./posts/Burnout";

export type BlogContent = {
  title: string;
  content: string;
  date: Date;
  hidden?: boolean;
};

export const BLOGS: Record<string, BlogContent> = {
  "hammers-searching-nails": {
    title: "In Defense of Hammers Without Nails",
    content: HAMMERS_SEARCHING_NAILS,
    date: new Date("2022-11-15"),
  },
  "simplicial-complexes": {
    title: "Simplicial Complexes: Giving Shape to Data",
    content: SIMPLICIAL_COMPLEXES,
    date: new Date("2023-01-07"),
  },
  "survey-of-math-spaces": {
    title: "Exploring Space: A Survey of Mathematical Spaces",
    content: SURVEY_OF_MATH_SPACES,
    date: new Date("2023-01-09"),
  },
  "building-vr-sites": {
    title: "Building VR Websites",
    content: BUILDING_VR_WEBSITES,
    date: new Date("2021-11-19"),
  },
  "cap-set-problem": {
    title: "The Cap Set Problem",
    content: CAPSET_PROBLEM,
    date: new Date("2023-12-31"),
  },
  "driving-neuroevolution": {
    title: "Teaching Cars to Drive with Neuroevolution",
    content: DRIVING_NEUROEVOLUTION,
    date: new Date("2021-07-15"),
  },
  "game-theoretic-sales": {
    title: "A Game Theoretic Model of Sales and Marketing",
    content: GAME_THEORETIC_SALES,
    date: new Date("2024-07-07"),
  },
  "let-yourself-be-embraced": {
    title: "Let Yourself Be Embraced",
    content: LET_YOURSELF_BE_EMBRACED,
    date: new Date("2024-01-22"),
    hidden: true,
  },
  "quarter-counter-arguments": {
    title: "Quarterly Counter Arguments",
    content: QUARTERLY_COUNTER_ARGUMENTS,
    date: new Date("2023-11-14"),
  },
  "random-walks-1d": {
    title: "Random Walks in 1D Return to Origin",
    content: RANDOM_WALKS_1D,
    date: new Date("2024-10-04"),
    hidden: true,
  },
  "sales-and-customer-discovery": {
    title: "The Line Between Sales and Customer Discovery Only Exists At Scale",
    content: SALES_AND_CUSTOMER_DISCOVERY,
    date: new Date("2024-03-11"),
  },
  "short-argument-for-faith": {
    title: "A Short Argument for Faith",
    content: SHORT_ARGUMENT_FOR_FAITH,
    date: new Date("2024-03-23"),
    hidden: true,
  },
  "thoughts-on-llms": {
    title: "Thoughts on LLMs",
    content: THOUGHTS_ON_LLMS,
    date: new Date("2023-06-20"),
  },
  "thoughts-on-oct-7": {
    title: "Thoughts on Current Events",
    content: THOUGHTS_ON_OCT_SEVEN,
    date: new Date("2023-10-10"),
    hidden: true,
  },
  "generating-tiktok-slop": {
    title: "Generating TikTok Slop with ffmpeg, AI, and Bash",
    content: GENERATING_TIKTOK_SLOP,
    date: new Date("2024-12-27"),
  },
  "signal-market-collapse": {
    title: "There's No Gold in Removing Signaling Costs",
    content: SIGNAL_MARKET_COLLAPSE,
    date: new Date("2025-08-23"),
  },
  burnout: {
    title: "Burnout",
    content: BURNOUT,
    date: new Date("2025-11-09"),
  },
};
export default function getBlogContent(slug: string): BlogContent {
  return BLOGS[slug];
}
