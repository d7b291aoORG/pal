ARG JS
FROM chaowenguo/$JS:js
COPY http.js /usr/local/src/
ENTRYPOINT ["tini", "xvfb-run", "node", "http.js"]
