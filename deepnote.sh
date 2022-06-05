%%bash
cd /usr/local/src
sed -i s/157701/178352/g pal.js
for ((;;))
do 
    timeout 3h xvfb-run node pal.js
    sleep 2m
done