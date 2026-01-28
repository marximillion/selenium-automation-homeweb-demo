/**
 * Imports
 */
import { Browser, Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { Footer } from './common/Footer';
import { Header } from './common/Header';
import { HEADER, HOMEWEB_LANDING_URL_EN, HOMEWEB_LANDING_URL_FR, LANGUAGE } from '../Constants';
import { generateReport } from '../Utility';

/**
 * Smoke - Test
 */
async function smoke() {
    console.log('smoke->START');

    /*
     * 1: Set up
     */
    // 1.1: Chrome options
    const options = new chrome.Options();
    options.addArguments(
        '--incognito',
        // '--start-maximized',
    );

    // 1.2 Variables
    const TARGET_URL_EN = HOMEWEB_LANDING_URL_EN;
    const TARGET_URL_FR = HOMEWEB_LANDING_URL_FR;
    let total = 0;
    let pass = 0;
    let fail = 0;

    // 2: Launch browser
    const chromeDriver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

    try {
        /**
         * 3: EN Tests
         */
        // 3.1: Navigate to EN target
        await chromeDriver.get(TARGET_URL_EN)

        // 3.2: Header
        const header_en = new Header(LANGUAGE.ENGLISH, chromeDriver, TARGET_URL_EN);
        await header_en.runTests();

        // 3.3: Footer
        const footer_en = new Footer(LANGUAGE.ENGLISH, chromeDriver, TARGET_URL_EN);
        await footer_en.runTests();

        /**
         * 4: FR Tests
         */
        // 4.1: Navigate to FR target
        await chromeDriver.get(TARGET_URL_FR)

        // 4.2: Header
        const header_fr = new Header(LANGUAGE.FRENCH, chromeDriver, TARGET_URL_FR);
        await header_fr.runTests();

        // 4.3: Footer
        const footer_fr = new Footer(LANGUAGE.FRENCH, chromeDriver, TARGET_URL_FR);
        await footer_fr.runTests();

        /**
         * 5: Generate Report
         */
        const total = header_en.totalTests + header_fr.totalTests + footer_en.totalTests + footer_fr.totalTests;
        const pass = header_en.passCounter + header_fr.passCounter + footer_en.passCounter + footer_fr.passCounter;
        const fail = header_en.failCounter + header_fr.failCounter + footer_en.failCounter + footer_fr.failCounter;

        console.log(generateReport(total, pass, fail));
    }
    catch (error: any) {
        console.log('smoke->onFailure', error);
    }
    finally {
        console.log('smoke->END');
    }
    await chromeDriver.quit()
}

smoke()

