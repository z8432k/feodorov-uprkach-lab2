FROM node:14-alpine AS front

COPY httpd/public-html/. /home/node/app
WORKDIR /home/node/app
RUN npm ci && npm run build


FROM httpd:2.4

EXPOSE 80/tcp
RUN apt-get update && apt-get install -y libglib2.0-0 libjansson4 libpq5
COPY --from=front /home/node/app/build/. /usr/local/apache2/htdocs/
COPY bin/* /usr/local/apache2/cgi-bin/
COPY httpd/httpd.conf /usr/local/apache2/conf/httpd.conf
