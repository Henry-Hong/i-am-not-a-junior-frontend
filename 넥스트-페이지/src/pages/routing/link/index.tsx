/**
 * https://nextjs.org/docs/app/api-reference/components/link
 * Link 사용시 prefetch로 최적화한다.
 * (production 모드에서만 가능)
 */

import Link from "next/link";

export default function LinkPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-dvh bg-slate-400">
        <Link href={{ pathname: "/routing/link/link1" }}>1번링크</Link>
      </div>
      <div className="w-full h-dvh bg-red-400">
        <Link href={{ pathname: "/routing/link/link2" }}>
          2번링크 (getServerSideProps)
        </Link>
      </div>
      <div className="w-full h-dvh bg-blue-300">
        <Link href={{ pathname: "/routing/link/link3" }}>
          3번링크 (이미지포함)
        </Link>
      </div>
    </div>
  );
}
