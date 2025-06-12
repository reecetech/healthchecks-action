import * as core from "@actions/core";
import { fetchWithRetry } from "./utils";

function constructPingUrl(baseUrl: string, uuid: string): string {
  return `${baseUrl}?rid=${uuid}`;
}

export async function run(): Promise<void> {
  try {
    const pingUrl: string = core.getInput("ping-url");
    if (!pingUrl) {
      core.setFailed("Ping URL is required.");
      return;
    }

    const uuid: string = core.getState("uuid");
    if (!uuid) {
      core.setFailed("UUID not found in state.");
      return;
    }

    core.info(`Ping URL: ${pingUrl}`);
    core.info(`UUID: ${uuid}`);

    const fullUrl = constructPingUrl(pingUrl, uuid);
    await fetchWithRetry(fullUrl);
    core.info("Finish ping sent successfully.");
  } catch (error) {
    core.error(`Error occurred: ${(error as Error).message}`);
    core.setFailed((error as Error).message);
  }
}

run();
