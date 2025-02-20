import { Suspense } from "react";
import Container from "./Container";

export default function AsyncPage() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Container />
    </Suspense>
  );
}
