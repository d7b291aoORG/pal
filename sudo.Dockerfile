ARG JS
FROM chaowenguo/$JS:js
RUN ["apt", "install", "-y", "--no-install-recommends", "sudo"]