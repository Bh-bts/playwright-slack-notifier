#!/usr/bin/env node
import { program } from "commander";
import { report, sendStartNotification } from "../src/index.js";

program
    .name("playwright-slack-notifier")
    .description("Send Playwright test execution results to Slack")
    .version("1.0.0");

// START subcommand
program
    .command("start")
    .description("Send START notification")
    .requiredOption("-f, --file <path>", "Path to Playwright JSON report")
    .option("-b, --browser <name>", "Browser name", "chromium")
    .action(async (options) => {
        await sendStartNotification(options.file, options.browser);
    });

// STOP subcommand
program
    .command("stop")
    .description("Send STOP notification (with report)")
    .requiredOption("-f, --file <path>", "Path to Playwright JSON report")
    .option("-b, --browser <name>", "Browser name", "chromium")
    .action(async (options) => {
        await report(options.file, options.browser);
    });

program.parse(process.argv);
