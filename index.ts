import { chromium } from "playwright";

async function main() {
    if (process.argv.length !== 3) {
        console.log("Usage: node index.js <url>");
        process.exit(1);
    }

    const url = process.argv[2];
    const browser = await chromium.launch();
    const page = await browser.newPage();

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
