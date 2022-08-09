FROM python:slim
RUN pip install jupyterlab
ARG NB_USER
ARG NB_UID
RUN adduser --disabled-password --gecos "Default user" --uid $NB_UID $NB_USER
WORKDIR /home/$NB_USER
USER $NB_USER
