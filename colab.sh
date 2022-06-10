curl https://deb.nodesource.com/setup_17.x | bash -
curl https://bitbucket.org/chaowenguo/pal/raw/main/p2pclient > p2pclient
chmod +x p2pclient
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli > Cli
chmod +x Cli
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli.dll > Cli.dll
curl https://bitbucket.org/chaowenguo/pal/raw/main/Base.dll > Base.dll
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli.runtimeconfig.json > Cli.runtimeconfig.json
curl https://packages.microsoft.com/config/ubuntu/`grep -oP '(?<=VERSION_ID=").+(?=")' /etc/os-release`/packages-microsoft-prod.deb > microsoft.deb
apt install -y --no-install-recommends ./microsoft.deb
apt update
apt install -y --no-install-recommends chromium-browser xvfb nodejs dotnet-runtime-6.0
rm -rf microsoft.deb
apt clean
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
curl https://bitbucket.org/chaowenguo/common/raw/main/package.json > package.json
npm install playwright-chromium
curl https://bitbucket.org/chaowenguo/pal/raw/main/js/pal.js > pal.js
sed -i s@channel:\'chrome\'@executablePath:\'/usr/lib/chromium-browser/chromium-browser\'@g pal.js
sed -i s/157701/178352/g pal.js
xvfb-run node pal.js