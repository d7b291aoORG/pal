import aiohttp.web, asyncio, uvloop, ssl, pathlib
asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())

async def main():
    app = aiohttp.web.Application()
    app.add_routes([aiohttp.web.get('/', lambda _: aiohttp.web.Response(text='py'))])
    runner = aiohttp.web.AppRunner(app)
    await runner.setup()
    site = aiohttp.web.TCPSite(runner, port=80)
    await site.start()
    #await asyncio.create_subprocess_exec(pathlib.Path(__file__).resolve().parent.joinpath('p2pclient'), '-l', 'chaowen.guo1@gmail.com', '-n', ';8.8.8.8,4.4.4.4')
    sslcontext = ssl.create_default_context(cafile='/etc/ssl/certs/ca-certificates.crt')
    while True:
        async with aiohttp.ClientSession() as session:
            async def f(_):
                try:
                    async with session.get(f'https://app{_}ap.azurewebsites.net', ssl=sslcontext) as __, session.get(f'https://app{_}bp.azurewebsites.net', ssl=sslcontext) as __: pass
                except: pass
            await asyncio.gather(*(f(_) for _ in range(10)))
        await asyncio.sleep(60 * 5)

asyncio.run(main())
