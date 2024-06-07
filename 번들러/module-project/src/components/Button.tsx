export default function Button({
  children,
  variants,
}: {
  children: React.ReactNode;
  variants: "primary" | "secondary";
}) {
  const color = variants === "primary" ? "blue" : "red";
  return <button style={{ backgroundColor: color }}>{children}</button>;
}
