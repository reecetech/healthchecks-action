import * as core from "@actions/core";
import { v4 as uuidv4 } from "uuid";
import { fetchWithRetry } from "./utils";

export async function run(): Promise<void> {
  try {
    const pingUrl = core.getInput("ping-url");
    if (!pingUrl) {
      core.setFailed("Ping URL is required.");
      return;
    }

    const uuid = uuidv4();
    core.info(`ping url: ${pingUrl}`);
    core.saveState("uuid", uuid);
    core.info(`Generated UUID: ${uuid}`);

    await fetchWithRetry(`${pingUrl}/start?rid=${uuid}`);
    core.info("Start ping sent.");
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}
