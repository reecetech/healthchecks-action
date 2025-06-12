import * as core from "@actions/core";
import { v4 as uuidv4 } from "uuid";
import { fetchWithRetry } from "./utils";

async function run(): Promise<void> {
  try {
    const pingUrl: string = core.getInput("ping-url");
    core.info(`Input ping-url: ${pingUrl}`);
    if (!pingUrl) {
      core.setFailed("Ping URL is required.");
      return;
    }

    const uuid = uuidv4();
    core.info(`Generated UUID: ${uuid}`);
    core.saveState("uuid", uuid);

    await fetchWithRetry(`${pingUrl}/start?rid=${uuid}`);
    core.info(`Start ping sent with UUID: ${uuid}`);
  } catch (error) {
    core.error(`Error occurred: ${(error as Error).message}`);
    core.setFailed((error as Error).message);
  }
}

run();
