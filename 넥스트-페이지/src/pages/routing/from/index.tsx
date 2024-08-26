// "use client";

import Link from "next/link";
export default function FromPage() {
  return (
    <Link
      href={{
        pathname: "./to",
        query: {
          apple: 1,
          banana: 2,
          cherry: 3,
        },
      }}
    >
      click me
    </Link>
  );
}
