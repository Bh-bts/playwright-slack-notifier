import { parseReportData } from "./utils.js";
import { generateSlackMessage } from "./reporter.js";
import { sendSlackMessage, sendStartMessage } from "./slackClient.js";

// START notification function
export const sendStartNotification = async (reportFilePath, browserName = "chromium") => {
    await sendStartMessage(browserName);
};

const report = async (reportFilePath, browserName = "chromium") => {
    try {
        const {
            passedTests,
            failedTests,
            skippedTests,
            failedAssertionCount,
            failedTimeoutCount,
            otherFailureReasons,
        } = await parseReportData(reportFilePath);

        const priority = failedTimeoutCount > 0 ? "Medium" : "Low";
        let failReasonMessage = "";

        if (failedTimeoutCount > 0) {
            failReasonMessage += `${failedTimeoutCount} test${failedTimeoutCount > 1 ? "s" : ""} failed due to Timeout error`;
        }
        if (failedAssertionCount > 0) {
            if (failReasonMessage) failReasonMessage += " & ";
            failReasonMessage += `${failedAssertionCount} test${failedAssertionCount > 1 ? "s" : ""} failed due to assertion error`;
        }

        let detailedErrors = "";
        if (otherFailureReasons.length > 0) {
            detailedErrors = otherFailureReasons
                .slice(0, 5)
                .map((reason) => `>• ${reason}`)
                .join("\n");
            if (otherFailureReasons.length > 5) {
                detailedErrors += `\n>...and ${otherFailureReasons.length - 5} more`;
            }
        }

        const color = failedTests > 0 ? "#FF0000" : skippedTests > 0 ? "#76b000" : "#76b000";

        const slackMessage = generateSlackMessage(
            passedTests,
            failedTests,
            skippedTests,
            browserName,
            priority,
            failReasonMessage + (detailedErrors ? `\n\n>*Failure Details:*\n${detailedErrors}` : ""),
            color
        );

        await sendSlackMessage(slackMessage);
    } catch (error) {
        console.error("❌ Error while generating Slack report:", error.message);
    }
};

export { generateSlackMessage, report };
