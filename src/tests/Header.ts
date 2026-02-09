/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, until, WebDriver } from 'selenium-webdriver';
import { CSS, HOMEWEB_DOMAIN, ID, LANGUAGE, QUANTUM_API_DOMAIN, TAG, TIMEOUT } from '../common/Constants';
import { ElementType } from '../types/ElementType';

/**
 * Header - Anonymous Tests
 */
export class Header extends BaseTest {
    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.HEADER, handle);
    }// End of constructor()

    // ====================== HOMEWEB ===================== //
    // ==== ANONYMOUS ==== //
    /**
     * Action: Run Test Step
     * @param testElement {ElementType}
     */
    public async runStep(testElement: ElementType) {
        const {id, identifier, route} = testElement;

        // 1: Scroll to top of page
        await this.chromeDriver.executeScript( 'window.scrollTo(0, 0);' );

        // 2: Find element
        const element = await this.chromeDriver.findElement(By.css(identifier));

        // 3: Click element
        await element.click();

        /**
         * 4: Validate click
         */
        // 4.1: Set up clicked URL
        const url = new URL(await this.chromeDriver.getCurrentUrl());

        // 4.2: Domain Check - Homeweb
        if (url.origin === HOMEWEB_DOMAIN) {
            if (url.pathname === route) {
                // 4: Test - Pass
                this.passed += 1;
                const success_message = `${id}->success\n`;
                await appendFile(this.logFilename, success_message);
            }
        }
        // 4.3: Domain Check - Quantum API
        else if (url.origin === QUANTUM_API_DOMAIN) {
            if ( url.pathname === route ) {
                this.passed += 1;
                const success_message = `${id}->success\n`;
                await appendFile( this.logFilename, success_message );
            }
        }
        // 4.4: Domain Check - UNKNOWN
        else {
            throw new Error('UNKNOWN ORIGIN');
        }
    };// End of runStep()

    // ==== AUTHENTICATED ==== //
    public async testMenu(testElement: ElementType) {
        const {id, identifier, route} = testElement;

        // 1: Find element
        const element = await this.chromeDriver.findElement(By.css(identifier));

        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            element
        );
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(element), TIMEOUT.S_FIVE);
        await this.chromeDriver.wait(until.elementIsEnabled(element), TIMEOUT.S_FIVE);

        // 3: Click element
        await element.click();

        // 4: Validate menu is displayed
        await this.chromeDriver.wait(until.elementLocated(By.css(CSS.DROPDOWN)))
        const success_message = `${id}->success\n`;
        await appendFile(this.logFilename, success_message);
    }

    public async testLogout(testElement: ElementType) {
        const {id, identifier, route} = testElement;
        let url: URL;

        // 1: Find element
        const element = await this.chromeDriver.findElement(By.css(identifier));

        // 2: Scroll to element
        await this.chromeDriver.executeScript(
            "arguments[0].scrollIntoView({ block: 'center', inline: 'center' });",
            element
        );
        await this.chromeDriver.sleep(TIMEOUT.S_HALF);
        await this.chromeDriver.wait(until.elementIsVisible(element), TIMEOUT.S_FIVE);
        await this.chromeDriver.wait(until.elementIsEnabled(element), TIMEOUT.S_FIVE);

        // 3: Click element
        await element.click();

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
        // 4.4: Domain Check - UNKNOWN
        else {
            // 4.3.1: Test - Fail | Domain doesn't match
            throw new Error(`UNKNOWN ORIGIN: ${url.origin}`);
        }

        // 5: Additional check to ensure page content has been loaded
        await this.chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)))
    }

    // ================== CUSTOMER PORTAL ================= //
    public async testInsight (testElement: ElementType){
        const dropdownToggle = await this.chromeDriver.wait(
            until.elementLocated(
                By.css('#navigation-primary .dropdown-toggle')
            ),
            TIMEOUT.S_FIVE
        );

        await dropdownToggle.click();

        // // 1: Find element
        const {id, identifier, route} = testElement;
        const insight = await this.chromeDriver.findElement(By.linkText(identifier));

        // 3: Click element
        await insight.click();

        await this.chromeDriver.sleep(TIMEOUT.S_FIVE);
        const iframe = await this.chromeDriver.wait(
            until.elementLocated(By.css(CSS.IFRAME)),
            TIMEOUT.S_FIFTEEN
        );
        await this.chromeDriver.wait(until.elementIsVisible(iframe), TIMEOUT.S_FIFTEEN);
        await this.chromeDriver.wait(until.elementIsEnabled(iframe), TIMEOUT.S_FIFTEEN);
    };// End of testInsight()
}// End of class
// End of file
