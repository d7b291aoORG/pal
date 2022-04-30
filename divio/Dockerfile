FROM python
RUN ["python", "-m", "venv", "--copies", "/usr/local/venv"]
COPY server.pyc /usr/local/venv/
WORKDIR /usr/local/venv
RUN ["bin/pip", "install", "aiohttp", "uvloop"]

FROM scratch
ENV PYTHONPATH /usr/local/lib/python:/usr/local/lib/python/site-packages:/usr/local/lib/python/lib-dynload
WORKDIR /usr/local/venv
COPY --from=0 /usr/local/venv .
COPY --from=python:slim /usr/local/lib/libpython*.so.1.0 /usr/lib/x86_64-linux-gnu/
COPY --from=python:slim /usr/local/lib/python* /usr/local/lib/python/
COPY --from=python:slim /lib/x86_64-linux-gnu /lib/x86_64-linux-gnu/
COPY --from=python:slim /usr/lib/x86_64-linux-gnu /usr/lib/x86_64-linux-gnu/
COPY --from=python:slim /lib64 /lib64/
COPY --from=python:slim /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["bin/python", "server.pyc"]
