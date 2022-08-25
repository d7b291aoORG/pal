import {chromium} from 'playwright-chromium'
import child_process from 'child_process'
import webdriverio from 'webdriverio'
import process from 'process'

process.on('uncaughtException', _ => _)

async function browserstack(binder)
{
    const caps =
    {
        browser:'chrome',
        os:'windows',
        os_version:'11',
        'browserstack.username':'chaowenguo_cbiyNg',
        'browserstack.accessKey':'C6QuEssETZeWVa2pwWbf',
        'browserstack.idleTimeout':300,
        'client.playwrightVersion':child_process.spawnSync('npx', ['playwright', '--version']).stdout.toString().trim().split(' ').at(-1) // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
    }
    const browser = await chromium.connect({wsEndpoint:`wss://cdp.browserstack.com/playwright?caps=${globalThis.encodeURIComponent(globalThis.JSON.stringify(caps))}`}) 
    const context = await browser.newContext()
    const alexamaster = await context.newPage()
    const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto('https://www.alexamaster.net/ads/autosurf/180120')])
    globalThis.setInterval(async () => await alexamaster.content(), 1000 * 5)
    await popup.bringToFront()
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

async function browserstackApp()
{
    const opts =
    {
        protocol:'https',
        hostname:'hub-cloud.browserstack.com',
        path:'/wd/hub',
        user:'chaowenguo_cbiyNg',
        key:'C6QuEssETZeWVa2pwWbf',
        capabilities:
        {
	    deviceName:'Samsung Galaxy Tab S8',
            os_version:'12.0',
	    app:'bs://2ffa9a02d49e56eb5bf9d2408731b65bfb02b477',
            autoGrantPermissions:true,
            'browserstack.idleTimeout':300
        }
    }
    const client = await webdriverio.remote(opts)
    const continue_button = await client.$('id=com.android.permissioncontroller:id/continue_button')
    await continue_button.click()
    const ok = await client.$('id=android:id/button1')
    await ok.click()
    const message_primary_button = await client.$('id=com.android.chrome:id/message_primary_button')
    await message_primary_button.click()
    const contexts = await client.getContexts()
    await client.switchContext(contexts.at(1))
    globalThis.setInterval(async () =>
    {
	for (const _ of await client.getWindowHandles())
	    if (!globalThis.Object.is(_, 'CDwindow-0'))
	    {
                await client.switchToWindow(_)
                await client.closeWindow()
	    }
    }, 1000 * (opts['browserstack.idleTimeout'] - 100))
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
         const browser = await chro1mium.connect({wsEndpoint:`wss://cdp.lambdatest.com/playwright?capabilities=${globalThis.encodeURIComponent(globalThis.JSON.stringify(this.caps))}`})
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

await globalThis.Promise.allSettled([...globalThis.Array.from({length:4}, () => [browserstack(false), browserstackApp()]).flat(), browserstack(true), browserstackApp()])
