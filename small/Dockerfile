FROM node:slim
RUN ["bash", "-c", "apt update && apt install -y --no-install-recommends curl ca-certificates && curl https://packages.microsoft.com/config/debian/`grep -oP '(?<=VERSION_ID=\").+(?=\")' /etc/os-release`/packages-microsoft-prod.deb > microsoft.deb && apt install -y --no-install-recommends ./microsoft.deb && apt update && apt install -y --no-install-recommends dotnet-runtime-6.0 && rm -rf microsoft.deb && apt clean"]
COPY small.js package.json p2pclient Cli Cli.dll Base.dll Cli.runtimeconfig.json /usr/local/src/
WORKDIR /usr/local/src
ENTRYPOINT ["node", "small.js"]
