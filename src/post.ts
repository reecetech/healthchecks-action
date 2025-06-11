import * as core from "@actions/core";
import { fetchWithRetry } from "./utils";

export async function run(): Promise<void> {
  try {
    const pingUrl = core.getInput("ping-url");
    const uuid = core.getState("uuid");
    const status = core.getInput("run-status");
    core.info(`ping url: ${pingUrl}`);
    if (status != "success") {
      core.info(`Skipping Healthchecks finish ping. Job ended with status: ${status}`);
      return;
    }


    if (!uuid) throw new Error("UUID not found in state");

    await fetchWithRetry(`${pingUrl}?rid=${uuid}`);
    core.info("Finish ping sent.");
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
