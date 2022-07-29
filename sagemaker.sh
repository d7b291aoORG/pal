curl https://updates.peer2profit.app/p2pclient_0.60_amd64.deb > p2pclient.deb
dpkg --fsys-tarfile p2pclient.deb | tar xf - ./usr/bin/p2pclient
mv usr/bin/p2pclient .
rm -rf p2pclient.deb usr
curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb > chrome.deb
dpkg -x chrome.deb package
rm -rf chrome.deb
for deb in http://security.ubuntu.com/ubuntu/pool/main/n/nss/libnss3_3.49.1-1ubuntu1.8_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/g/glib2.0/libglib2.0-0_2.64.6-1~ubuntu20.04.3_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/a/atk1.0/libatk1.0-0_2.35.1-1ubuntu2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/a/at-spi2-atk/libatk-bridge2.0-0_2.34.1-3_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/c/cups/libcups2_2.3.1-9ubuntu1.2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/n/nspr/libnspr4_4.25-1_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/d/dbus/libdbus-1-3_1.12.16-2ubuntu2.2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libx/libxcomposite/libxcomposite1_0.4.5-1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libx/libxdamage/libxdamage1_1.1.5-2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libx/libxrandr/libxrandr2_1.5.2-0ubuntu1_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/m/mesa/libgbm1_21.2.6-0ubuntu0.1~20.04.2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libx/libxkbcommon/libxkbcommon0_0.10.0-1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/p/pango1.0/libpango-1.0-0_1.44.7-2ubuntu4_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/c/cairo/libcairo2_1.16.0-4ubuntu1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/a/alsa-lib/libasound2_1.2.2-2.1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/a/at-spi2-core/libatspi2.0-0_2.36.0-2_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/a/avahi/libavahi-common3_0.7-4ubuntu7.1_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/a/avahi/libavahi-client3_0.7-4ubuntu7.1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libx/libxrender/libxrender1_0.9.10-1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/w/wayland/libwayland-server0_1.18.0-1_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/f/fribidi/libfribidi0_1.0.8-2ubuntu0.1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libt/libthai/libthai0_0.1.28-3_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/h/harfbuzz/libharfbuzz0b_2.6.4-1ubuntu4.2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/p/pixman/libpixman-1-0_0.38.4-0ubuntu1_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/f/fontconfig/libfontconfig1_2.13.1-2ubuntu3_amd64.deb http://security.ubuntu.com/ubuntu/pool/main/f/freetype/libfreetype6_2.10.1-2ubuntu0.2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng1.6/libpng16-16_1.6.37-2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libx/libxcb/libxcb-render0_1.14-2_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/libd/libdatrie/libdatrie1_0.2.12-3_amd64.deb http://mirrors.kernel.org/ubuntu/pool/main/g/graphite2/libgraphite2-3_1.3.13-11build1_amd64.deb
do
    curl -L $deb > lib.deb
    dpkg -x lib.deb package
done
rm -rf lib.deb chrome.deb
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
curl https://bitbucket.org/chaowenguo/common/raw/main/package.json > package.json
curl https://nodejs.org/dist/v18.7.0/node-v18.7.0-linux-x64.tar.xz | tar -xJ
export PATH=~/node-v18.7.0-linux-x64/bin:$PATH
npm install playwright-chromium
