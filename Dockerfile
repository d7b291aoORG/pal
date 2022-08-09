FROM chaowenguo/pal:js
ARG NB_USER
ARG NB_UID
RUN ["bash", "-c", "apt install -y --no-install-recommends python3-pip && pip install jupyterlab && deluser node && adduser --disabled-password --gecos '' --uid $NB_UID $NB_USER"]
COPY pal.ipynb .
USER $NB_USER
ENTRYPOINT []
