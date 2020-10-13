# 1. HTTP GET
## 1.1 Conditioal: If Modified "Date"
```
GET /index.html HTTP/1.1
HOST: hostname.xin
If-Modified-Since: Date
```

```
curl --header "If-Modified-Since: Web, 19 2019 03:23:00 GMT" server/file.name
```
Return 304 ot Modified when file is not changed on server


## 1.2 HTTP PARTIAL: Range
print header of the curl request. endpoit should return response have "Accept Ranges: bytes" for range to work

```
Curl -i server/file.txt
```
        
        
to make request Now add range 
```
curl --header "Range bytes=20-40" server/textfile.txt
```

this helps server to support partial download and resume funcatiionality

## 1.2 HTTP Post
```
POST /index.html HTTP/1.1
Content-Type: application/x-www-form-urlenncoded
Content-Length: 32

user=a password=soome
```

## 1.3 HTTP HEAD method (does not reeturn message body )
```
curl -I url
```

## 1.4 HTTP Trace (debugging)
```
curl -X "TRACE" url.com
```

## 1.5 HTTP Options 
```
curl -X "OPTIONS" url.com -i
```



# 2  install nginx (centos image on on Digital Ocean)
create droplet centos
```
ssh root@ip
<!-- .. password -->
<!-- .. change password -->


<!-- install packages -->
yum install epel-release
yum install nginx

systemctl status nginx
systemctl start nginx
systemctl status nginx

curl ip:80
```

# 3.


# Tools
### telnet
### curl
### wireshark
### Docker
### BurpSuite