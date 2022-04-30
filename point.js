import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled', '--start-maximized'], headless:false})
const context = await browser.newContext({recordVideo:{dir:'videos'}, viewport:null})
await context.addCookies([
  {
    name: 'am_auto_login',
    value: '%7De%97%05%D7K%1C%D9%B6i%EFU3E%C0%D9%3A%BEk%D7%3Ec%EB%FA%E3%A6%9F%BB0%99%E9%7D%EA',
    domain: 'www.alexamaster.net',
    path: '/',
  }
])

const alexamaster = await context.newPage()
await alexamaster.goto('https://www.alexamaster.net/a/earn_points.php')
const fall = alexamaster.locator('ul#fall')
await fall.locator(':scope>li').last().scrollIntoViewIfNeeded()
await alexamaster.waitForTimeout(5 * 1000)
const li = fall.locator(':scope>li').nth(5)
while (await li.count())
{
    await fall.locator(':scope>li').last().scrollIntoViewIfNeeded()
    const title = li.locator('a[data-original-title]').first()
    if (await title.count() && globalThis.Object.is(await title.getAttribute('data-original-title'), 'Play Video'));
    /*{  
	const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), title.click()])
	await popup.bringToFront()
        await alexamaster.waitForTimeout(50 * 1000)
        const moviePlayer = popup.locator('div#movie_player')
        await moviePlayer.evaluateHandle(_ => _.style.display = 'block')
	try
	{
	    await moviePlayer.waitFor()
            const duration = globalThis.Math.floor(await moviePlayer.evaluateHandle(_ => _.getDuration()).then(_ => _.jsonValue()))
            await popup.close()
            let option = [null, globalThis.Number.POSITIVE_INFINITY]
	    const select = alexamaster.locator('select#vlen')
            for (const _ of await select.locator(':scope>option').evaluateAll(_ => _.map(_ => _.getAttribute('value'))))
            {
                const [hour, minute, second] = _.split(':').map(globalThis.Number)
	        const distance = globalThis.Math.abs(hour * 3600 + minute * 60 + second - duration)
                if (distance < option[1]) option = [_, distance]
	    }
	    if (option.at(1)) await alexamaster.click('button.swal2-cancel')
	    else
	    {
                 await select.selectOption(option.at(0))
	         await alexamaster.click('button.swal2-confirm')
	    }
	}
	catch
	{
            await popup.close()
	    await alexamaster.click('button.swal2-cancel')
	}
    }*/
    else if (await title.count() && globalThis.Object.is(await title.getAttribute('data-original-title'), 'Open Website'))
    {
        const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), title.click()])
	await popup.bringToFront()
        await alexamaster.waitForTimeout(30 * 1000)
	try
	{
	    const color = await popup.evaluate(() => globalThis.getComputedStyle(globalThis.document.body).getPropertyValue('background-color').split('(')[1].split(')')[0].split(',').map(globalThis.Number))
	    await alexamaster.bringToFront()
            await alexamaster.click('button.swal2-confirm.btn-success', {timeout:0})
	    await popup.close()
            let option = [null, globalThis.Number.POSITIVE_INFINITY]
	    const select = alexamaster.locator('select#backcol')
            for (const _ of await select.locator(':scope>option').evaluateAll(_ => _.map(_ => _.getAttribute('value'))))
            {
	        const distance = globalThis.Math.hypot(..._.match(/.{2}/g).map(_ => globalThis.Number('0x' + _)).map((_, index) => _ - color[index]))
                if (distance < option.at(1)) option = [_, distance]
            }
            await select.selectOption(option.at(0))
	    await alexamaster.click('button.swal2-confirm')
	}
	catch
	{
	    await alexamaster.bringToFront()
            await alexamaster.click('button.swal2-confirm.btn-success', {timeout:0})
	    await popup.close()
	    await alexamaster.click('button.swal2-cancel')
	}
    }
    await li.evaluateHandle(_ => _.remove())
    await alexamaster.waitForTimeout(5 * 1000)
}
await browser.close()
