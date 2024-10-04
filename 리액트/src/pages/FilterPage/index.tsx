import { useState } from "react";
import { Filter, useFilter } from "./useFilter2";

const items = [
  {
    name: "Henry Hong",
    money: 100,
    birthDate: "1998-11-26",
  },
  {
    name: "John Doe",
    money: 200,
    birthDate: "2000-01-01",
  },
  {
    name: "Jane Smith",
    money: 300,
    birthDate: "1999-12-31",
  },
  {
    name: "Alice",
    money: 400,
    birthDate: "1998-10-24",
  },
  {
    name: "Bob",
    money: 500,
    birthDate: "1997-04-15",
  },
];

export default function FilterPage() {
  const [nameLen, setNameLen] = useState(5);
  const [range, setRange] = useState({ start: 0, end: 1000 });

  const moneyFilter = new Filter<
    (typeof items)[0],
    { start: number; end: number }
  >({
    values: { start: 300, end: 500 },
    test: (item, values) =>
      values.start <= item.money && item.money <= values.end,
  });

  const nameFilter = new Filter<(typeof items)[0], undefined>({
    values: undefined,
    test: (item) => item.name.length >= nameLen,
  });

  const { filterStyle, toggleFilterStyle, rawItems, getItems } = useFilter({
    items: items,
    filterMap: {
      money: moneyFilter,
      // name: nameFilter,
    },
  });

  return (
    <div className="flex gap-6 p-5">
      <div className="">
        <button
          onClick={() => {
            moneyFilter.setValue({ start: 0, end: 500 });
          }}
        >
          click me
        </button>
        <input
          className="border p-2 rounded"
          value={nameLen}
          onChange={(e) => setNameLen(Number(e.target.value))}
        />

        <input
          className="border p-2 rounded"
          value={range.start}
          onChange={(e) =>
            setRange({ ...range, start: Number(e.target.value) })
          }
        />

        <input
          className="border p-2 rounded"
          value={range.end}
          onChange={(e) => setRange({ ...range, end: Number(e.target.value) })}
        />
      </div>
      <div>
        <button className="p-2 bg-slate-300" onClick={toggleFilterStyle}>
          change toggle style
        </button>
        <p>filterStyle: {filterStyle}</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold text-3xl">raw items</h3>
        <ul className="flex flex-col gap-3">
          {rawItems.map((item) => (
            <li key={item.name} className="p-2 border rounded">
              <div>{item.name}</div>
              <div>{item.money}</div>
              <div>{item.birthDate}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold text-3xl">filtered items</h3>
        <ul className="flex flex-col gap-3">
          {getItems().map((item) => (
            <li key={item.name} className="p-2 border rounded">
              <div>{item.name}</div>
              <div>{item.money}</div>
              <div>{item.birthDate}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
