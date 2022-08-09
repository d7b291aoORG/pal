FROM chaowenguo/pal:js
RUN ["bash", "-c", "apt install python3-pip; pip install jupyterlab"]
ARG NB_USER
ARG NB_UID
RUN adduser --disabled-password --gecos "Default user" --uid $NB_UID $NB_USER
USER $NB_USER
