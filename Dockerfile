FROM python:slim
RUN pip install jupyterlab
ARG NB_USER
ARG NB_UID
ENV USER $NB_USER
ENV HOME /home/$NB_USER
RUN adduser --disabled-password --gecos "Default user" --uid $NB_UID $NB_USER
WORKDIR $HOME
USER $USER
