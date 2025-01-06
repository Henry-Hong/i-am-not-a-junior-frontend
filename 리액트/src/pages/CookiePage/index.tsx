export default function CookiePage() {
  const handleClick1 = () => {
    const newCookie = `name1=apple;`;
    document.cookie = newCookie;
  };
  const handleClick2 = () => {
    const newCookie = `name2=banana;`;
    document.cookie = newCookie;
  };
  const handleClick3 = () => {
    const newCookie = `name3=orange;`;
    document.cookie = newCookie;
  };

  const clearCookie = () => {
    document.cookie = "name1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name3=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleClick1}>apple</button>
      <button onClick={handleClick2}>banana</button>
      <button onClick={handleClick3}>orange</button>
      <button onClick={clearCookie}>clear</button>
    </div>
  );
}
