import { createGateway } from "ai";

/**
 * Read from the ambient process env without depending on a global `ProcessEnv`
 * declaration — the mobile package ships its own narrower one, which would
 * otherwise shadow the server-side typing during a monorepo-wide typecheck.
 */
const env =
	(globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

export const gateway = createGateway({
	baseURL: env.AI_GATEWAY_BASE_URL,
	apiKey: env.AI_GATEWAY_API_KEY,
});
