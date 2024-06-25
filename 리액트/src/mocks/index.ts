// https://mswjs.io/docs/integrations/browser#setup

import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
