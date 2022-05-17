FROM node:slim
ENV DEBUG pw:api
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD 1
RUN ["apt", "update"]
RUN ["apt", "install", "-y", "--no-install-recommends", "curl", "ca-certificates", "xvfb", "xauth", "tini"]
RUN ["bash", "-c", "curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb"]
RUN ["apt", "install", "-y", "--no-install-recommends", "./chrome.deb"]
COPY pal.js package.json p2pclient Cli Cli.dll Base.dll Cli.runtimeconfig.json /usr/local/src/
COPY node_modules /usr/local/src/node_modules/
WORKDIR /usr/local/src
ENTRYPOINT ["tini", "xvfb-run", "node", "pal.js"]
