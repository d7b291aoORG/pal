import {firefox} from 'playwright-firefox'
import child_process from 'child_process'

const caps =
{
    browser:'playwright-firefox',  // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    os:'windows',
    os_version:'11',
    'browserstack.username':'chaowenguo_cbiyNg',
    'browserstack.accessKey':'C6QuEssETZeWVa2pwWbf',
    'browserstack.idleTimeout':'300',
    'client.playwrightVersion':child_process.spawnSync('npx', ['playwright', '--version']).stdout.toString().trim().split(' ').at(-1) // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
}
const browser = await firefox.connect({wsEndpoint:`wss://cdp.browserstack.com/playwright?caps=${globalThis.encodeURIComponent(globalThis.JSON.stringify(caps))}`})
const context = await browser.newContext()
const alexamaster = await context.newPage()
const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto('https://www.alexamaster.net/ads/autosurf/157701')])
await popup.bringToFront()
const blank = await browser.newPage()
context.on('page', async _ => await _.close())
globalThis.setInterval(async _ => await blank.reload(), 1000 * 60)
