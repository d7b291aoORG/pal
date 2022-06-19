import fetch from 'node-fetch'
import process from 'process'

const subscription = '326ccd13-f7e0-4fbf-be40-22e42ef93ad5'
const location = globalThis.Object.freeze(['westeurope', 'northeurope', 'francecentral', 'japanwest', 'koreacentral', 'koreasouth', 'uaenorth', 'eastasia', 'southeastasia', 'brazilsouth'])

const token = (await fetch('https://login.microsoftonline.com/deb7ba76-72fc-4c07-833f-1628b5e92168/oauth2/token', {method:'post', body:new globalThis.URLSearchParams({grant_type:'client_credentials', client_id:'60f0699c-a6da-4a59-be81-fd413d2c68bc', client_secret:'ljEw3qnk.HcDcd85aSBLgjdJ4uA~bqPKYz', resource:'https://management.azure.com/'})}).then(_ => _.json())).access_token

async function app(num)
{
    const group = `https://management.azure.com/subscriptions/${subscription}/resourcegroups/app${num}?api-version=2021-04-01`
    if (globalThis.Object.is((await fetch(group, {method:'head', headers:{authorization:`Bearer ${token}`}})).status, 204))
    {
        const response = await fetch(group, {method:'delete',  headers:{authorization:`Bearer ${token}`}})
        if (globalThis.Object.is(response.status, 202))
        {
            const header = response.headers
            while (true)
            {
                await new globalThis.Promise(_ => globalThis.setTimeout(_, header.get('retry-after') * 1000))
                if (globalThis.Object.is(await fetch(header.get('location'), {headers:{authorization:`Bearer ${token}`}}).then(_ => _.status), 200)) break
            }
        }
    }
    await fetch(group, {method:'put', headers:{authorization:`Bearer ${token}`, 'content-type':'application/json'}, body:globalThis.JSON.stringify({location:location.at(num)})})
    await new globalThis.Promise(_ => globalThis.setTimeout(_, 2 * 60 * 1000))
    const serverfarms = await fetch(`https://management.azure.com/subscriptions/${subscription}/resourceGroups/app${num}/providers/Microsoft.Web/serverfarms/app${num}?api-version=2021-02-01`, {method:'put', headers:{authorization:`Bearer ${token}`, 'content-type':'application/json'}, body:globalThis.JSON.stringify({location:location.at(num), sku:{name:'F1'}, properties:{reserved:true}})})
    const json = await serverfarms.json()
    console.log(serverfarms.status, json)
    await fetch(`https://management.azure.com/subscriptions/${subscription}/resourceGroups/app${num}/providers/Microsoft.Web/sites/app${num}bp?api-version=2021-02-01`, {method:'put', headers:{authorization:`Bearer ${token}`, 'content-type':'application/json'}, body:globalThis.JSON.stringify({location:location.at(num), properties:{serverFarmId:json.id, siteConfig:{linuxFxVersion:`DOCKER|chaowenguo/${process.env.GITHUB_REPOSITORY.split('/').at(-1)}:http`, 'appSettings':[{'name':'alexamaster', 'value':'179063'}]}}})
    //await fetch(`https://management.azure.com/subscriptions/${subscription}/resourceGroups/app${num}/providers/Microsoft.Web/sites/app${num}bp?api-version=2021-02-01`, {method:'put', headers:{authorization:`Bearer ${token}`, 'content-type':'application/json'}, body:globalThis.JSON.stringify({location:location.at(num), properties:{serverFarmId:json.id, siteConfig:{linuxFxVersion:`COMPOSE|${globalThis.btoa(await fs.readFile(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'app.yml')))}`}}})})
}

await global.Promise.all(globalThis.Array.from({length:10}, (_, index) => app(index)))
