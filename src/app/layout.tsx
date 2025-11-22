import type { Metadata } from "next";
import { Asul } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const asul = Asul({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-asul",
});

export const metadata: Metadata = {
  title: "Lior BD",
  description: "Lior Ben-David's personal website",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${asul.variable}`}>
      <body className={`font-asul antialiased bg-yellow-50`}>
        <div className="flex items-start justify-center pt-[150px]">
          <Navbar />
          <div className="px-10 max-w-[95%] sm:px-20 w-[768px] pb-[400px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
