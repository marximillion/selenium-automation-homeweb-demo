/**
 * Imports
 */
import { appendFile } from 'fs/promises';
import { Browser, Builder, By } from 'selenium-webdriver';

/**
 * Constants
 * TODO: Move to constants file
 */
const CLICK_DELAY = 1000;
const HOMEWEB_LANDING_URL = 'https://homeweb.ca/';
const LOGS_DIRECTORY = 'logs';
let success_counter = 0;
const total_tests = 3;

// TODO: Move to Utility file
function getLogFilename(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
    const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

    return `${LOGS_DIRECTORY}/header-results-${dateStr}_${timeStr}.txt`;
}

async function generateHeaderReport() {
    const report = `\nSUMMARY\nTOTAL: ${total_tests}\nPASS: ${success_counter}\nEND`
    await appendFile(logFilename, report );
}

// 1: Set up browser driver
const chromeDriver = new Builder().forBrowser(Browser.CHROME).build();
const logFilename = getLogFilename();

/**
 * Header
 */
async function header() {
    const message_driver = `DRIVER->success\n`;
    await appendFile(logFilename, message_driver );

    try {
        // TODO: Make a common test? This test will get re used
        // 2: Navigate to Homeweb public landing page
        await chromeDriver.get(HOMEWEB_LANDING_URL);
        const message_navigation = `NAVIGATION::${HOMEWEB_LANDING_URL}->success\n`;
        await appendFile(logFilename, message_navigation );

        // 3: Click the Homeweb logo
        await logo();

        // 4: Click the language toggle
        await languageToggle();

        // 5: Click the Sign In button
        await signInButton();

        // 6: Close the browser
        await chromeDriver.sleep(CLICK_DELAY);
        const message_header = `HEADER::tests->success\n`;
        await appendFile(logFilename, message_header );
        await generateHeaderReport()
        await chromeDriver.quit();
    }
    catch (error: any) {
        const message_navigation = `HEADER::ERROR->${error}\n`;
        await appendFile(logFilename, message_navigation );
        await chromeDriver.quit();
    }
}

async function logo() {
    await chromeDriver.sleep(CLICK_DELAY);
    const CLASS_HOMEWOOD_LOGO = 'navbar-brand';
    const HOMEWOOD_LOGO = await chromeDriver.findElement(By.className(CLASS_HOMEWOOD_LOGO));
    await HOMEWOOD_LOGO.click();

    const message_logo = `HEADER-ANON-001->success\n`;
    await appendFile(logFilename, message_logo );

    success_counter += 1;
}

async function languageToggle() {
    await chromeDriver.sleep(CLICK_DELAY);
    const CLASS_LANGUAGE_TOGGLE = 'btn btn-nav-item btn-language btn-icon-spaced  always-show';
    const LANGUAGE_TOGGLE = await chromeDriver.findElement(By.className(CLASS_LANGUAGE_TOGGLE));
    await LANGUAGE_TOGGLE.click();

    const message_languageToggle = `HEADER-ANON-002->success\n`;
    await appendFile(logFilename, message_languageToggle );

    success_counter += 1;
}

async function signInButton() {
    await chromeDriver.sleep(CLICK_DELAY);
    const CLASS_SIGN_IN_BUTTON = 'btn btn-nav-item btn-icon-spaced btn-login me-0';
    const SIGN_IN_BUTTON = await chromeDriver.findElement(By.className(CLASS_SIGN_IN_BUTTON));
    await SIGN_IN_BUTTON.click();

    const message_signInButton = `HEADER-ANON-003->success\n`;
    await appendFile(logFilename, message_signInButton );

    success_counter += 1;
}

header()
