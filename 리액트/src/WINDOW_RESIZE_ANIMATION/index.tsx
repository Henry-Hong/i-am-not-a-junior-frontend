import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const defaultItems = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
];

export default function WINDOW_RESIZE_ANIMATION() {
  const [items, setItems] = useState(defaultItems);

  function addItem() {
    setItems([
      {
        id: items.length + 1,
        value: items.length + 1,
      },
      ...items,
    ]);
  }

  function deleteItem(index: number) {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  }

  const [width, setWidth] = useState(100);
  const [wrapperWidth, setWrapperWidth] = useState(100);

  useDebounce(() => setWrapperWidth(window.innerWidth), 350, [width]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <button
        style={{ marginBottom: "16px", padding: "8px" }}
        onClick={addItem}
      >
        Add Item
      </button>
      <div style={{ width: wrapperWidth }} className={`flex flex-wrap gap-4`}>
        {items.map((item, index) => (
          <motion.div
            layout
            key={item.id}
            className="border border-blue-200 w-[100px]"
          >
            <p>{item.value}</p>
            <button onClick={() => deleteItem(index)}>X</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
