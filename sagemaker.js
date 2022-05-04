import {chromium} from 'playwright-chromium'
import process from 'process'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled', '--start-maximized'], headless:false})//default_args https://github.com/microsoft/playwright/blob/5faf6f9e69c2148e94c81675fb636eb31a02b5e7/src%2Fserver%2Fchromium%2Fchromium.ts#L78
const sagemaker = await browser.newPage({recordVideo:{dir:'videos'}, viewport:null})
await sagemaker.goto('https://studiolab.sagemaker.aws/login')
await sagemaker.fill('input[name="username"]', 'chaowen.guo1@gmail.com')
await sagemaker.fill('input[name="password"]', process.argv.at(2))
await sagemaker.click('button.qa-signin-submit-button')
await sagemaker.click('button.qa-start-stop-button')
await sagemaker.click('button.qa-launch-project-button')
await sagemaker.dblclick('li[title^="Name: pal.ipynb"]')
await sagemaker.click('button[title="Restart the kernel, then re-run the whole notebook"]')
await sagemaker.click('button.jp-mod-accept')
await sagemaker.waitForTimeout(10 * 1000)
await browser.close()
