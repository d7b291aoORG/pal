%%bash
curl https://updates.peer2profit.app/p2pclient_0.60_amd64.deb > p2pclient.deb 
dpkg --fsys-tarfile p2pclient.deb | tar -xf - ./usr/bin/p2pclient
mv usr/bin/p2pclient .
curl https://deb.nodesource.com/setup_current.x | bash -
curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb
curl https://packages.microsoft.com/config/debian/`cat /etc/debian_version | cut -d '.' -f1`/packages-microsoft-prod.deb > microsoft.deb
apt update
apt install -y --no-install-recommends nodejs xvfb xauth ./chrome.deb ./microsoft.deb
apt update
apt install -y --no-install-recommends dotnet-runtime-6.0
rm -rf usr chrome.deb p2pclient.deb microsoft.deb
apt clean
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
curl https://raw.githubusercontent.com/chaowenguoorg0/common/main/package.json > package.json
npm install playwright-chromium
curl https://raw.githubusercontent.com/chaowenguoorg0/pal/main/js/pal.js > pal.js
for ((;;))
do 
    timeout 1h xvfb-run node pal.js
    sleep 2m
done
