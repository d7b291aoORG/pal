import asyncio, playwright.async_api, pathlib

async def main():
    p2pclient = await asyncio.create_subprocess_exec(pathlib.Path(__file__).resolve().parent.joinpath('p2pclient'), '-l', 'chaowen.guo1@gmail.com', '-n', ';8.8.8.8,4.4.4.4')
    async with playwright.async_api.async_playwright() as _:
        while True:
            try:
                browser = await _.firefox.launch()
        #radioEarn = await browser.new_page()
        #await radioEarn.goto('https://radioearn.com/radio/1/?uid=485940')
        #audio = radioEarn.locator('audio#rearn')
        #await audio.evaluate('_ => _.play()')
        #print(await audio.evaluate('_ => _.id'), flush=True)
                context = await browser.new_context()
                alexamaster = await context.new_page()
                async with alexamaster.expect_popup() as popup:
                    await alexamaster.goto('https://www.alexamaster.net/ads/autosurf/157701')
                    child = await popup.value
                    await child.bring_to_front()
                async def close(_): _.close()
                context.on('page', close)
                rumble = await browser.new_page()
                await rumble.goto('https://rumble.com/user/chaowenguo')
                for _ in range(await rumble.locator('a.video-item--a').count()):
                    await rumble.locator('a.video-item--a').nth(_).click()
                    await asyncio.sleep(1)
                    await rumble.click('div#videoPlayer>div>div>div')
                    await asyncio.sleep(30)
                    await asyncio.sleep(sum(weight * int(time) for weight,time in zip((60, 1), (await rumble.locator('div#videoPlayer>div>div:nth-child(3)>div:last-child>span').text_content()).split('/')[1].split(':'))) + 10)
                    await rumble.go_back()
                await p2pclient.wait()
            except: await browser.close()

asyncio.run(main())
