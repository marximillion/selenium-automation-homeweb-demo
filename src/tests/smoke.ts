import { Header } from './common/Header';

/**
 * Main
 */
async function main() {
    try {
        /**
         * 1: Header Tests
         */

        // 1.1: EN
        const header_en = new Header('en');
        await header_en.runTests();

        // 1.2: FR
        const header_fr = new Header('fr');
        await header_fr.runTests();
    }
    catch (error: any) {
        console.error('MAIN->onFailure', error);
    }
}
main()

