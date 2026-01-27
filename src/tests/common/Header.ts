import { appendFile } from 'node:fs/promises';
import { Browser, Builder, By, WebDriver } from 'selenium-webdriver';
import { CLICK_DELAY, HEADER, HOMEWEB_LANDING_URL_EN } from '../../Constants';
import { generateSummary, getLogFilename } from '../../utility/Utility';

export class Header {
    /**
     * Member Variables
     */
    private chromeDriver: WebDriver;
    private readonly logFilename: string;

    private totalTests: number = 3;
    private startTime: number = 0;

    private passCounter: number = 0;
    private failCounter: number = 0;


    /**
     * Constructor
     */
    constructor() {
        this.chromeDriver = new Builder().forBrowser(Browser.CHROME).build();
        this.logFilename = getLogFilename();
    }

    private async runStep(cssSelector: string, stepCode: string) {
        try {
            const element = await this.chromeDriver.findElement(By.css(cssSelector));
            await element.click();

            const message = `${stepCode}->success\n`;
            await appendFile(this.logFilename, message);
            this.passCounter += 1;
        } catch (error: any) {
            const message = `${stepCode}->onFailure ${error}\n`;
            await appendFile(this.logFilename, message);
            this.failCounter += 1;
        } finally {
            // Always reset to homepage
            await this.chromeDriver.get(HOMEWEB_LANDING_URL_EN);
        }
    }

    // TODO: FR tests
    public async run() {
        this.startTime = Date.now();
        try {
            await this.chromeDriver.get(HOMEWEB_LANDING_URL_EN);

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                HEADER.EN_LOGO,
                'HEADER-ANON-001'
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                HEADER.EN_TOGGLE,
                'HEADER-ANON-002'
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.runStep(
                HEADER.EN_BUTTON,
                'HEADER-ANON-003'
            );

            await this.chromeDriver.sleep(CLICK_DELAY);
            await this.finish();
        } catch (error: any) {
            await appendFile(this.logFilename, `HEADER::ERROR->${error}\n`);
            await this.chromeDriver.quit();
        }
    }

    private async finish() {
        const endTime = Date.now();
        const summary = generateSummary(
            this.totalTests,
            this.passCounter,
            this.failCounter,
            endTime - this.startTime
        );
        await appendFile(this.logFilename, summary);
        await this.chromeDriver.quit();
    }
}
