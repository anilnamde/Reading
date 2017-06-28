# Nginx


## Nginx Process
nginx has one **master process** and several **worker processes**. 


*   _master process_:  is to read and evaluate configuration, and maintain worker processes. 
*   _worker processes_: actual processing of requests

How nginx modules work is defined in configuration file.  
Nginx conf is typically **nginx.conf** and is served under
 
* /usr/local/nginx/conf, 
* /etc/nginx, or 
* /usr/local/etc/nginx

## start, stop, reload configuations
Once started nginx can be controlled with signal 
 
 ```
 nginx -s [stop|quit|reopen|reload]
 ```
 
 * _stop_: fast shutdown
 * _quit_: graceful shutdown
 * _reload_: reloading the configuration file without restarting server
 * _reopen_: reopening the log files
 
 signal can also be sent to nginx with UNIX kill command
 
 ```
 kill -s QUIT [pid]
 ```
 
 To get running process id
 
 ```
 ps -ax | grep nginx
 ```
 
## Configuration File’s Structure
nginx consists of modules which are controlled by directives specified in the configuration file.  
There are two types of directives,
* _simple directives_: It starts with name and parameter separated by space and followed by semicolon.   
```
name parameter;
``` 

* _block directive_: it has name followed by additional instruction inside curly bracket {}. Also called as **container**.  
Block directive can have other directives and its called as **context**  
```
http {
}
```

Any text after # is cosidered comments
```
# commets
```

Configuration can be divided into multiple files for better maintainance. **include** directive is used for same  

```$xslt
include conf.d/http;
include conf.d/stream;
```

Directive are grouped together as per different traffic type  
*  events – General connection processing
*  http – HTTP traffic
*  mail – Mail traffic
*  stream – TCP traffic

Now each traffic context can have one more more server context that defines request handling.

```$xslt
user nobody; # a directive in the 'main' context

events {
    # configuration of connection processing
}

http {
    # Configuration specific to HTTP and affecting all virtual servers
    
    server {
        # configuration of HTTP virtual server 1

        location /one {
            # configuration for processing URIs with '/one'
        }

        location /two {
            # configuration for processing URIs with '/two'
        }
    }

    server {
        # configuration of HTTP virtual server 2
    }
}

stream {
    # Configuration specific to TCP and affecting all virtual servers

    server {
        # configuration of TCP virtual server 1 
    }
}
```

Directives inherits values from outer context. Also value of outer context can be overriden by declaring in child context  


## Basic Functionality

#### Setting Virtual Server
Virtual server is defined with one or more **server** declared in **http** context. **server** block usually includes **listen** 
directive which includes _ip:port_ which server listen on.

```$xslt
server {
    # default port 80 
    listen 127.0.0.1:8080; 
    
    ## SERVER_NAME 
    # in case multiple server having same IP server_name is checked with  
    # host name from the request. 
    # If still nothing matched first server in file is default server is selected.
    # default server can also be deflcare with **default_server**
    # ex: server_name: example.org www.example.org default_server;
    # name can eb regex, wild cards or exact name.
    server_name: example.org www.example.org;
    
    # location
    # its used to redirect traffice to proxy or serve different files from different URL
    
}
```
#### Configuring Locations
**location** context/directive is used to redirect specific url Or server file from differnt location.  
It can be either, 
* _Prefix String_:
    ```
    # matches request begin with /some/path/*
    location /some/path/ {
        ...
    }
    ```
* _RegEx String_:
    ```
    # regex begins with ~ (case sensitive) ~* (case insensitive)
    # following ex matches url end with "htm" or "html"
    location ~\.html? {
        ...
    }
    ```

Location context content define how to handle URL request server static, or pass to proxy

```$xslt
server {
    # server /images/some.png from /data/images/some.png
    location /images/ {
        root /data;
    }

    # all other request are redirectd to example.com
    location / {
        proxy_pass http://www.example.com;
    }
}
```

#### Using Variables
Nginx supports variable which are calculated on runtime format is **$variableName**.   
There are also predefined variables. Most variable computed at runtime and contains information related to specific request.
example,  
* _$remote_addr_: holds client remote address
* _$uri_: holds url

#### Return codes

```$xslt
# location can return specic code first argument is http status code
location /wrong/url {
    return 404;
}

# second param is optional and can be redirect uri
location /permanently/moved/url {
    return 301 http://www.example.com/moved/here;
}
```

#### Rewriting URIs in Requests
Request url can be modified one or more times during request processing using rewrite.

```$xslt
# rewrite directive takes three options
# first: request URL
# second: URL to substitute to
# thrid(Optional): halt processing (last|end)
location /users/ {
    rewrite ^/users/(.*)$ /show?user=$1 break;
}
```
There can be mutlie **rewrite** in both **server** and **location** directive. Once rewrite executes Nginx executes appropriate **location** context.

```$xslt
server {
    ...
    rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 last;
    rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  last;
    return  403;
    ...
}
```

#### Rewriting HTTP Responses

```$xslt
location / {
    sub_filter      /blog/ /blog-staging/;
    sub_filter_once off;
}
```
#### Handling Errors
with **error_page** directive error pages can be defined. It defines when 404 happens show /404.html page.

```
error_page 404 /404.html;
```

Following substitute 301 for 404 if user visits old URL and redirect user to new URL.
```$xslt
location /old/path.html {
    error_page 404 =301 http:/example.com/new/path.html;
}
```

## Serving Static Content                                                           
How to serve static content  
#### Root Directory and Index Files
root directive is to declare root for requests. It can be placed in  http, server, or location directives.
```
server {
    # common root for all request
    root /www/data;

    location / {
    }
    
    # /images mapped to  /www/data/images/ in file system
    location /images/ {
    }

    # url ending with .mp3 or .mp4 mapped to /www/media in file system
    location ~ \.(mp3|mp4) {
        # specifc root for this request
        root /www/media;
    }    
}
```

#### Index file
If location ends with  "/" nginx try to find directory and search for index.html file in it. 
If it does not find it it returns 404. To return auto generated index file include **autoindex on;** directive

```
location /images/ {
    autoindex on;
}
```
    
More than one index file can be defined
```
location /images/ {
    # $geo  variable custom variable set through "geo" directive
    # its value is based on client ip
    index index.$geo.html index.htm index.html;
}
```

If first index file does not math then auto internal redirect happens invoking other location url.
```
# below case if index.html does not exists 
# request is /data/index.php which triggers .php location executing fastcgi_pass
location / {
    root /data;
    index index.html index.php;
}

location ~ \.php {
    fastcgi_pass localhost:8000;
    ...
}
```

#### Trying Several Options
The **try_files** directive can be used to check whether the specified file or directory exists and make an internal redirect, or return a specific status code if they don’t

Try for _$url_ if it does not match internal redirect to _/www/data/images/default.gif_ if that url is not found then _404_ code is returned
_=404_ is optional

```$xslt
server {
    root /www/data;

    location /images/ {
        try_files $uri /images/default.gif =404;
    }
}
```

try for _$url_ or _$url/_ (directory) or _$.url.html_ file else 404

```
location / {
    try_files $uri $uri/ $uri.html =404;
}
```

try _$url_ or redirect to named server _@backend_ which is proxy
```
location / {
   try_files $uri $uri/ @backend;
}

location @backend {
   proxy_pass http://backend.example.com;
}
```

## Optimizing NGINX Speed for Serving Content 
[Optimization On Demand Webinars](https://www.nginx.com/resources/webinars/content-caching-nginx-plus/)
#### Enabling sendfile
Nginx copy file in buffer to send it. **sendfine** can prevent it and directly write data to file descriptor to descriptor making it efficeint. To prevent file to occupy entire working **sendfile_max_chunk** can be specifed
```
location /mp3 {
    sendfile           on;
    sendfile_max_chunk 1m;
    ...
}
```
#### Enabling tcp_nopush
enable to push HTTP response header in on packet right after chunk has been pushed 
```
location /mp3 {
    sendfile   on;
    tcp_nopush on;
    ...
}
```

#### Enabling tcp_nodelay
Enables to override _Nagle's algorithm_ (it combiles small packet in on big packet for efficiency and adds 200MS delay)
 
```$xslt
location /mp3  {
    tcp_nodelay       on;
    # always used with keepalive connection
    keepalive_timeout 65;
    ...
}
```

#### Optimizing the Backlog Queue
##### Measuring the Listen Queue
```$xslt
netstat -Lan

Current listen queue sizes (qlen/incqlen/maxqlen)
Listen         Local Address         
0/0/128        *.12345            
192/0/128        *.80 # 192 unaccepted connection which is load situation       
0/0/128        *.8080
```

connection 128 can be increased in such case for better performance

## Compression and Decompression
Compression happen on response at server and could be costly. Nginx does not compress already compressed responses(in case of proxy)
 
#### Enabling Compression

to enable compression
```
gzip on;
```
By default nginx only compress _type/html_ to support other type _gzip_types_ should list MIME types
```
gzip_types text/plain application/xml;
```
min len of response to compress (default is 20B increase to 1000)
```
gzip_min_length 1000;
```

to ensure that proxied response also gets compress use **gzip_proxied**. It takes params
In below example specifies gzip proxy if no-cached no-store etc etc conditions
```$xslt
gzip_proxied no-cache no-store private expired auth;
```
To support client that does not support gzip data **gunzip** directive is used
```$xslt
server {
    gzip on;
    gzip_min_length 1000;
    gunzip on;
    ...
}
```

To send compressed static file use **gzip_static**  
In following example _/path/to/file_ request to server will send pre compressed file _/path/to/file.gz_. If it does not find compressed file then the original file is sent
```
location / {
    gzip_static on;
}
```

## NGINX Reverse Proxy

#### Introduction
Proxying is typically used to, 
* distribute the load among servers, 
* seamlessly show content from different websites, or 
* pass requests for processing to application servers over protocols other than HTTP.

#### Passing a Request to a Proxied Server
When NGINX proxies a request, it sends the request to a specified proxied server, fetches the response, and sends it back to the client.  

It is possible to proxy requests to an 
* HTTP server (another NGINX server or any other server) or 
* a non-HTTP server (which can run an application developed with a specific framework, such as PHP or Python) using a specified protocol

To pass a request to an HTTP proxied server, the **proxy_pass** directive is specified inside a location. For example:
```$xslt
# /some/path/page.html proxied to 
# http://www.example.com/link/page.html
location /some/path/ {
    proxy_pass http://www.example.com/link/;
}

# could be IP and Port as well
location ~ \.php {
    proxy_pass http://127.0.0.1:8000;
}
```

The proxy_pass directive can also point to a named group of servers

#### Passing Request Headers
to pass proxy header use **proxy_set_header** directive

```$xslt
location /some/path/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://localhost:8000;
}
```

To prevent a header field from being passed to the proxied server, set it to an empty string as follows:
```
location /some/path/ {
    proxy_set_header Accept-Encoding "";
    proxy_pass http://localhost:8000;
}
```

#### Configuring Buffers
By default NGINX buffers responses from proxied servers. It helps helps to optimize performance with slow clients.  

* _proxy_buffering_: directive is for enabling buffering.
* _proxy_buffers_: directive is for size and number of buffer allocated per request
* _proxy_buffer_size_: directive to buffer size
 
```$xslt
location /some/path/ {
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://localhost:8000;
}
```

If buffering is disabled, the response is sent to the client synchronously while it is receiving it from the proxied server. Good only for fast client.  
To disable buffering at specific location
```$xslt
location /some/path/ {
    proxy_buffering off;
    proxy_pass http://localhost:8000;
}
```
#### Choosing an Outgoing IP Address
Sometimes you might need to choose a particular source IP address for connecting to a proxied server. Use **proxy_bind** for specifyng ip
```$xslt
location /app1/ {
    proxy_bind 127.0.0.1;
    proxy_pass http://example.com/app1/;
}
# variable $server_addr can be used
location /app3/ {
    proxy_bind $server_addr;
    proxy_pass http://example.com/app3/;
}
```
## Web content cache [PENDING]
Regarding how to enable and catch responses from proxied server.
#### Introduction
When caching is enabled, NGINX Plus saves responses in a disk cache and uses them to respond to clients without having to proxy requests for the same content every time.

#### Enabling the Caching of Responses
To enable cache use **proxy_cache_path** directive in top level http context. It takes two params
* _path_: path to local system 
* _keys_zone_: defines name and size of shared

Then include **proxy_cache** in context (protocol type, virtual server, location) where you want server repsonse to be cached.
```$xslt
http {
    ...
    proxy_cache_path /data/nginx/cache keys_zone=one:10m;

    server {
        proxy_cache one;
        location / {
            proxy_pass http://localhost:8000;
        }
    }
}
```
Cached responses are stored on the disk with the metadata under file system. _max_size_ can be used to limit the amount of cached response data.

#### NGINX Processes Involved in Caching
Two process related with caching
* _The cache manager_: activates periodically and monitors size of cached. If size exceeds then it removes least recently accessed cache.
* _ cache loader_: It runs only when Nginx starts. It does cause dealay in starting Nginx server. To address this performance at start additional value can be send to proxy_cache_path.
    * _loader_threshold_: Duration of an iteration, in milliseconds defaul 200
    * _loader_files_:Maximum number of items loaded during one iteration default 100
    * _loader_sleeps_: Delay between iterations in ms default 50
    
```$xslt
proxy_cache_path /data/nginx/cache keys_zone=one:10m loader_threshold=300 loader_files=200;
```

#### Specifying Which Requests to Cache
By default, NGINX Plus caches all responses to requests made with the HTTP GET and HEAD methods the first time such responses are received from a proxied server.  If a request has the same key as a cached response, NGINX Plus sends the cached response to the client. You can include various directives in the http, server, or location context to control which responses are cached.

Following are directives to control that behaviour
```$xslt
proxy_cache_key "$host$request_uri$cookie_user";
proxy_cache_min_uses 5;
proxy_cache_methods GET HEAD POST;
```
#### Limiting or Bypassing Caching
To limit how long cached responses with specific status codes are considered valid, include the proxy_cache_valid directive
```$xslt
# cache valid for 200 and 302 response for 10m
proxy_cache_valid 200 302 10m;
proxy_cache_valid 404      1m;

# any response code 
proxy_cache_valid any 5m;
```
To bypass cached or no cache
```$xslt
proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
proxy_no_cache $http_pragma $http_authorization;
```
#### Purging Content From The Cache
To remove outdated cache. The cache is purged upon receiving a special “purge” request.
##### Configuring Cache Purge
Let’s set up a configuration that identifies requests that use the “PURGE” HTTP method and deletes matching URLs.
1. On the http level, create a new variable, for example, $purge_method, that will depend on the $request_method variable:
```
http {
    ...
    map $request_method $purge_method {
        PURGE 1;
        default 0;
    }
}
```
2.  location where caching is configured, include the proxy_cache_purge directive that will specify a condition of a cache purge request.

```$xslt
server {
    listen      80;
    server_name www.example.com;

    location / {
        proxy_pass  https://localhost:8002;
        proxy_cache mycache;

        proxy_cache_purge $purge_method;
    }
}
```

##### Sending the Purge Command
 You can issue purge requests using a range of tools, for example, the curl command:
 ```$xslt
 curl -X PURGE -D – "https://www.example.com/*"
```





