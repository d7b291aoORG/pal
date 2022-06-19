import aiohttp, asyncio, argparse, os, base64, pathlib

parser = argparse.ArgumentParser()
for _ in ('azure', 'azurePassword', 'tenant'): parser.add_argument(_)
args = parser.parse_args()
subscription = '9046396e-e215-4cc5-9eb7-e25370140233'
location = ('westus', 'westus2', 'eastus', 'eastus2', 'centralus', 'southcentralus', 'canadacentral', 'australiaeast', 'australiasoutheast', 'uksouth')

async def app(session, token, num):
    group = f'https://management.azure.com/subscriptions/{subscription}/resourcegroups/app{num}?api-version=2021-04-01'
    async with session.head(group, headers={'authorization':f'Bearer {token}'}) as response:
        if response.status == 204:
            async with session.delete(group, headers={'authorization':f'Bearer {token}'}) as response:
                if response.status == 202:
                    header = response.headers
                    while True:
                        await asyncio.sleep(int(header.get('retry-after')))
                        async with session.get(header.get('location'), headers={'authorization':f'Bearer {token}'}) as _:
                            if _.status == 200: break
    async with session.put(group, headers={'authorization':f'Bearer {token}'}, json={'location':location[num]}) as _: pass
    await asyncio.sleep(60 * 2)
    async with session.put(f'https://management.azure.com/subscriptions/{subscription}/resourceGroups/app{num}/providers/Microsoft.Web/serverfarms/app{num}?api-version=2021-02-01', headers={'authorization':f'Bearer {token}'}, json={'location':location[num], 'sku':{'name':'F1'}, 'properties':{'reserved':True}}) as serverfarms:
        serverfarmsJson = await serverfarms.json()
        print(serverfarms.status, serverfarmsJson)
        async with session.put(f'https://management.azure.com/subscriptions/{subscription}/resourceGroups/app{num}/providers/Microsoft.Web/sites/app{num}ap?api-version=2021-02-01', headers={'authorization':f'Bearer {token}'}, json={'location':location[num], 'properties':{'serverFarmId':serverfarmsJson.get('id'), 'siteConfig':{'linuxFxVersion':f"DOCKER|chaowenguo/{os.getenv('GITHUB_REPOSITORY').split('/')[-1]}:http", 'appSettings':[{'name':'alexamaster', 'value':'157701'}]}}}) as _: pass
        #async with session.put(f'https://management.azure.com/subscriptions/{subscription}/resourceGroups/app{num}/providers/Microsoft.Web/sites/app{num}ap?api-version=2021-02-01', headers={'authorization':f'Bearer {token}'}, json={'location':location[num], 'properties':{'serverFarmId':serverfarmsJson.get('id'), 'siteConfig':{'linuxFxVersion':f"COMPOSE|{base64.b64encode(pathlib.Path(__file__).resolve().parent.joinpath('app.yml').read_bytes()).decode()}"}}}) as _: pass
    
async def main():
    async with aiohttp.ClientSession() as session:
        async with session.post(f'https://login.microsoftonline.com/{args.tenant}/oauth2/token', data={'grant_type':'client_credentials', 'client_id':args.azure, 'client_secret':args.azurePassword, 'resource':'https://management.azure.com/'}) as response:
            token = (await response.json()).get('access_token')
            await asyncio.gather(*(app(session, token, num) for num in range(10)))

asyncio.run(main())

#https://www.microsoftazuresponsorships.com/
#az login --service-principal -u ${{secrets.AZURE}} -p ${{secrets.AZUREPASSWORD}} --tenant ${{secrets.TENANT}} #az ad sp create-for-rbac --role Contributor --scopes /subscriptions/9046396e-e215-4cc5-9eb7-e25370140233
#readonly location=(westus westus2 eastus eastus2 centralus southcentralus canadacentral australiaeast australiasoutheast uksouth)
#for i in ${!location[@]}
#do
#    if `az group exists -n app$i`
#    then
#        az group delete -n app$i -y --no-wait
#    fi
#done
#for i in ${!location[@]}
#do
#    if `az group exists -n app$i`
#    then
#        az group wait --deleted -g app$i
#    fi          
#    az group create -n app$i -l ${location[i]}
#    az appservice plan create -n app$i -g app$i --sku F1 --is-linux
#    az webapp create -n app${i}ap -p app$i -g app$i -i chaowenguo/${GITHUB_REPOSITORY#*/}:http
#    az webapp create -g app$i -p app$i -n app${i}ap --multicontainer-config-type compose --multicontainer-config-file app.yml
#    az webapp config appsettings set -n app${i}ap -g app$i --settings alexamaster=157701
#done
#az group exists -n app0 --debug# to the rest api
