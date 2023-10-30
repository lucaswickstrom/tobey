"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export function ListShowMore({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? children : null}
      <button
        className="bg-white hover:bg-gray-100 flex flex-row justify-center item-center h-10 items-center px-4 w-full"
        onClick={() => {
          setOpen((value) => !value);
        }}
        type="button"
      >
        {open ? "Visa färre" : "Visa fler"}
      </button>
    </>
  );
}
