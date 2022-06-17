import aiohttp.web, asyncio, ssl

async def main():
    sslcontext = ssl.create_default_context(cafile='/etc/ssl/certs/ca-certificates.crt')
    async with aiohttp.ClientSession() as session:
        async def f(_):
            async with session.get(f'https://app{_}ap.azurewebsites.net', ssl=sslcontext) as a, session.get(f'https://app{_}bp.azurewebsites.net', ssl=sslcontext) as b: print(a.status, await a.text(), b.status, await b.text())
        await asyncio.gather(*(f(_) for _ in range(10)))

asyncio.run(main())
