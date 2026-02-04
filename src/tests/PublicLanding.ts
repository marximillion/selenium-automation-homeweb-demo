/* MDG 2026 */

/**
 * Imports
 */

import { appendFile } from 'node:fs/promises';
import { BaseTest } from './legacy-pure-ts/BaseTest';
import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { FIND, HOMEWEB_DOMAIN, ID, LANGUAGE, TAG } from '../common/Constants';
import { ElementType } from '../types/ElementType';

/**
 * Public Landing - Anonymous Tests
 */
export class PublicLanding extends BaseTest {
    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.PUBLIC_LANDING, handle);
    }// End of constructor()

    /**
     * Action: Run Test Step
     * @param testElement {ElementType}
     * @param find {string}
     */
    public async runStep(testElement: ElementType, find?: string) {
        const {id, identifier, route} = testElement;
        let url: URL;
        let element: WebElement;

        // 1: Find element
        switch (find) {
            case FIND.TEXT:
                element = await this.chromeDriver.findElement(By.linkText(identifier));
                break;
            case FIND.CSS:
            default:
                element = await this.chromeDriver.findElement(By.css(identifier));
                break;
            }

        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            element
        );
        await this.chromeDriver.sleep(500);
        await this.chromeDriver.wait(until.elementIsVisible(element), 10000);
        await this.chromeDriver.wait(until.elementIsEnabled(element), 10000);

        // 3: Click element
        await element.click();

        /**
         * 4: Validate click
         */
        // 4.1: Set up clicked URL
        url = new URL(await this.chromeDriver.getCurrentUrl());

        // 4.2: Domain Check - Homeweb
        if (url.origin === HOMEWEB_DOMAIN) {
            if (url.pathname === route) {
                // 4.2.1: Test - Pass
                const success_message = `${id}->success\n`;
                await appendFile(this.logFilename, success_message);
            }
            else {
                // 4.2.2: Test - Fail | Pathname doesn't match
                throw new Error(`Expected route ${route}, got ${url.pathname}`);
            }
        }
        // 4.3: Domain Check - UNKNOWN
        else {
            // 4.3.1: Test - Fail | Domain doesn't match
            throw new Error(`UNKNOWN ORIGIN: ${url.origin}`);
        }

        // 5: Additional check to ensure page content has been loaded
        await this.chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)))

        // 6: Navigate back to original page
        await this.chromeDriver.navigate().back();
    }// End of runStep()
}// End of class
// End of file

