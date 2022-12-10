FROM php:8-apache
WORKDIR /var/www/html

RUN apt update
RUN apt install default-jre -y

COPY src/ .

RUN chmod -R 777 *

EXPOSE 80