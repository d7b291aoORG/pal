import {firefox} from 'playwright-firefox'
import child_process from 'child_process'

const caps =
{
    browser:'playwright-firefox',  // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    os:'windows',
    os_version:'11',
    'browserstack.username':'chaowenguo_cbiyNg',
    'browserstack.accessKey':'C6QuEssETZeWVa2pwWbf',
    'browserstack.idleTimeout':'300',
    'client.playwrightVersion':child_process.spawnSync('npx', ['playwright', '--version']).stdout.toString().trim().split(' ').at(-1) // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
}

async function session()
{
    const browser = await firefox.connect({wsEndpoint:`wss://cdp.browserstack.com/playwright?caps=${globalThis.encodeURIComponent(globalThis.JSON.stringify(caps))}`})
    const context = await browser.newContext()
    const alexamaster = await context.newPage()
    const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.goto('https://www.alexamaster.net/ads/autosurf/157701')])
    await popup.bringToFront()
    //context.on('page', async _ => await _.close())
    globalThis.setInterval(async _ => await alexamaster.title(), 1000 * 60)
}

async function point()
{
    const browser = await firefox.connect({wsEndpoint:`wss://cdp.browserstack.com/playwright?caps=${globalThis.encodeURIComponent(globalThis.JSON.stringify(caps))}`})
    const context = await browser.newContext()
    await context.addCookies([
    {
        name: 'am_auto_login',
        value: 'hQ%FB%F6%09%D7%89%3B5%FD%D3%AD%0B%AA9N%3A%19u%F4%AB%B8%E8%894V%96%901%08%91%5EL',
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

await globalThis.Promise.all([...globalThis.Array.from({length:4}, (_, index) => session()), point()])
