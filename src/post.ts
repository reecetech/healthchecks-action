import * as core from "@actions/core";
import { fetchWithRetry } from "./utils";

export async function run(): Promise<void> {
  try {
    const pingUrl = core.getInput("ping-url");
    const uuid = core.getState("uuid");
    core.info(`ping url: ${pingUrl}`);
    if (!uuid) throw new Error("UUID not found in state");

    await fetchWithRetry(`${pingUrl}?rid=${uuid}`);
    core.info("Finish ping sent.");
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
