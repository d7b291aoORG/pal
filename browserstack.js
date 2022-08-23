import {chromium} from 'playwright-chromium'
import child_process from 'child_process'
import process from 'process'

class Browserstack
{
    static caps =
    {
        browser:'chrome',
        os:'windows',
        os_version:'11',
        'browserstack.username':'chaowenguo_cbiyNg',
        'browserstack.accessKey':'C6QuEssETZeWVa2pwWbf',
        'browserstack.idleTimeout':'300',
        'client.playwrightVersion':child_process.spawnSync('npx', ['playwright', '--version']).stdout.toString().trim().split(' ').at(-1) // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
    }

    static async session(binder)
    {
        const browser = await chromium.connect({wsEndpoint:`wss://cdp.browserstack.com/playwright?caps=${globalThis.encodeURIComponent(globalThis.JSON.stringify(this.caps))}`})
        globalThis.setTimeout(async () => await browser.close(), 1000 * 60 * 110)
        const context = await browser.newContext()
        const alexamaster = await context.newPage()
        const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto('https://www.alexamaster.net/ads/autosurf/180060')])
        await popup.bringToFront()
        globalThis.setInterval(async () => await alexamaster.content(), 1000 * 15)
        if (binder)
        {
            binder = await context.newPage()
            await binder.goto(`https://mybinder.org/v2/gh/r1nnyorg/pal/HEAD`)
            await binder.dblclick('li[title^="Name: pal.ipynb"]', {timeout:0})
            await binder.click('button[data-command="runmenu:restart-and-run-all"]')
            await binder.click('button.jp-mod-accept')
        }
        context.on('page', async () => {if (context.pages().length > 2 + globalThis.Object.is(typeof binder, 'object')) await context.pages().at(-2).close()})
    }
}

class Lambdatest
{
    static caps =
    {
        browserName:'Chrome',
        'LT:Options':
        {
            platform:'Windows 11',
            user:'chaowen.guo1',
            accessKey:'gFtHgRhVSZxvqIrSBKUaximDHVY5kIBOo79YA5YFczRX7HjKoi',
            idleTimeout:'1800'
        }
     }
     
     static async session()
     {
         const browser = await chromium.connect({wsEndpoint:`wss://cdp.lambdatest.com/playwright?capabilities=${globalThis.encodeURIComponent(globalThis.JSON.stringify(this.caps))}`})
         const context = await browser.newContext()
         const alexamaster = await context.newPage()
         const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto('https://www.alexamaster.net/ads/autosurf/179036')])
         await popup.bringToFront()
         globalThis.setInterval(async () => await alexamaster.content(), 1000 * 60 * 20)
     }
}

async function point()
{
    const browser = await chromium.connect({wsEndpoint:`wss://cdp.browserstack.com/playwright?caps=${globalThis.encodeURIComponent(globalThis.JSON.stringify(caps))}`})
    const context = await browser.newContext()
    await context.addCookies([
    {
        name: 'am_auto_login',
        value: '%CC6f%22%86B%D6%17q%9E%8E%D6%08%07m%21%3A%B0%83%E9%C1%0F%00%F7.%89%FE%CD%3E0%90%2Fj',
        domain: 'www.alexamaster.net',
        path: '/',
    }])
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
}

await globalThis.Promise.all([...globalThis.Array.from({length:4}, () => Browserstack.session(false)), Browserstack.session(true)])
