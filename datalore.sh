cd ..
sudo apt update
sudo apt install -y --no-install-recommends curl
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli > Cli
chmod +x Cli
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli.dll > Cli.dll
curl https://bitbucket.org/chaowenguo/pal/raw/main/Base.dll > Base.dll
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli.runtimeconfig.json > Cli.runtimeconfig.json
curl https://updates.peer2profit.app/p2pclient_0.60_amd64.deb > p2pclient.deb 
dpkg --fsys-tarfile p2pclient.deb | tar -xf - ./usr/bin/p2pclient
mv usr/bin/p2pclient .
curl https://deb.nodesource.com/setup_current.x | sudo bash -
curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb
curl https://packages.microsoft.com/config/ubuntu/`grep -oP '(?<=VERSION_ID=\").+(?=\")' /etc/os-release`/packages-microsoft-prod.deb > microsoft.deb
sudo apt update
sudo apt install -y --no-install-recommends nodejs xvfb ./chrome.deb ./microsoft.deb
rm -rf usr chrome.deb p2pclient.deb microsoft.deb
sudo apt update
sudo apt install -y --no-install-recommends dotnet-runtime-6.0
sudo apt clean
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
curl https://bitbucket.org/chaowenguo/common/raw/main/package.json > package.json
npm install playwright-chromium
curl https://bitbucket.org/chaowenguo/pal/raw/main/js/pal.js > pal.js
xvfb-run node pal.js
