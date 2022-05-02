import {chromium} from 'playwright-chromium'
import process from 'process'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled', '--start-maximized'], headless:false})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
globalThis.setTimeout(async () => await browser.close(), 1000 * 60 * 60)
const binder = await browser.newPage({recordVideo:{dir:'videos'}, viewport:null})
await binder.goto(`https://mybinder.org/v2/gh/${process.env.GITHUB_REPOSITORY}/HEAD`)
await binder.dblclick('li[title^="Name: binder.ipynb"]', {timeout:0})

async function run()
{
    await binder.click('button[title="Restart the kernel, then re-run the whole notebook"]')
    await binder.click('button.jp-mod-accept')
}

await run()
globalThis.setInterval(async () =>
{
    try
    {
        await run()
    }
    catch
    {
        await binder.screenshot({path:'screenshot.png'})
        await browser.close()
        await process.exit(0)
    }
}, 1000 * 60 * 10)
