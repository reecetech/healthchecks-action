# healthchecks-action

This GitHub Action integrates with Healthchecks to monitor the health of your workflows. It sends pings to Healthchecks at the start and end of a job.

---

## Required Permissions

Ensure your workflow includes the following permissions:

```yaml
permissions:
  id-token: write
  packages: write
```

---

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->


| INPUT DEFAULT  |      DESCRIPTION               | Required |
|----------------|--------------------------------|----------|
| ping-url       | Ping URL for Healthchecks      | true     |

<!-- AUTO-DOC-INPUT:END -->

---

## Usage

Add this action to your workflow as shown below:

```yaml
- name: Healthchecks Ping
  uses: reecegroup/healthchecks-action@v0
  with:
    ping-url: <healthcheck ping url>
```

---

## How It Works

1. **Send Start Ping:** At the beginning of the job, the action sends a "start" ping to Healthchecks using the provided `ping-url`.
2. **Generate UUID:** A unique identifier (UUID) is generated to track the job execution.
3. **Send Finish Ping:** At the end of the job, the action sends a "finish" ping to Healthchecks if the job succeeds.
