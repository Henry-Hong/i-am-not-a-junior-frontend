// https://mswjs.io/docs/basics/intercepting-requests

import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("/mock/todos", async (/**{ request, params, cookies } */) => {
    await delay(1000);
    return HttpResponse.json(["todo1", "todo2"]);
  }),
  http.get("/mock/todos2", async (/**{ request, params, cookies } */) => {
    await delay(5000);
    return HttpResponse.json(["todo3", "todo4"]);
  }),
];
