/* MDG 2026 */

/**
 * Imports
 */
import { appendFile } from 'node:fs/promises';
import { BaseTest } from './BaseTest';
import { By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, HOMEWEB_DOMAIN, HOMEWOOD_API_DOMAIN, LANGUAGE, TAG } from '../common/Constants';
import { generateSummary, translate } from '../common/Utility';

/**
 * Header Tests
 */
export class Header extends BaseTest {
    /**
     * Member Variables - Header Elements
     */
    // Create Header Object??
    private readonly LABEL_LOGO: string;
    private readonly LABEL_TOGGLE: string;
    private readonly LABEL_BUTTON: string;
    private readonly ID_LOGO: string;
    private readonly ID_TOGGLE: string;
    private readonly ID_BUTTON: string;
    private readonly ROUTE_LOGO: string;
    private readonly ROUTE_TOGGLE: string;
    private readonly ROUTE_BUTTON: string;

    /**
     * Constructor
     * @param locale {string}
     * @param driver {WebDriver}
     * @param target {string}
     * @param handle {string}
     */
    constructor(locale: LANGUAGE, driver: WebDriver, target: string, handle?: string) {
        super(locale, driver, target, TAG.HEADER, handle);
        console.log('Header::constructor()');

        this.LABEL_LOGO = translate('header_identifier_logo');
        this.LABEL_TOGGLE = translate('header_identifier_toggle');
        this.LABEL_BUTTON = translate('header_identifier_button');

        this.ID_LOGO = translate('header_id_logo');
        this.ID_TOGGLE = translate('header_id_toggle');
        this.ID_BUTTON = translate('header_id_button');

        this.ROUTE_LOGO = translate('header_route_logo');
        this.ROUTE_TOGGLE = translate('header_route_toggle');
        this.ROUTE_BUTTON = translate('header_route_button');
    }// End of constructor()

    /**
     * Action: Run Test Step
     * @param cssSelector {string}
     * @param stepCode {string}
     * @param route {string}
     */
    private async runStep(cssSelector: string, stepCode: string, route: string) {
        console.log(`${stepCode}->START->${cssSelector}`);
        try {
            // 1: Find element
            const element = await this.chromeDriver.findElement(By.css(cssSelector));

            // 2: Click element
            await element.click();

            /**
             * 3: Validate click
             */
            // 3.1: Set up clicked URL
            const url = new URL(await this.chromeDriver.getCurrentUrl());

            // 3.1: Domain Check - Homeweb
            if (url.origin === HOMEWEB_DOMAIN) {
                if (url.pathname == route) {
                    // 4: Test - Pass
                    this.passed += 1;
                    const success_message = `${stepCode}->success\n`;
                    await appendFile(this.logFilename, success_message);
                }
            }
            // 3.2: Domain Check - Homewood API
            else if (url.origin === HOMEWOOD_API_DOMAIN) {
                if ( url.pathname == route ) {
                    this.passed += 1;
                    const success_message = `${stepCode}->success\n`;
                    await appendFile( this.logFilename, success_message );
                }
            }
            // 3.3: Domain Check - UNKNOWN
            else {
                throw new Error('UNKNOWN ORIGIN')
            }
        }
        catch (error: any) {
            // 5: Test - Fail
            this.failed += 1;
            const fail_message = `${stepCode}->onFailure ${error}\n`;
            console.log(fail_message);
            await appendFile(this.logFilename, fail_message);
        }
        finally {
            // 6: Reset browser state
            this.testTotal += 1;
            console.log(`${stepCode}->END`);
            await this.reset();
        }
    }// End of runStep()

    /**
     * Action: Run Header Tests
     */
    public async runTests() {
        const startMessage = `Header::runTests::targetURL->${this.targetURL}\n`
        console.log(startMessage)
        this.startTime = Date.now();

        try {
            await appendFile(this.logFilename, startMessage);

            // 1: Test - Start
            // Reset browser state to ensure header elements can be found
            await this.reset();
            const header = await this.chromeDriver.findElement(By.css(TAG.HEADER));
            if (header) {
                // 2: Test - Homeweb Logo
                await this.runStep(
                    this.LABEL_LOGO,
                    this.ID_LOGO,
                    this.ROUTE_LOGO
                );

                // 3: Test - Language Toggle
                await this.runStep(
                    this.LABEL_TOGGLE,
                    this.ID_TOGGLE,
                    this.ROUTE_TOGGLE
                );

                // 4: Test - Sign In Button
                await this.runStep(
                    this.LABEL_BUTTON,
                    this.ID_BUTTON,
                    this.ROUTE_BUTTON
                );

                // 5: Test - Finish
                await this.chromeDriver.sleep(CLICK_DELAY);
                await this.finish();
            }

        } catch (error: any) {
            const fail_message = `Header::runTests->onFailure\n${error}\n`;
            console.log(fail_message)
            await appendFile(this.logFilename, fail_message);
        }
    }// End of runTests()

    /**
     * Action: Finish Tests
     * Set up statistics and results for logging
     */
    private async finish() {
        const endTime = Date.now();
        const totalTime = endTime - this.startTime;

        // 1: Set up summary
        const summary = generateSummary(
            this.testTotal,
            this.passed,
            this.failed,
            totalTime
        );

        // 2: Log results
        console.log('Header::finish\n')
        await appendFile(this.logFilename, summary);
    }// End of finish()

    /**
     * Action: Reset - Browser State
     */
    private async reset() {
        // 1: Check to ensure browser is looking at the correct window
        if ( this.originalWindow ) {
            await this.chromeDriver.switchTo().window( this.originalWindow );
        }

        // 2: Navigate back to initial target
        await this.chromeDriver.get( this.targetURL );

        // 3: Scroll to the top of the page
        await this.chromeDriver.executeScript(
            'window.scrollTo(0, 0);'
        );
    }// End of reset()
}// End of class
// End of file
