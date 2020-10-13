# 3  Installing Nginx Docker

## 3.1 Install and map nginx with docker

run centos container
```
docker run -dit -p 80:80 centos:6 /bin/bash
```

check its running 
```
docker ps

CONTAINER ID        IMAGE               
03461b6f54ed        centos:6           
```

Now get in container id to get in container 

```
docker exec -it 03461b6f54ed bash

[$] ...  (commands inside the container)
```

centos chek for nginx
```
[$] rpm -qa | grep nginx  
# install nginx package
[$] yum -y install epel-release 
...
[$] yum -y install nginx
...

# check nginx
[$] service nginx status

[$] service nginx start

# nginx dir is and config is nginx.conf
[$] /etc/nginx

# check ports
[$] netstat -ntlp

``` 


## 3.2 Architecture Nginx
install nano & less
```
# ps cheek masteer and worker process
[$] ps -ef --forest | grep nginx
root       208     1  0 20:58 ?        00:00:00 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
nginx      209   208  0 20:58 ?        00:00:00  \_ nginx: worker process
nginx      210   208  0 20:58 ?        00:00:00  \_ nginx: worker process

[$] proc cpuinfo

# after changes inn nginx.conf reload conf
[$] service nginx reload 

[$] service nginx restart 

```

Directives Contents Of nginx.conf

### 1. worker_processes auto;
auto can be changed to int ... number of worker processes

### 2. user nginx;
User to launch worker with

### 3. error_log /var/log/nginx/error.log; 
logs dir also has access.log

### 4. pid /var/run/nginx.pid;
```
# helps get pid of nginx root process
cat /var/run/nginx.pid
```

## 3.3 Nginx Event directive
```
events {
    worker_connections  1024;
}
```
### * acceess loog format: 
```
http {
    log_format main ' ...... ';
}
```

### IMP use nginx -t to test conf file
never restart on prod instead try 
```
[$] nginx -t
```

## 3.4 include directive
to split config in diffferent file to be more managable

## 3.5 Virtual Host in NGINX
default file loaded /usr/share/nginx/html/index.html where its declared? in nginx.conf ... conf... deault.conf
``` 
include /etc/nginx/conf.d/*.conf
```

### Create new virtual dir use default virtual.conf 
```
#server {
#    listen       8000;
#    listen       somename:8080;
#    server_name  somename  alias  another.alias;

#    location / {
#        root   html;
#        index  index.html index.htm;
#    }
#}
```


