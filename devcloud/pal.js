import {chromium} from 'playwright-chromium'
import process from 'process'

const browser = await chromium.launch({executablePath:'package/opt/google/chrome/google-chrome', args:['--disable-blink-features=AutomationControlled'], headless:true})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
const context = await browser.newContext()
const alexamaster = await context.newPage()
const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto(`https://www.alexamaster.net/ads/autosurf/${process.env.alexamaster}`)])
await popup.bringToFront()
