/* MDG 2026 */

/**
 * Imports
 */
import { Browser, Builder, By, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { personal, demo } from '../CREDENTIALS.json';
import { FIND, HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR, ID, LANGUAGE, TAG, TIMEOUT } from '../src/common/Constants';
import { PublicLanding } from '../src/tests/PublicLanding';
import { ElementType } from '../src/types/ElementType';
import { translate } from '../src/common/Utility';
import { Login } from '../src/Login';
import { Authenticated } from '../src/tests/Authenticated';
import { Header } from '../src/tests/Header';

/**
 * Interfaces
 */
// Public Landing
interface PublicLandingElements {
    resource_neurodiversity: ElementType,
    resource_emotional_intelligence: ElementType,
    resource_anxiety: ElementType,
    resource_toolkit: ElementType,
    button_sign_in: ElementType
}

// Login
interface LoginElements {
    input_email: ElementType,
    input_password: ElementType,
    button_next: ElementType,
    button_sign_in: ElementType
}

// Authenticated
interface AuthenticatedElements {
    button_access_sentio: ElementType;
    button_access_childcare: ElementType;
    button_access_eldercare: ElementType;
    button_access_hra: ElementType;
    button_consent: ElementType;
}

interface AuthenticatedHeaderElements {
    button_menu: ElementType
    button_logout: ElementType;
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

    let PUBLIC_LANDING_EN: PublicLanding;
    let PUBLIC_LANDING_ELEMENTS: PublicLandingElements;

    let LOGIN_EN: Login;
    let LOGIN_ELEMENTS: LoginElements;

    let AUTHENTICATED_EN: Authenticated;
    let AUTHENTICATED_ELEMENTS: AuthenticatedElements;

    let AUTHENTICATED_HEADER_EN: Header;
    let AUTHENTICATED_HEADER_ELEMENTS: AuthenticatedHeaderElements;

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

    // 4: Tests - English
    describe('EN', () => {
        // 4.1: Initialize variables
        beforeAll(() => {
            target = HOMEWEB_LANDING_URL_EN;
            locale = LANGUAGE.ENGLISH;
        });

        // 4.2: Tests - Homeweb
        describe('Homeweb', () => {
            // 4.2.1: Test - Navigate to Homeweb Landing page
            test(translate('bat_id_navigate'), async () => {
                await chromeDriver.get(target);
                window = await chromeDriver.getWindowHandle();
                await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)))
            });

            // 4.2.2: Tests - Public Landing
            describe('Public Landing', () => {
                jest.setTimeout(TIMEOUT.S_FIFTEEN);

                // 4.2.2.1: Set up public landing page elements
                beforeAll(() => {
                    PUBLIC_LANDING_EN = new PublicLanding(locale, chromeDriver, target, window);
                    PUBLIC_LANDING_ELEMENTS = {
                        resource_neurodiversity: {
                            id: translate('public_landing_id_resource_1'),
                            identifier: translate('public_landing_identifier_resource_1'),
                            route: translate('public_landing_route_resource_1')
                        },
                        resource_emotional_intelligence: {
                            id: translate('public_landing_id_resource_2'),
                            identifier: translate('public_landing_identifier_resource_2'),
                            route: translate('public_landing_route_resource_2')
                        },
                        resource_anxiety: {
                            id: translate('public_landing_id_resource_3'),
                            identifier: translate('public_landing_identifier_resource_3'),
                            route: translate('public_landing_route_resource_3')
                        },
                        resource_toolkit: {
                            id: translate('public_landing_id_toolkit'),
                            identifier: translate('public_landing_identifier_toolkit'),
                            route: translate('public_landing_route_toolkit')
                        },
                        button_sign_in: {
                            id: translate('public_landing_id_sign_in'),
                            identifier: translate('public_landing_identifier_sign_in'),
                            route: translate('public_landing_route_sign_in')
                        }
                    };
                });

                // 4.2.2.2: Test - Resources
                test(translate('bat_id_resources'), async () => {
                    await PUBLIC_LANDING_EN.testResource(PUBLIC_LANDING_ELEMENTS.resource_neurodiversity, FIND.CSS);
                    await PUBLIC_LANDING_EN.testResource(PUBLIC_LANDING_ELEMENTS.resource_emotional_intelligence, FIND.CSS);
                    await PUBLIC_LANDING_EN.testResource(PUBLIC_LANDING_ELEMENTS.resource_anxiety, FIND.CSS);
                    await PUBLIC_LANDING_EN.testResource(PUBLIC_LANDING_ELEMENTS.resource_toolkit, FIND.TEXT);
                });
            });

            // 4.2.3: Tests - Login
            describe ('Login - Personal', () => {
                jest.setTimeout(TIMEOUT.S_FIFTEEN);

                // 4.2.3.1: Set up login page elements
                beforeAll(() => {
                    LOGIN_EN = new Login(locale, chromeDriver, target, window);
                    LOGIN_ELEMENTS = {
                        input_email: {
                            id: translate('login_id_email'),
                            identifier: ID.EMAIL,
                        },
                        input_password: {
                            id: translate('login_id_password'),
                            identifier: ID.PASSWORD,
                        },
                        button_next: {
                            id: translate('login_id_next'),
                            identifier: translate('login_identifier_button'),
                        },
                        button_sign_in: {
                            id: translate('login_id_sign_in'),
                            identifier: translate('login_identifier_button'),
                            route: translate('login_sign_in_route')
                        }
                    }
                });

                // 4.2.2.2: Test - Personal Login
                test(translate('bat_id_login_personal'), async () => {
                    await PUBLIC_LANDING_EN.testButton(PUBLIC_LANDING_ELEMENTS.button_sign_in);
                    await LOGIN_EN.testInput(LOGIN_ELEMENTS.input_email, personal.email);
                    await LOGIN_EN.testButton(LOGIN_ELEMENTS.button_next);
                    await LOGIN_EN.testInput(LOGIN_ELEMENTS.input_password, personal.password);
                    await LOGIN_EN.testButton(LOGIN_ELEMENTS.button_sign_in);
                })
            })

            // 4.2.4: Tests - Authenticated
            describe ('Authenticated - Personal', () => {
                jest.setTimeout(TIMEOUT.S_FIFTEEN);

                // 4.2.4.1: Set up authenticated elements
                beforeAll(() => {
                    AUTHENTICATED_EN = new Authenticated(locale, chromeDriver, target, window);
                    AUTHENTICATED_HEADER_EN = new Header(locale, chromeDriver, target, window);
                    AUTHENTICATED_ELEMENTS = {
                        button_access_sentio: {
                            id: translate('authenticated_id_access_sentio'),
                            identifier: translate('authenticated_identifier_access_sentio'),
                        },
                        button_access_childcare: {
                            id: translate('authenticated_id_access_childcare'),
                            identifier: translate('authenticated_identifier_access_childcare'),
                        },
                        button_access_eldercare: {
                            id: translate('authenticated_id_access_eldercare'),
                            identifier: translate('authenticated_identifier_access_eldercare'),
                        },
                        button_access_hra: {
                            id: translate('authenticated_id_access_hra'),
                            identifier: translate('authenticated_identifier_access_hra'),
                        },
                        button_consent: {
                            id: translate(''),
                            identifier: translate('')
                        }
                    };
                    AUTHENTICATED_HEADER_ELEMENTS = {
                        button_menu: {
                            id: translate('header_id_menu'),
                            identifier: translate('header_identifier_menu')
                        },
                        button_logout: {
                            id: translate('header_id_logout'),
                            identifier: translate('header_identifier_logout'),
                            route: translate('header_route_logout')
                        }
                    }
                });

                // 4.2.4.1: Test - Resource
                test(translate('bat_id_authenticated_resource'), async () => {
                    const resource_target = "https://homeweb.ca/user/articles/56252b81e40e6f50062aa714";
                    await chromeDriver.get(resource_target);
                    await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)));
                });

                // 4.2.4.2: Test - Sentio kick out
                test(translate('bat_id_sentio'), async () => {
                    const sentio_resource_target = "https://homeweb.ca/app/en/resources/62c5a1e929ed9c1608d0434b";
                    await chromeDriver.get(sentio_resource_target);
                    await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)));
                    await AUTHENTICATED_EN.testButton(AUTHENTICATED_ELEMENTS.button_access_sentio);
                });

                // 4.2.4.3: Test - Logout
                test(translate('bat_id_logout'), async () => {
                    await AUTHENTICATED_HEADER_EN.testMenu(AUTHENTICATED_HEADER_ELEMENTS.button_menu);
                    await AUTHENTICATED_HEADER_EN.testLogout(AUTHENTICATED_HEADER_ELEMENTS.button_logout);
                });
            })

            // 4.2.5: Tests - Login
            describe ('Login - Demo', () => {
                jest.setTimeout(TIMEOUT.S_FIFTEEN);

                // 4.2.5.1: Test - Demo Login
                test(translate('bat_id_login_demo'), async () => {
                    await PUBLIC_LANDING_EN.testButton(PUBLIC_LANDING_ELEMENTS.button_sign_in);
                    await LOGIN_EN.testInput(LOGIN_ELEMENTS.input_email, demo.email);
                    await LOGIN_EN.testButton(LOGIN_ELEMENTS.button_next);
                    await LOGIN_EN.testInput(LOGIN_ELEMENTS.input_password, demo.password);
                    await LOGIN_EN.testButton(LOGIN_ELEMENTS.button_sign_in);
                })
            })

            // 4.2.6: Tests - Authenticated
            describe ('Authenticated - Demo', () => {
                jest.setTimeout(TIMEOUT.S_THIRTY);

                // 4.2.4.1: Test - Kick outs
                test(translate('bat_id_kickouts'), async () => {
                    // Child Care
                    const childcare_resource_target = "https://homeweb.ca/app/en/resources/579ba4db88db7af01fe6ddd4";
                    await chromeDriver.get(childcare_resource_target);
                    await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)));
                    await AUTHENTICATED_EN.testButton(AUTHENTICATED_ELEMENTS.button_access_childcare);

                    // Elder Care
                    const eldercare_resource_target = "https://homeweb.ca/app/en/resources/579ba49a88db7af01fe6ddc8";
                    await chromeDriver.get(eldercare_resource_target);
                    await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)));
                    await AUTHENTICATED_EN.testButton(AUTHENTICATED_ELEMENTS.button_access_eldercare);

                    // Health Risk Assessment
                    const hra_resource_target = "https://homeweb.ca/app/en/resources/579ba53088db7af01fe6dde6";
                    await chromeDriver.get(hra_resource_target);
                    await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)));
                    await AUTHENTICATED_EN.testButton(AUTHENTICATED_ELEMENTS.button_access_hra);
                });

                // 4.2.4.2: Test - Course Consent
                test(translate('bat_id_course'), async () => {
                    const course_target = "https://homeweb.ca/app/en/resources/564a36083392100756dd3e32";
                    await chromeDriver.get(course_target);
                    await chromeDriver.wait(until.elementLocated(By.id(ID.CONTENT)));
                    // TODO
                });

            });
        });

        // describe('Customer Portal', () => {
        //     test('BAT-WEB-010', async () => {
        //         // TODO: Customer Portal
        //     })
        //
        //     test('BAT-WEB-011', async () => {
        //         // TODO: Login
        //     })
        // })
    });
});
