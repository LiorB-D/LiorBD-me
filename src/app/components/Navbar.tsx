"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import React from "react";
import Link from "next/link";
const navOptions = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Freelancing", href: "/freelancing" },
  { label: "Bookshelf", href: "/bookshelf" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div className="fixed top-10 w-[90%] md:w-[768px] z-20">
      <div className="glossy-bg py-2 pl-4 pr-8 rounded-full ">
        <div className="flex justify-between text-lg">
          <div className="flex gap-x-2 items-center">
            <Image
              src={
                "https://media.licdn.com/dms/image/v2/D4E03AQHEQRHRGA2H5w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706649249103?e=1737590400&v=beta&t=u1M5UESbRTRqrmjqnqfgZ0tJ8usgEVnGOUIUfc_cj80"
              }
              alt="Lior Ben-David"
              height={30}
              width={30}
              className="rounded-full"
            />
            <h3 className="font-bold">Lior Ben-David</h3>
          </div>
          <div className="hidden md:flex gap-x-8 items-center">
            {navOptions.map((option) => (
              <Link
                href={option.href}
                className="cursor-pointer"
                key={option.label}
              >
                {option.label}
              </Link>
            ))}
          </div>
          <button className="flex md:hidden items-center">
            <Menu
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen((mu) => !mu);
              }}
            />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col items-end mt-2 gap-y-2 md:hidden">
          {navOptions.map((option) => (
            <Link
              href={option.href}
              className="glossy-bg rounded-full cursor-pointer text-md px-6 py-1 hover:bg-slate-200 text-right hover:border-slate-500"
              key={option.label}
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
