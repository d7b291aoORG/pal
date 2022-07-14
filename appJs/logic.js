import fetch from 'node-fetch'

const subscription = '326ccd13-f7e0-4fbf-be40-22e42ef93ad5'

const token = (await fetch('https://login.microsoftonline.com/deb7ba76-72fc-4c07-833f-1628b5e92168/oauth2/token', {method:'post', body:new globalThis.URLSearchParams({grant_type:'client_credentials', client_id:'60f0699c-a6da-4a59-be81-fd413d2c68bc', client_secret:'ljEw3qnk.HcDcd85aSBLgjdJ4uA~bqPKYz', resource:'https://management.azure.com/'})}).then(_ => _.json())).access_token

const group = `https://management.azure.com/subscriptions/${subscription}/resourcegroups/logic?api-version=2021-04-01`
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
await fetch(group, {method:'put', headers:{authorization:`Bearer ${token}`, 'content-type':'application/json'}, body:globalThis.JSON.stringify({location:'westus2'})})
const fqdn = (await fetch(`https://management.azure.com/subscriptions/${subscription}/resourceGroups/app/providers/Microsoft.App/containerApps/app?api-version=2022-03-01`, {headers:{authorization:`Bearer ${token}`}}).then(_ => _.json())).properties.configuration.ingress.fqdn
await fetch(`https://management.azure.com/subscriptions/${subscription}/resourceGroups/logic/providers/Microsoft.Logic/workflows/app?api-version=2016-06-01`, {method:'put', headers:{authorization:`Bearer ${token}`, 'content-type':'application/json'}, body:globalThis.JSON.stringify(
{
    location:'westus2',
    properties:
    {
        definition:
	{
	    $schema:'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#',
	    triggers:{HTTP:{inputs:{method:'GET',uri:'https://' + fqdn}, recurrence:{frequency:'Hour',interval:2}, type:'Http'}}
	}
    }
})})