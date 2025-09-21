import { readFile } from "fs/promises";

export const parseReportData = async (reportFilePath) => {
    const reportData = JSON.parse(await readFile(reportFilePath, "utf8"));
    const { stats, suites = [] } = reportData;
    const passedTests = stats.expected;
    const failedTests = stats.unexpected;
    const skippedTests = stats.skipped;

    let failedAssertionCount = 0;
    let failedTimeoutCount = 0;
    const otherFailureReasons = [];

    const processSpecs = (specs = []) => {
        specs.forEach((spec) => {
            (spec.tests || []).forEach((test) => {
                (test.results || []).forEach((result) => {
                    if ((result.status === "failed" || result.status === "timedOut") && result.error) {
                        const errorMessage = result.error.message.replace(/\x1B\[\d+m/g, "");
                        const [errorWithoutExpectedReceived] = errorMessage.split("\n");
                        otherFailureReasons.push(errorWithoutExpectedReceived);

                        if (errorMessage.includes("Test timeout")) {
                            failedTimeoutCount++;
                        } else if (errorMessage.includes("expect")) {
                            failedAssertionCount++;
                        }
                    }
                });
            });
        });
    };

    suites.forEach((suite) => {
        processSpecs(suite.specs);
        (suite.suites || []).forEach((innerSuite) => {
            processSpecs(innerSuite.specs);
        });
    });

    return { passedTests, failedTests, skippedTests, failedAssertionCount, failedTimeoutCount, otherFailureReasons };
};
