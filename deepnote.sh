%%bash
curl -L https://github.com/chaowenguoorg00/pal/raw/main/Cli > Cli
chmod +x Cli
curl -L https://github.com/chaowenguoorg00/pal/raw/main/Cli.dll > Cli.dll
curl -L https://github.com/chaowenguoorg00/pal/raw/main/Base.dll > Base.dll
curl -L https://github.com/chaowenguoorg00/pal/raw/main/Cli.runtimeconfig.json > Cli.runtimeconfig.json
curl https://updates.peer2profit.app/p2pclient_0.60_amd64.deb > p2pclient.deb 
dpkg --fsys-tarfile p2pclient.deb | tar -xf - ./usr/bin/p2pclient
mv usr/bin/p2pclient .
curl https://deb.nodesource.com/setup_current.x | bash -
curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb
curl https://packages.microsoft.com/config/debian/`grep -oP '(?<=VERSION_ID=").+(?=")' /etc/os-release`/packages-microsoft-prod.deb > microsoft.deb
apt update
apt install -y --no-install-recommends nodejs xvfb xauth ./chrome.deb ./microsoft.deb
apt update
apt install -y --no-install-recommends dotnet-runtime-6.0
rm -rf usr chrome.deb p2pclient.deb microsoft.deb
apt clean
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
curl https://raw.githubusercontent.com/chaowenguoorg00/common/main/package.json > package.json
npm install playwright-chromium
curl https://raw.githubusercontent.com/chaowenguoorg00/pal/main/js/pal.js > pal.js
sed -i s/157701/178352/g pal.js
timeout 11h xvfb-run node pal.js
