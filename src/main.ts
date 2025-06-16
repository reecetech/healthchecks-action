import * as core from "@actions/core";
import { fetchWithRetry } from "./utils";

function constructPingUrl(baseUrl: string, uuid: string): string {
  return `${baseUrl}?rid=${uuid}`;
}

export async function run(): Promise<void> {
  try {
    const pingUrl = core.getInput("ping-url");
    const uuid = core.getState("uuid");

    if (!pingUrl) {
      core.setFailed("Ping URL is required.");
      return;
    }

    if (!uuid) {
      core.setFailed("UUID not found in state.");
      return;
    }

    const fullUrl = constructPingUrl(pingUrl, uuid);
    await fetchWithRetry(fullUrl);
    core.info("Finish ping sent successfully.");
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
