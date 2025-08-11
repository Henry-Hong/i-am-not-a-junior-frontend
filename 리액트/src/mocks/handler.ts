// https://mswjs.io/docs/basics/intercepting-requests

import { delay, http, HttpResponse } from "msw";

const users = new Map([
  [1, { id: 1, name: "Heerim", classId: 1 }],
  [2, { id: 2, name: "Henry", classId: 2 }],
]);

const classes = new Map([
  [1, { id: 1, name: "1반", students: [1], teacher: 1 }],
  [2, { id: 2, name: "2반", students: [2], teacher: 2 }],
]);

export const handlers = [
  http.get("/mock/todos", async (/**{ request, params, cookies } */) => {
    await delay(1000);
    return HttpResponse.json(["todo1", "todo2"]);
  }),
  http.get("/mock/todos2", async (/**{ request, params, cookies } */) => {
    await delay(5000);
    return HttpResponse.json(["todo3", "todo4"]);
  }),
  http.get("/mock/users/:userId", async ({ params }) => {
    await delay(1000);
    const userId = Number(params.userId);
    return HttpResponse.json({ ...users.get(userId) });
  }),
  http.get("/mock/classes/:classId", async ({ params }) => {
    await delay(1000);
    const classId = Number(params.classId);
    if (!classId) {
      return HttpResponse.json(
        { error: "classId is required" },
        { status: 400 }
      );
    }
    return HttpResponse.json({ ...classes.get(classId) });
  }),
  http.get("/cancel-fetch", async ({ params }) => {
    await delay(3000);
    return HttpResponse.json({ value: "this is cancel fetch response" });
    // return HttpResponse.error();
  }),
  http.post("/cancel-fetch", async ({ params }) => {
    return HttpResponse.json({ value: "hello world".repeat(40000000) });
    // return HttpResponse.error();
  }),
];
