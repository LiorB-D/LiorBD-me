import MarkdownBlock from "../components/Markdown";

const content = `
I occasionally take on freelance software and developer marketing projects. **I am not currently available for freelance projects.**

I've built the MVPs for the following companies:
- [CompliantGuard](https://compliantguard.com/dashboard) - A compliance management platform for property owners. Built with Express, React, Postgres
- [PeerPressur](https://www.peerpressur.com/) - Built with Swift, SwiftUI, Firebase
- [Z-Score Sports](https://www.linkedin.com/company/z-score-sports/) - Built with React

I've also done developer marketing work for [Velt](https://velt.dev/) (YC W22) and [Codesphere](https://codesphere.com/).

Technologies I'm comfortable with include:
- NodeJS
- React + NextJS
- React Native
- Swift + SwiftUI
- Typescript
- Postgres
- AWS
`;
export default function Page() {
  return (
    <div className="fade-in">
      <h1 className="mb-10 text-4xl">🛠️ Freelancing</h1>
      <MarkdownBlock content={content} />
    </div>
  );
}
