import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendSlackMessage = async (payload) => {
    const webhookURL = process.env.SLACK_WEBHOOK;
    if (!webhookURL) {
        throw new Error("Missing SLACK_WEBHOOK in environment variables");
    }

    try {
        await axios.post(webhookURL, payload);
        console.log("✅ Slack message sent successfully!");
    } catch (error) {
        console.error("❌ Failed to send Slack message:", error.message);
    }
};

export const sendStartMessage = async (browserName = "chromium", env = "Stage") => {
    const message = {
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `:mega: Playwright - ${browserName.charAt(0).toUpperCase() + browserName.slice(1)} Execution: *STARTED*\n*Env:* ${env}`
                }
            }
        ]
    };
    await sendSlackMessage(message);
};
