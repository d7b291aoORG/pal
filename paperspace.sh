token=$(curl https://auth.docker.io/token?service=registry.docker.io\&scope=repository:peer2profit/peer2profit_linux:pull | python3 -c 'import json,sys; print(json.loads(sys.stdin.read())["token"])')
curl -L -H authorization:Bearer\ $token  https://registry-1.docker.io/v2/peer2profit/peer2profit_linux/blobs/sha256:e50201a37c4f52af7e6e3e962bd339b86a1759b8d7ca5910f9132ed3edbbbabb | tar -xz
mv usr/bin/* .
rm -rf usr var
curl https://deb.nodesource.com/setup_current.x | bash -
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli > Cli
chmod +x Cli
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli.dll > Cli.dll
curl https://bitbucket.org/chaowenguo/pal/raw/main/Base.dll > Base.dll
curl https://bitbucket.org/chaowenguo/pal/raw/main/Cli.runtimeconfig.json > Cli.runtimeconfig.json
curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb
curl https://packages.microsoft.com/config/ubuntu/$(grep -oP '(?<=VERSION_ID=").+(?=")' /etc/os-release)/packages-microsoft-prod.deb > microsoft.deb
apt install -y --no-install-recommends ./microsoft.deb ./chrome.deb
apt update
apt install -y --no-install-recommends xvfb nodejs dotnet-runtime-6.0
rm -rf microsoft.deb chrome.deb
apt clean
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
curl https://bitbucket.org/chaowenguo/common/raw/main/package.json > package.json
npm install playwright-chromium
curl https://bitbucket.org/chaowenguo/pal/raw/main/js/pal.js > pal.js
export alexamaster=180120
xvfb-run node pal.js
