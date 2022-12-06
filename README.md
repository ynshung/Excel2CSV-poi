# Excel to CSV Docker Project

This web docker container uses the Apache POI library directly from PHP to convert excel file to CSV.

## Usage

`docker-compose up --build`

Go to your browser and enter localhost to enter the file.

To clear space, delete all unused images in Docker Desktop > Images.

## Shell access

To access the shell, use `docker` instead:

```bash
docker build -t excel2csv:1.0 .
docker run --name excel2csv -d -p 80:80 excel2csv:1.0
docker exec -it excel2csv sh
```

## Serve PHP server
Install [XAMPP](https://www.apachefriends.org/) and add PHP folder to path (`C:/xampp/php`). After that run the command `php -S localhost:80`.
