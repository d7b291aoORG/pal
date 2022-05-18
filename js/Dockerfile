FROM node:slim
ENV DEBUG pw:api
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD 1
RUN ["bash", "-c", "apt update && apt install -y --no-install-recommends curl ca-certificates xvfb xauth tini && curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb && curl https://packages.microsoft.com/config/debian/`grep -oP '(?<=VERSION_ID=\").+(?=\")' /etc/os-release`/packages-microsoft-prod.deb > microsoft.deb && apt install -y --no-install-recommends ./chrome.deb ./microsoft.deb && apt update && apt install -y --no-install-recommends dotnet-runtime-6.0 && rm -rf chrome.deb microsoft.deb && apt clean"]
COPY pal.js package.json p2pclient Cli Cli.dll Base.dll Cli.runtimeconfig.json /usr/local/src/
COPY node_modules /usr/local/src/node_modules/
WORKDIR /usr/local/src
ENTRYPOINT ["tini", "xvfb-run", "node", "pal.js"]
