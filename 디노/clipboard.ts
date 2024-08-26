import {
  readText,
  writeText,
} from "https://deno.land/x/copy_paste@v1.1.3/mod.ts";

const text = await readText();

prompt(`지금 클립보드에 있는 값은 ${text}입니다.`);

await writeText("바뀌었지롱~");
