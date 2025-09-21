# Playwright Slack Reporter

📣 Playwright Slack Reporter is a Node.js library to send Playwright test execution notifications to Slack. It allows you to send start and stop notifications with test results, including passed, failed, skipped tests, failure reasons, and detailed errors.

## 🚀 Features

- Send Slack notifications when Playwright tests start or finish.
- Includes summary of passed, failed, skipped tests.
- Automatically parses Playwright JSON reports.
- Highlights failure reasons and details for quick debugging.
- Supports multiple browsers (chromium, firefox, webkit).
- Easy CLI commands to trigger notifications.

## 📦 Installation
Run below command to install package:

```npm install -g playwright-slack-notifier```

## Setup

1. Create a Slack Incoming Webhook URL:

    - Go to your Slack workspace → Settings → Apps → Incoming Webhooks.
    - Copy the generated webhook URL.

2. Set the webhook in your environment:

```export SLACK_WEBHOOK="https://hooks.slack.com/services/XXXX/XXXX/XXXX"```

## CLI Usage

## 1. Send Start Notification

```npx playwright-slack-notifier start --file <path-to-json-report> --browser <browser-name>```

Example:

```npx playwright-slack-notifier start --file playwright-report/test-results.json --browser chromium```

## 2. Send Stop Notification

```npx playwright-slack-notifier stop --file <path-to-json-report> --browser <browser-name>```

Example:

```npx playwright-slack-notifier stop --file playwright-report/test-results.json --browser chromium```

## Options

| Option           | Description                                    | Default      |
| ---------------- | ---------------------------------------------- | ------------ |
| `-f, --file`     | Path to Playwright JSON report                 | **Required** |
| `-b, --browser`  | Browser name (`chromium`, `firefox`, `webkit`) | `chromium`   |
| `start` / `stop` | Command to indicate execution start or finish  | —            |


# ❤️ Contributing
Contributions are welcome! Feel free to open an Issue or submit a Pull Request.