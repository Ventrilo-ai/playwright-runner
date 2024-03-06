import { chromium } from "playwright";

const DEFAULT_CHROMIUM_SWITCHES = ["--single-process"];

async function main() {
    if (process.argv.length !== 3) {
        console.log("Usage: node index.js <url>");
        process.exit(1);
    }

    const url = process.argv[2];
    const browser = await chromium.launch({ args: DEFAULT_CHROMIUM_SWITCHES });
    const context = await browser.newContext({
        userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    page.on("console", msg => {
        console.log(`Console message: ${msg.text()}`);
    });

    try {
        console.log(`Loading page: ${url}`);
        await page.goto(url);
        console.log("Page loaded successfully");
        await page.screenshot({ path: "screenshot.png" });
        console.log("Screenshot: screenshot.png");
    } catch (error) {
        console.error(`Failed to load the page: ${error}`);
    }

    await browser.close();
}

main();
