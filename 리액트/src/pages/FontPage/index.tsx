export default function FontPage() {
  return (
    <>
      <style
        id="special-style"
        {...{
          [`hello-world`]: `hello-world-key`,
        }}
      >
        {`h1 {
          color: red;
        }`}
      </style>
      こんにちは
      {/* <h1>안녕 세상아</h1> */}
      {/* <h1>Hello World</h1> */}
    </>
  );
}
