import * as core from "@actions/core";
import { fetchWithRetry } from "./utils";

function constructFailUrl(baseUrl: string, uuid: string): string {
  return `${baseUrl}/fail?rid=${uuid}`;
}

export async function run(): Promise<void> {
  const pingUrl = core.getInput("ping-url");
  const uuid = core.getState("uuid");
  const runStatus = core.getInput("run-status");

  if (!pingUrl) {
    core.warning("Ping URL is missing. Cannot send ping.");
    return;
  }

  if (!uuid) {
    core.warning("UUID is missing. Cannot send ping.");
    return;
  }

  try {
    if (runStatus === "failure") {
      const failUrl = constructFailUrl(pingUrl, uuid);
      core.warning(`Workflow failed. Sending fail ping to: ${failUrl}`);
      await fetchWithRetry(failUrl);
      core.info("Fail ping sent successfully.");
    } 
  } catch (error) {
    core.error(`Error occurred while sending ping: ${(error as Error).message}`);
  }
}

run();
