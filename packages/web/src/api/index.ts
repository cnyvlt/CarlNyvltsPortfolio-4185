import type { RouterClient } from "@orpc/server";
import { createAgentUIStreamResponse } from "ai";
import { createApp } from "./__core/app";
import { ping } from "./routes/ping";
import { agent } from "./agent";

// API features are oRPC procedures, one file per feature in ./routes/,
// composed into this router — typed end-to-end via the clients
// (web: src/web/lib/api.ts, mobile: lib/api.ts).
// Keep each routes/ file under 500 lines (`bun run lint` enforces this);
// split into more feature files as they grow.
// Patterns and examples: skills/app/references/api.md
export const router = {
  ping,
};

export type AppRouter = typeof router;
/** Typed client for the router — used by the web and mobile api clients. */
export type AppRouterClient = RouterClient<AppRouter>;

const app = createApp(router);
// Rare plain-HTTP endpoints (webhooks, streaming, the Better Auth handler)
// register here with full paths, e.g. app.post("/api/webhooks/example", ...)

/** Streaming endpoint for the portfolio assistant — chat replies stream from here. */
app.post("/api/agent/messages", async (c) => {
  const { messages } = await c.req.json();
  return createAgentUIStreamResponse({ agent, uiMessages: messages });
});

export default app;
