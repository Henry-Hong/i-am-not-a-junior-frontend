import Link from "next/link";

export default async function Playground({
  searchParams,
}: {
  searchParams: { tab: string };
}) {
  const CONST_TABS = ["apple", "banana", "cherry"];
  const { tab } = searchParams;

  return (
    <div className="w-full">
      {CONST_TABS.map((_tab) => (
        <Link
          key={_tab}
          href={{ query: { tab: `${_tab}` } }}
          className="flex gap-5 bg-blue-300"
        >
          {_tab}
        </Link>
      ))}

      {tab === "apple" && <div>apple</div>}
      {tab === "banana" && <div>banana</div>}
      {tab === "cherry" && <div>cherry</div>}
    </div>
  );
}
