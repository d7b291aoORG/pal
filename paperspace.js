import {chromium} from 'playwright-chromium'
import process from 'process'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled', '--start-maximized'], headless:false})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
const paperspace = await browser.newPage({recordVideo:{dir:'videos'}, viewport:null})
await paperspace.goto(`https://console.paperspace.com/login`)
await paperspace.fill('input[type="email"]', 'chaowen.guo0@gmail.com')
await paperspace.fill('input[type="password"]', process.argv.at(2))
await paperspace.click('button.c-jpjkst.c-jpjkst-kkVNWy-variant-cta')
await paperspace.waitForNavigation()
await paperspace.goto('https://console.paperspace.com/chaowenguo/notebook/r1d9hbe6l22h7qn?file=%2Fpal.ipynb')
await paperspace.waitForTimeout(1000 * 15)
await paperspace.click('button.c-jpjkst.c-jpjkst-kkVNWy-variant-cta')
await paperspace.click('button.c-hkYOW', {timeout:0})
await paperspace.waitForTimeout(1000 * 60 * 2)
await browser.close()
