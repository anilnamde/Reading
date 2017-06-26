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

####Setting Virtual Server
Virtual server is defined with one or more **server** declared in **http** context.



                                                           


