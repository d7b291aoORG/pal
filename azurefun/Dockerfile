# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:3.0-appservice
FROM mcr.microsoft.com/azure-functions/node:3.0-node14-slim
ENV AzureWebJobsScriptRoot /home/site/wwwroot
ENV AzureFunctionsJobHost__Logging__Console__IsEnabled true
ENV DEBUG pw:api
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD 1
RUN ["apt", "update"]
RUN ["apt", "install", "-y", "--no-install-recommends", "wget", "ca-certificates"]
RUN ["wget", "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"]
RUN ["apt", "install", "-y", "--no-install-recommends", "./google-chrome-stable_current_amd64.deb"]
COPY . /home/site/wwwroot
WORKDIR /home/site/wwwroot
RUN ["npm", "install", "playwright-chromium"]
