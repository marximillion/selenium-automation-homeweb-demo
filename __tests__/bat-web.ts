/* MDG 2026 */

/**
 * Imports
 */
import { Browser, Builder, By, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import credentials from '../CREDENTIALS.json';
import { FIND, HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR, ID, LANGUAGE, TAG, TIMEOUT } from '../src/common/Constants';
import { PublicLanding } from '../src/tests/PublicLanding';
import { ElementType } from '../src/types/ElementType';
import { translate } from '../src/common/Utility';
import { Login } from '../src/Login';

/**
 * Interfaces
 */
interface ResourceElements {
    neurodiversity: ElementType,
    emotional_intelligence: ElementType,
    anxiety: ElementType,
    toolkit: ElementType
}

interface LoginElements {
    email: ElementType,
    password: ElementType,
    next: ElementType,
    sign_in: ElementType
}

/**
 * Test Suite: Build Acceptance Test
 */
describe ('Build Acceptance Test', () => {
    jest.setTimeout(TIMEOUT.M_FIVE);

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
            });

            let PUBLIC_LANDING_EN: PublicLanding;
            let RESOURCES: ResourceElements;

            let LOGIN_EN: Login;
            let LOGIN: LoginElements;

            // 4.2.2: Public Landing - Tests
            describe('Public Landing', () => {
                jest.setTimeout(TIMEOUT.S_FIFTEEN);

                // 4.2.2.1: Set up public landing page elements
                beforeAll(() => {
                    PUBLIC_LANDING_EN = new PublicLanding(locale, chromeDriver, target, window);
                    RESOURCES = {
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
                });

                // 4.2.2.2: Resources - Test
                test(translate('bat_id_resources'), async () => {
                    await PUBLIC_LANDING_EN.testResource(RESOURCES.neurodiversity, FIND.CSS);
                    await PUBLIC_LANDING_EN.testResource(RESOURCES.emotional_intelligence, FIND.CSS);
                    await PUBLIC_LANDING_EN.testResource(RESOURCES.anxiety, FIND.CSS);
                    await PUBLIC_LANDING_EN.testResource(RESOURCES.toolkit, FIND.TEXT);
                });
            });

            // 4.2.3: Login - Tests
            describe ('Login', () => {
                jest.setTimeout(TIMEOUT.S_THIRTY);

                // 4.2.3.1: Set up login page elements
                beforeAll(() => {
                    // PUBLIC_LANDING_EN = new PublicLanding(locale, chromeDriver, target, window);
                    LOGIN_EN = new Login(locale, chromeDriver, target, window);
                    LOGIN = {
                        email: {
                            id: translate('login_id_email'),
                            identifier: ID.EMAIL,
                        },
                        password: {
                            id: translate('login_id_password'),
                            identifier: ID.PASSWORD,
                        },
                        next: {
                            id: translate('login_id_next'),
                            identifier: translate('login_identifier_button'),
                        },
                        sign_in: {
                            id: translate('login_id_sign_in'),
                            identifier: translate('login_identifier_button'),
                            route: translate('login_sign_in_route')
                        }
                    }
                });

                // 4.2.2.2: Login - Test
                test(translate('bat_id_login'), async () => {
                    await PUBLIC_LANDING_EN.testLogin();
                    await LOGIN_EN.testInput(LOGIN.email, credentials.email);
                    await LOGIN_EN.testButton(LOGIN.next);
                    await LOGIN_EN.testInput(LOGIN.password, credentials.password);
                    await LOGIN_EN.testButton(LOGIN.sign_in);

                })
            })

        })
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
