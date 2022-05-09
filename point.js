import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled', '--start-maximized'], headless:false})
const context = await browser.newContext({recordVideo:{dir:'videos'}, viewport:null})
await context.addCookies([
  {
    name: 'am_auto_login',
    value: '%C6%1B%23%3B%12%87%BEf%40%20id%E5%14%DD%F6%3A%29%87%5E%949k%C6%7C%5E%27%C6%AE%02%A8%9Ew',
    domain: 'www.alexamaster.net',
    path: '/',
  }
])

const alexamaster = await context.newPage()
await alexamaster.goto('https://www.alexamaster.net/dashboard/earn/vote')
await alexamaster.click('input#btn-validate')
await alexamaster.waitForNavigation()
await alexamaster.goto('https://www.alexamaster.net/dashboard/earn/vote')
while (true)
{
    const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), await alexamaster.click('input#code')])
    await popup.bringToFront()
    await alexamaster.waitForTimeout(1000 * (5 + await alexamaster.locator('i.fas.fa-clock >> xpath=..').textContent().then(_ => globalThis.Number(_.split(' ').at(1)))))
    const select = alexamaster.locator('select[id]')
    await select.selectOption('77')
    await popup.close()
    await alexamaster.click('input#btn-send')
    await alexamaster.waitForNavigation()
}
await browser.close()
