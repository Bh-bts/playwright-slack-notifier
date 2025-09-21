export const generateSlackMessage = (
  passedTests,
  failedTests,
  skippedTests,
  browserName,
  priority,
  failReasonMessage,
  color
) => {
  const slackMessage = {
    attachments: [
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Passed:* ${passedTests}\n*Failed:* ${failedTests}\n*Skipped:* ${skippedTests}`,
            },
          },
        ],
        color,
      },
    ],
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📣 *Playwright Web Automation Execution Notification* \n\n Playwright ${browserName.charAt(0).toUpperCase() + browserName.slice(1)} Execution: *FINISHED*`,
        },
      },
    ],
  };

  if (failedTests > 0) {
    slackMessage.attachments[0].blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `\n*Priority:* ${priority}\n*Failed Reasons:* ${failReasonMessage}`,
      },
    });
  }

  return slackMessage;
};
