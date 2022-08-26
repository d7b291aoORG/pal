import {chromium} from 'playwright-chromium'
import process from 'process'

const browser = await chromium.launch({executablePath:'package/opt/google/chrome/google-chrome', args:['--disable-blink-features=AutomationControlled', '--start-maximized'], headless:true})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
const context = await browser.newContext({recordVideo:{dir:'videos'}, viewport:null})
const alexamaster = await context.newPage()
const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto(`https://www.alexamaster.net/ads/autosurf/${process.env.alexamaster}`)])
await popup.bringToFront()
const youtube = await context.newPage()
await youtube.goto('https://www.youtube.com/watch?v=BEfl9ZjCWrQ')
const moviePlayer = await youtube.locator('div#movie_player')
await moviePlayer.evaluateHandle(_ => _.style.display = 'block')
await moviePlayer.waitFor()
await moviePlayer.evaluateHandle(_ => _.playVideo())
const dailymotion = await context.newPage()
for (const _ of globalThis.Array(10).keys())
{
    await dailymotion.goto('https://www.dailymotion.com/video/x87ytjz')
    await dailymotion.waitForTimeout(1000 * 60 * 60)
}
