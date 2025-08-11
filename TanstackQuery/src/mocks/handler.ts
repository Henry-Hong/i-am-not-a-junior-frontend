// https://mswjs.io/docs/basics/intercepting-requests

import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("/sample", async (/**{ request, params, cookies } */) => {
    await delay(1000);
    return HttpResponse.json({
      data: "sample",
    });
  }),
  http.get("/error", async () => {
    await delay(500);
    return new HttpResponse(null, {
      status: 404,
      statusText: "you are not found",
    });
  }),
  http.get("/cache-and-stale-time", async () => {
    await delay(500);
    return HttpResponse.json({
      data: `cache-and-stale-time, ${new Date().toISOString()}`,
    });
  }),
  http.get("/fetch-and-prefetch", async () => {
    await delay(1000);
    return HttpResponse.json({
      data: "fetch-and-prefetch",
    });
  }),
  http.get("/fetch-query-and-ensure-query-data/:type", async ({ params }) => {
    await delay(1000);
    return HttpResponse.json({
      data: `fetch-query-and-ensure-query-data, ${JSON.stringify(params)}`,
    });
  }),
  http.get("/invalidation", async () => {
    await delay(1000);
    return HttpResponse.json({
      data: "invalidation",
    });
  }),
];
