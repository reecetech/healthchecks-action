# healthchecks-action

This GitHub Action provides seamless integration with Healthchecks.io, allowing you to monitor the health of your scheduled jobs and workflows. It automatically sends pings to your designated Healthchecks.io URL at both the beginning and end of a job's execution, ensuring you're always aware of its status.

The initial ping is sent as part of a pre-action step, so you should place the Healthchecks Ping action after whatever is important in your workflow.

---

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

|                             INPUT                              |  TYPE  | REQUIRED |   DEFAULT   |                                    DESCRIPTION                                     |
|----------------------------------------------------------------|--------|----------|-------------|------------------------------------------------------------------------------------|
|    <a name="input_ping-url"></a>[ping-url](#input_ping-url)    | string |   true   |             |                               Healthchecks ping URL                                |
| <a name="input_run-status"></a>[run-status](#input_run-status) | string |  false   | `"success"` |                   Run status, either "success" or <br>"failure"                    |
| <a name="input_skip-pings"></a>[skip-pings](#input_skip-pings) | string |  false   |  `"false"`  | Set to true to skip <br>sending pings to Healthchecks (expects "true" or "false")  |

<!-- AUTO-DOC-INPUT:END -->

---

## Usage

Add this action to the end of your workflow as shown below:

```yaml
- name: Healthchecks Ping
  uses: reecetech/healthchecks-action@v0
  with:
    ping-url: <healthcheck ping url>
    run-status: ${{ job.status }}
```

To skip all Healthchecks pings for manually dispatched workflows while retaining
the default behaviour for every other trigger:

```yaml
- name: Healthchecks Ping
  uses: reecetech/healthchecks-action@v0
  with:
    ping-url: <healthcheck ping url>
    run-status: ${{ job.status }}
    skip-pings: ${{ github.event_name == 'workflow_dispatch' }}
```

The `skip-pings` input is optional and defaults to `false`, so existing uses of
the action continue to send pings without any changes.

---

## How It Works

1. **Send Start Ping:** At the beginning of the job (pre-action), the action sends a "start" ping to Healthchecks using the provided `ping-url`.
2. **Generate UUID:** A unique identifier (UUID) is generated to track the job execution.
3. **Send Success Ping:** If the job succeeds, the main action step sends a "finish" ping to Healthchecks to indicate success.
4. **Send Failure Ping:** If the job fails, the post-action step sends a "fail" ping to Healthchecks to indicate failure.

## Important Notes

1. Don't run the Healthchecks action with `if: always()` otherwise you'll get undesirable behaviour.
