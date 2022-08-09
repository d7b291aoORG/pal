FROM node:slim
ARG NB_USER
ARG NB_UID
RUN ["bash", "-c", "apt update && apt install -y --no-install-recommends python3-pip && pip install jupyterlab && deluser node && adduser --disabled-password --gecos '' --uid $NB_UID $NB_USER"]
USER $NB_USER
