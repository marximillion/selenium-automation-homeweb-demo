/* MDG 2026 */

/**
 * Imports
 */
import { BaseTest } from './BaseTest';
import { FIND, HOMEWEB_DOMAIN, ID, KNOWN_DOMAINS, LANGUAGE, LIFESTAGE_DOMAIN, LIFESTYLES_DOMAIN, QUANTUM_API_DOMAIN, SENTIO_DOMAIN, TAG, TIMEOUT } from '../common/Constants';
import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { ElementType } from '../types/ElementType';
import { appendFile } from 'node:fs/promises';

/**
 * Login - Tests
 */
export class Authenticated extends BaseTest {
    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.AUTH, handle);
    }// End of constructor()

    /**
     * Test: Button
     * @param buttonElement {ElementType}
     */
    public async testButton(buttonElement: ElementType) {
        const { id, identifier, route } = buttonElement;
        console.log(`Testing button: ${identifier}`);
        let button: WebElement;
        let url: URL;

        // 1: Find element

        button = await this.chromeDriver.findElement(By.linkText(identifier));
        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            button
        );
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(button), TIMEOUT.S_FIVE);
        await this.chromeDriver.wait(until.elementIsEnabled(button), TIMEOUT.S_FIVE);

        // 3: Click element
        await button.click();

        // 4: Validate click
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
        // 4.3: Domain Check - Other
        else {
            // 4.3.1: Check if domain is known
            if (KNOWN_DOMAINS.includes(url.origin)) {
                // 4.3.1.1: Test - Pass | KNOWN Domain
                const successMessage = `${id}->success\n`;
                await appendFile(this.logFilename, successMessage);
            } else {
                // 4.3.2: Test - Fail | UNKNOWN Domain
                throw new Error(`UNKNOWN ORIGIN: ${url.origin}`);
            }
            // // 4.3.1: Check if domain is known
            // switch (url.origin) {
            //     // 4.3.1: Test - Pass | KNOWN Domain
            //     case SENTIO_DOMAIN:
            //     case LIFESTAGE_DOMAIN:
            //     case LIFESTYLES_DOMAIN:
            //     case QUANTUM_API_DOMAIN: 
            //         const success_message = `${id}->success\n`;
            //         await appendFile(this.logFilename, success_message);
            //         break;
            //     default:
            //         // 4.3.2: Test - Fail | UNKNOWN Domain
            //         throw new Error(`UNKNOWN ORIGIN: ${url.origin}`);
            // }
        }

        // 5: Navigate back
        await this.chromeDriver.navigate().back();
    }// End of testButton()
    
    // TODO
    public async testModal() {
        // 1: Find the button
        const button = await this.chromeDriver.findElement(
            By.css('button[data-bs-target="#resourceGate"]')
        );

        expect(button).toBeTruthy();

        // 2: Click the button
        await button.click();

        // 3: Wait for modal to become visible
        const modal = await this.chromeDriver.wait(
            until.elementLocated(By.id("resourceGate")),
            5000
        );
        this.chromeDriver
        await this.chromeDriver.wait(until.elementIsVisible(modal), 5000);

        // 4: Assert modal is displayed
        const isDisplayed = await modal.isDisplayed();
        expect(isDisplayed).toBe(true);
    }

    // TODO
    public async testCourse() {
        // 1: Find the button
        const button = await this.chromeDriver.findElement(
            By.css('button[data-bs-dismiss="modal"]')
        );

        expect(button).toBeTruthy();

        // 2: Click the button
        await button.click();

    }
}// End of class
// End of file
