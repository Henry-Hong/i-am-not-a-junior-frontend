// "use client";

import { useRouter } from "next/router";

export default function ToPage() {
  const router = useRouter();

  return <div>{JSON.stringify(router.query)}</div>;
}
