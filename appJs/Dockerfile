FROM scratch
COPY web.js package.json /usr/local/src/
COPY node_modules /usr/local/src/node_modules/
WORKDIR /usr/local/src
COPY --from=node:slim /usr/local/bin/node /usr/bin/
COPY --from=node:slim /lib/x86_64-linux-gnu /lib/x86_64-linux-gnu/
COPY --from=node:slim /usr/lib/x86_64-linux-gnu /usr/lib/x86_64-linux-gnu/
COPY --from=node:slim /lib64 /lib64/
ENTRYPOINT ["node", "web.js"]