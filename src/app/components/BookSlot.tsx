"use client";

import { useState, type ReactNode } from "react";

export default function BookSlot({ title, children }: { title: string; children: ReactNode }) {
  const [tilted, setTilted] = useState(false);

  return (
    <button
      type="button"
      className="book-slot"
      aria-label={title}
      aria-pressed={tilted}
      data-tilted={tilted}
      onClick={() => setTilted((value) => !value)}
    >
      {children}
    </button>
  );
}
