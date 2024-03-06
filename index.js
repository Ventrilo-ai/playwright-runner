"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.argv.length !== 3) {
            console.log("Usage: node index.js <url>");
            process.exit(1);
        }
        const url = process.argv[2];
        const browser = yield playwright_1.chromium.launch();
        const page = yield browser.newPage();
        page.on("console", msg => {
            console.log(`Console message: ${msg.text()}`);
        });
        try {
            console.log(`Loading page: ${url}`);
            yield page.goto(url);
            console.log("Page loaded successfully");
            yield page.screenshot({ path: "screenshot.png" });
            console.log("Screenshot: screenshot.png");
        }
        catch (error) {
            console.error(`Failed to load the page: ${error}`);
        }
        yield browser.close();
    });
}
main();
