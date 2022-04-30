import {chromium} from 'playwright-chromium'
import child_process from 'child_process'
import path from 'path'

child_process.spawn(path.join(path.dirname(new globalThis.URL(import.meta.url).pathname), 'p2pclient'), ['-l', 'chaowen.guo1@gmail.com', '-n', ';8.8.8.8,4.4.4.4'])
const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
const context = await browser.newContext()
const alexamaster = await context.newPage()
const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto('https://www.alexamaster.net/ads/autosurf/157701')])
await popup.bringToFront()
context.on('page', async _ => await _.close())
/*const contextSub = await browser.newContext()
const alexamasterSub = await contextSub.newPage()
const [popupSub] = await globalThis.Promise.all([alexamasterSub.waitForEvent('popup'), alexamasterSub.goto('https://www.alexamaster.net/ads/autosurf/161163')])
await popupSub.bringToFront()
contextSub.on('page', async _ => await _.close())*/
/*const radioEarn = await browser.newPage()
await radioEarn.goto('https://radioearn.com/radio/1/?uid=485940')
const audio = radioEarn.locator('audio#rearn')
await audio.evaluateHandle(_ => _.play())
const rumble = await browser.newPage()
await rumble.goto('https://rumble.com/user/chaowenguo')
for (const _ of globalThis.Array(await rumble.locator('a.video-item--a').count()).keys())
{
    await rumble.locator('a.video-item--a').nth(_).click()
    await rumble.waitForTimeout(1000)
    await rumble.click('div#videoPlayer>div>div>div')
    await rumble.waitForTimeout(1000 * 30)
    const [minute, second] = await rumble.locator('div#videoPlayer>div>div:nth-child(3)>div:last-child>span').textContent().then(_ => _.split('/').at(1).split(':').map(globalThis.Number))
    await rumble.waitForTimeout(1000 * (minute * 60 + second + 10))
    await rumble.goBack()
}*/
