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
 
 ``nginx -s [stop|quit|reopen|reload]``
 
 * _stop_: fast shutdown
 * _quit_: graceful shutdown
 * _reload_: reloading the configuration file without restarting server
 * _reopen_: reopening the log files
 
 signal can also be sent to nginx with UNIX kill command
 
 ``kill -s QUIT [pid]``
 
 To get running process id
 
 ``ps -ax | grep nginx``
 
                                                           


