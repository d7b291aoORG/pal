import {chromium} from 'playwright-chromium'

export default async function (context, req)
{
    const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome', args:['--disable-gpu']})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
    const context = await browser.newContext()
    const alexamaster = await context.newPage()
    await alexamaster.goto('https://www.alexamaster.net/Master/157701')
    return {body:'playwright'}
}
