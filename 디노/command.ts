const output = await new Deno.Command("echo", {
  args: ["hello world!"],
}).output();

console.log(new TextDecoder().decode(output.stdout));
