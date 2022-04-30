import {chromium} from 'playwright-chromium'
import process from 'process'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
const context = await browser.newContext({recordVideo:{dir:'videos'}})
const page = await context.newPage()
await page.goto('https://console.paperspace.com/login')
await page.fill('input#input-email', 'chaowen.guo1@gmail.com')
await page.fill('input#input-password', process.argv.at(2))
await page.click('button#button-login')
await page.goto('https://console.paperspace.com/tepf5eo4v/notebook/rtv2243wnyf6cyy?file=paperspace.ipynb')
await page.waitForTimeout(1000)
await page.click('svg[data-integration-test="sidebar-instance"]')
await page.fill('input[name="shutdownTimeout"]', '6 Hours')
await page.click('button[data-integration-test="instance-state-Stopped"]')
await page.waitForTimeout(1000 * 60)
await browser.close()
