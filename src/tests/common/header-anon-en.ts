/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { Browser, Builder, By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, HEADER, HOMEWEB_LANDING_URL_EN } from '../../Constants';
import { generateSummary, getLogFilename } from '../../utility/Utility';

let pass_counter = 0;
let fail_counter = 0;

/**
 * Header - Test
 */
export async function headerAnonEn() {
    // 1: Set up variables
    const chromeDriver = new Builder().forBrowser(Browser.CHROME).build();
    const logFilename = getLogFilename();
    const start_time = Date.now();
    const total_tests = 3;

    let end_time = 0;
    try {
        // TODO: Make a common test? This test will get re used
        // 2: Navigate to Homeweb public landing page
        await chromeDriver.get(HOMEWEB_LANDING_URL_EN);

        // 3: Click the Homeweb logo
        await chromeDriver.sleep(CLICK_DELAY);
        await logo(chromeDriver, logFilename);

        // 4: Click the language toggle
        await chromeDriver.sleep(CLICK_DELAY);
        await languageToggle(chromeDriver, logFilename);

        // 5: Click the Sign In button
        await chromeDriver.sleep(CLICK_DELAY);
        await signInButton(chromeDriver, logFilename)

        // 6: Close the browser
        await chromeDriver.sleep(CLICK_DELAY);
        end_time = Date.now();
        const summary = generateSummary(total_tests, pass_counter, fail_counter, end_time - start_time);
        await appendFile(logFilename, summary );
        await chromeDriver.quit();
    }
    catch (error: any) {
        const message_navigation = `HEADER::ERROR->${error}\n`;
        await appendFile(logFilename, message_navigation );
        await chromeDriver.quit();
    }
}

/**
 * HEADER-ANON-001
 */
async function logo(chromeDriver: WebDriver,
                    logFilename: string)
{
    try {
        const HOMEWOOD_LOGO = await chromeDriver.findElement(By.css(HEADER.EN_LOGO));
        await HOMEWOOD_LOGO.click();

        const message_logo = `HEADER-ANON-001->success\n`;
        await appendFile(logFilename, message_logo );
        pass_counter += 1;
    }
    catch (error: any) {
        const message_error = `HEADER-ANON-001->onFailure ${error}\n`;
        await appendFile(logFilename, message_error );
        fail_counter += 1;
    }
    finally {
        await chromeDriver.get(HOMEWEB_LANDING_URL_EN);
    }
}

/**
 * HEADER-ANON-002
 */
async function languageToggle(chromeDriver: WebDriver,
                              logFilename: string) {
    try {
        const LANGUAGE_TOGGLE = await chromeDriver.findElement(By.css(HEADER.EN_TOGGLE));
        await LANGUAGE_TOGGLE.click();

        const message_languageToggle = `HEADER-ANON-002->success\n`;
        await appendFile(logFilename, message_languageToggle );
        pass_counter += 1;
    }
    catch (error: any) {
        const message_error = `HEADER-ANON-002->${error}\n`;
        await appendFile(logFilename, message_error );
        fail_counter += 1;
    }
    finally {
        await chromeDriver.get(HOMEWEB_LANDING_URL_EN);
    }
}

/**
 * HEADER-ANON-003
 */
async function signInButton(chromeDriver: WebDriver,
                            logFilename: string) {
    try {
        const SIGN_IN_BUTTON = await chromeDriver.findElement(By.css(HEADER.EN_BUTTON));
        await SIGN_IN_BUTTON.click();

        const message_signInButton = `HEADER-ANON-003->success\n`;
        await appendFile(logFilename, message_signInButton );
        pass_counter += 1;
    }
    catch (error: any) {
        const message_error = `HEADER-ANON-003->${error}\n`;
        await appendFile(logFilename, message_error );
        fail_counter += 1;
    }
    finally {
        await chromeDriver.get(HOMEWEB_LANDING_URL_EN);
    }
}


