FROM scratch
ADD playground-web /
ADD _site /_site
WORKDIR /
ENTRYPOINT [ "/playground-web" ]
