import { DotLottie } from "@dotlottie/dotlottie-js/node";

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createDotLottie() {
  const dangerIndented = JSON.parse(
    readFileSync(join(__dirname, "./danger-indented.json"), "utf8")
  );
  const dangerMinified = JSON.parse(
    readFileSync(join(__dirname, "./danger-minified.json"), "utf8")
  );

  let dotLottie = new DotLottie();

  // build minified
  await dotLottie
    .addAnimation({
      id: "danger2",
      data: dangerMinified,
    })
    .build();

  writeFileSync(
    "danger-minified.lottie",
    Buffer.from(await dotLottie.toArrayBuffer({}))
  );

  dotLottie = new DotLottie();

  // build indented
  await dotLottie
    .addAnimation({
      id: "danger1",
      data: dangerIndented,
    })
    .build();

  writeFileSync(
    "danger-indented.lottie",
    Buffer.from(await dotLottie.toArrayBuffer({}))
  );
}

createDotLottie();
