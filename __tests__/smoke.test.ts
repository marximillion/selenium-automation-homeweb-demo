import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { HOMEWEB_LANDING_URL_EN, LANGUAGE } from '../src/common/Constants';
import { Header } from '../src/tests/general/Header';

describe ('Smoke Tests', () => {
    // console.log('Smoke->START\n');

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
    })

    // 3: Runs once AFTER ALL tests
    afterAll(async () => {
        await chromeDriver.quit();
    })

    // 4: EN - Tests
    describe('EN Tests', () => {
        // 4.1: Initialize variables
        beforeAll(() => {
            target = HOMEWEB_LANDING_URL_EN;
            locale = LANGUAGE.ENGLISH;
        });

        // 4.2: Navigate to EN target and retrieve window handle
        beforeEach(async() => {
            await chromeDriver.get(target);
            window = await chromeDriver.getWindowHandle();
        })

        // 4.3: Header
        test('HEADER->SUCCESS', async () => {
            const header_en = new Header(locale, chromeDriver, target);
            // await header_en.runTests(); // contains assertions
        });
    })
});
