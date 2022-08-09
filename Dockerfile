#FROM chaowenguo/pal:js
#RUN ["bash", "-c", "apt install -y --no-install-recommends python3-pip; pip install jupyterlab"]

FROM python:slim
RUN pip install jupyterlab

ARG NB_USE
ARG NB_UID

RUN adduser --disabled-password --gecos "Default user" --uid $NB_UID $NB_USER
USER $NB_USER
