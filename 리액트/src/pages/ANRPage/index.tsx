const garbage = [];

let dummy = false;

export default function ANRPage() {
  const handleClick = () => {
    for (let i = 0; i < 1000000000000; i++) {
      dummy = !dummy;
    }

    // garbage.push({ foo: new Array(10000000) }); // 40_000_000 bytes
  };

  return (
    <div>
      ANRPage
      <button>click me</button>
      <button onClick={handleClick}>ANR</button>
    </div>
  );
}
