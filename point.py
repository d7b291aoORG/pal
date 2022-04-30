import asyncio, playwright.async_api, cv2, numpy

async def main():
    async with playwright.async_api.async_playwright() as _:
        browser = await _.chromium.launch(channel='chrome', args=['--disable-blink-features=AutomationControlled'], headless=False)
        context = await browser.new_context(record_video_dir='videos')
        alexamaster = await context.new_page()
        await alexamaster.goto('https://www.alexamaster.net/sec/login.php')
        await alexamaster.fill('input[type="text"]', 'chaowen.guo1@gmail.com')
        await alexamaster.fill('input[type="password"]', 'HL798820y+')
        async with alexamaster.expect_navigation(): await alexamaster.click('input[type="submit"]')
        await alexamaster.locator('img[src="image.php"]').screenshot(path='haha.png')
        mat = cv2.imread('haha.png', 0)
        cv2.imwrite('haha.png', mat)
        await alexamaster.screenshot(path='hahaha.png')
        await browser.close()

asyncio.run(main())
