FROM chaowenguo/pal:js
RUN ["apt", "install", "-y", "--no-install-recommends", "python3-pip"]
RUN ["ln", "/usr/bin/python3", "/usr/bin/python"]