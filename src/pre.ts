import * as core from "@actions/core";
import { v4 as uuidv4 } from "uuid";
import { fetchWithRetry } from "./utils";

function constructPingUrl(baseUrl: string, uuid: string): string {
  return `${baseUrl}/start?rid=${uuid}`;
}

async function run(): Promise<void> {
  try {
    const pingUrl: string = core.getInput("ping-url");
    if (!pingUrl) {
      core.setFailed("Ping URL is required.");
      return;
    }

    const uuid: string = uuidv4();
    core.info(`Generated UUID: ${uuid}`);
    core.saveState("uuid", uuid);

    const fullUrl = constructPingUrl(pingUrl, uuid);
    core.info(`Constructed ping URL: ${fullUrl}`);

    await fetchWithRetry(fullUrl);
    core.info(`Start ping sent successfully with UUID: ${uuid}`);
  } catch (error) {
    core.error(`Error occurred: ${(error as Error).message}`);
    core.setFailed((error as Error).message);
  }
}

run();
