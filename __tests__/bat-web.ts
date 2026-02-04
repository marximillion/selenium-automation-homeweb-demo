/* MDG 2026 */

/**
 * Imports
 */
import { Browser, Builder, By, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { FIND, HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR, ID, LANGUAGE, TAG } from '../src/common/Constants';
import { PublicLanding } from '../src/tests/PublicLanding';
import { ElementType } from '../src/types/ElementType';
import { translate } from '../src/common/Utility';

interface ResourceElements {
    neurodiversity: ElementType,
    emotional_intelligence: ElementType,
    anxiety: ElementType,
    toolkit: ElementType
}

describe ('Build Acceptance Test', () => {
    // 1: Declare variables
    let chromeDriver: WebDriver;
    let options: chrome.Options
    let window: string;
    let target: string;
    let locale: LANGUAGE

    // 2: Runs once BEFORE ALL tests
    beforeAll(async () => {
        // 2.1: Set up browser
        options = new chrome.Options();
        options.addArguments(
            '--incognito',
            // '--start-maximized',
        );
        chromeDriver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
        window = await chromeDriver.getWindowHandle();
    });

    // 3: Runs once AFTER ALL tests
    afterAll(async () => {
        await chromeDriver.quit();
    });

    // 4: English Tests
    describe('EN', () => {
        // 4.1: Initialize variables
        beforeAll(() => {
            target = HOMEWEB_LANDING_URL_EN;
            locale = LANGUAGE.ENGLISH;
        });

        // 4.2: Homeweb - Tests
        describe('Homeweb', () => {
            // 4.2.1: Navigate to Homeweb Landing page
            test(translate('bat_id_navigate'), async () => {
                await chromeDriver.get(target);
                window = await chromeDriver.getWindowHandle();
                await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)))
            })


            // 4.2.2: Public Landing - Tests
            describe('Public Landing', () => {
                // Default timeout for a describe() block is 5000ms.
                // Exceeding, will time out so set timeout to 30s to allow for enough time for this test block to run
                jest.setTimeout(15000);

                // 4.2.2.1: Always reset back to Homeweb Landing page
                beforeEach(async() => {
                    await chromeDriver.get(target);
                })

                // 4.2.2.2: Set up resource elements
                const RESOURCES: ResourceElements = {
                    neurodiversity: {
                        id: translate('public_landing_id_resource_1'),
                        identifier: translate('public_landing_identifier_resource_1'),
                        route: translate('public_landing_route_resource_1')
                    },
                    emotional_intelligence: {
                        id: translate('public_landing_id_resource_2'),
                        identifier: translate('public_landing_identifier_resource_2'),
                        route: translate('public_landing_route_resource_2')
                    },
                    anxiety: {
                        id: translate('public_landing_id_resource_3'),
                        identifier: translate('public_landing_identifier_resource_3'),
                        route: translate('public_landing_route_resource_3')
                    },
                    toolkit: {
                        id: translate('public_landing_id_toolkit'),
                        identifier: translate('public_landing_identifier_toolkit'),
                        route: translate('public_landing_route_toolkit')
                    }
                };

                // 4.2.2.3: Resources - Tests
                test(translate('bat_id_resources'), async () => {
                    const public_landing_en = new PublicLanding(locale, chromeDriver, target, window);
                    await public_landing_en.runStep(RESOURCES.neurodiversity, FIND.CSS);
                    await public_landing_en.runStep(RESOURCES.emotional_intelligence, FIND.CSS);
                    await public_landing_en.runStep(RESOURCES.anxiety, FIND.CSS);
                    await public_landing_en.runStep(RESOURCES.toolkit, FIND.TEXT);
                })

                // test('BAT-WEB-003', async () => {
                //     // TODO: Login
                // })
                //
                // test('BAT-WEB-004', async () => {
                //     // TODO: Validate article
                // })
                //
                // test('BAT-WEB-005', async () => {
                //     // TODO: Validate Sentio kick-out
                // })
                //
                // test('BAT-WEB-006', async () => {
                //     // TODO: Logout
                // })
                //
                // test('BAT-WEB-007', async () => {
                //     // TODO: Login different account
                // })
                //
                // test('BAT-WEB-008', async () => {
                //     // TODO: Validate kick outs (ChildCar, ElderCar, HRA)
                // })
                //
                // test('BAT-WEB-009', async () => {
                //     // TODO: Validate course consent
                // })
            })
        })

        // describe('Customer Portal', () => {
        //     test('BAT-WEB-010', async () => {
        //         // TODO: Customer Portal
        //     })
        //
        //     test('BAT-WEB-011', async () => {
        //         // TODO: Login
        //     })
        // })
    })
})
