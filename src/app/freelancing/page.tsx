import MarkdownBlock from "../components/Markdown";

const content = `
# Freelancing

I often take on freelance software and developer marketing projects. 

I've built the MVPs for the following companies:
- [CompliantGuard](https://compliantguard.com/dashboard) - a compliance management platform for property owners. Built with Express, React, Postgres
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
    <div className="mt-[-16px]">
      <MarkdownBlock content={content} />
    </div>
  );
}
