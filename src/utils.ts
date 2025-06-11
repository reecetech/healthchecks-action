import * as core from "@actions/core";
import fetch from "node-fetch";

export async function fetchWithRetry(
  url: string,
  retries = 5,
  delay = 2000
): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return;
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (attempt < retries) {
        core.warning(
          `Attempt ${attempt} failed: ${errorMessage}. Retrying in ${delay}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        throw new Error(`Failed after ${retries} attempts: ${errorMessage}`);
      }
    }
  }
}
