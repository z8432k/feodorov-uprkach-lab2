FROM httpd:2.4-alpine

EXPOSE 80/tcp

COPY httpd/public-html/* /usr/local/apache2/htdocs/
COPY bin/* /usr/local/apache2/htdocs/cgi-bin/
COPY httpd/httpd.conf /usr/local/apache2/conf/httpd.conf
