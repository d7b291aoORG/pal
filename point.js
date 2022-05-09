import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled', '--start-maximized'], headless:false})
const context = await browser.newContext({recordVideo:{dir:'videos'}, viewport:null})
await context.addCookies([
  {
    name: 'am_auto_login',
    value: '%15a%88%60%F3%FDx%DD9K%93w%E9E%7C%D0%3A%2C%22%F6%C0f%93Q%F4%15%5D%3A%95V5%B5%F8',
    domain: 'www.alexamaster.net',
    path: '/',
  }
])

const alexamaster = await context.newPage()
await alexamaster.goto('https://www.alexamaster.net/dashboard/earn/vote')
for (const _ of globalThis.Array(3).keys())
{
    const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), await alexamaster.click('input#code')])
    await popup.bringToFront()
    await alexamaster.waitForTimeout(60 * 1000)
    const select = alexamaster.locator('select')
    await select.selectOption('77')
    await popup.close()
    await alexamaster.click('input#btn-send')
    await alexamaster.waitForNavigation()
}
await browser.close()
