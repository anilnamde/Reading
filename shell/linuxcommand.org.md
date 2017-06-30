thanks :) http://linuxcommand.org/wss0010.php
## Writing Script
```aidl
#!/bin/bash
# My first script helloworld.sh

echo "Hello World!"
```

* _#!/bin/bash_:   
  The first line of the script is important. This is a special clue given to the shell indicating what program is used to interpret the script. In this case, it is /bin/bash. Other scripting languages such as perl, awk, tcl, Tk, and python can also use this mechanism.
  
* _# My first script_:   
This line is comment

* _echo "Hello World"_:  
 To read print message **echo** command
 

## Setting permissions
Shell need permission to execute script. Its done with _chmod_ command. Use following command to execute file 
```
chmod 700 filename
```

### chmod
file has _user_, _group_ and _others_ permission which can be set using octal number or symbols.
* Decimal Numbers:
```shell
$ chmod 777 filename

Decimal      Octal (Read, Write, Execute)
-------      ------------------------------
             user         group       other
777          {111}        {111}       {111}
```
* Symbols mode:
```
$ chmod uog=rwx filename
$ chmod uog+w filename
$ chmod og-x filename

* u : user
* o : other
* g : group
* r : read
* w : write
* x : execute
* + : to add permission on right 
* - : to remove permission
* = : to assign permission
```

## Run script
```
$ ./helloworld.sh

# if PATH is set script name can directly run
$ helloworld.sh
```
When command runs shell looks for executable under pre-defined directory structure. It is specified with _PATH_. Its *":"* colon separated list of path

```aidl
# to print path
$ echo $PATH

# to add new value to path use export
$ export PATH=$PATH:directory
```
better way is to make this entry in _.bash_profile_ file that way path is always loaded once user logged in.

## Commands, commands everywhere
Command are executables they are roughly two types,
* _Build in_: pwd, cd etc
* _Executables_: one mentioned in $PATH locations

## Aliases
Aliases help use create custom commands. It save efforts to type and remember.  
It can also be created on command line directly but then they will only last for session. If we add it to _.bash_profile_ then custom command are available every time.
```
# in .bash_profile
alias l='ls -l'

$ alias l='ls -l'
```

##  Shell functions
Aliases are simple if more complex operation is needed user _Shell Functions_. **function** is shell built in. 
```aidl
$ function today {
    echo "Today's date is:"
    date +"%A, %B %-d, %Y"
}

$ today
Today's date is:
Wednesday, June 28, 2017
```
## type
There are many commands type displays the type of the command it is
```
$ type command

ex:
$ type node
/Users/ax/.nvm/versions/node/v7.7.1/bin/node
```
## .bashrc
_./bashrc_ is file in home directory intended to keep _Aliases_, _function_ and other things.  
When possible not use _.bash_profile_ for such config as it already includes _.bashrc_.

```
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

## Writing an HTML file with a script

First approach 

```aidl
#!/bin/bash

# make_page - A script to produce an HTML file

echo "<HTML>"
echo "<HEAD>"
echo "  <TITLE>"
echo "  The title of your page"
echo "  </TITLE>"
echo "</HEAD>"
echo ""
echo "<BODY>"
echo "  Your page content goes here."
echo "</BODY>"
echo "</HTML>"
```


```
$ make_page > page.html
```

Better version is to replace use of **echo** command. It can be done with _IO Redirection_. In below example we utilize _IO Redirection_ to feed input text to _cat_ command,

```
# token can be any string of characters
command << token
content to be used as command's standard input
token
```

Even better for readability of code is to use **<<-** instead of _<<_.   

Changing the the "<<" to "<<-" causes bash to ignore the leading tabs (but not spaces) in the here script. The output from the cat command will not contain any of the leading tab character.

```aidl
#!/bin/bash

# make_page - A script to produce an HTML file

cat <<- _EOF_
<HTML>
<HEAD>
    <TITLE>
    The title of your page
    </TITLE>
</HEAD>

<BODY>
    Your page content goes here.
</BODY>
</HTML>
_EOF_
```

## Variables
* vairable are assigned directly _var_name=var_value_
* No space around =
* When want to substitute use _$var_name_
```aidl
#!/bin/bash

# make_page - A script to produce an HTML file
title="The title of your page"
cat <<- _EOF_
<HTML>
<HEAD>
    <TITLE>
    $title
    </TITLE>
</HEAD>

<BODY>
    Your page content goes here.
</BODY>
</HTML>
_EOF_
```

Trick with echo
```aidl
# this prints all files in directly
$ echo *
```

## Environment Variables
these set of variable are already available with the shell by convetino they are upper case.  

```aidl
#  to print all environment valirables
$ printenv
```

Now lets include env variable HOSTNAME and time file is created.
```aidl
#!/bin/bash

# make_page - A script to produce an HTML file

title="System Information for"

cat <<- _EOF_
    <HTML>
    <HEAD>
        <TITLE>
        $title $HOSTNAME
        </TITLE>
    </HEAD>

    <BODY>
    <H1>$title $HOSTNAME</H1>
    <P>Updated on $(date +"%x %r %Z") by $USER
    </BODY>
    </HTML>
_EOF_

```

*"$( )"* tell the shell, "substitute the results of the enclosed command. 

```
$(date +"%x %r %Z")
```

## --help and other tricks
Get command help
```
$ command --help 
$ command --help | less
```
Get executable file path of command
```aidl
$ which command
```

**strings** command will print human readable content in the file
```
$ strings /bin/bash
```

## Assign command result to variable

Variable can be assigned command and can be substituted

```
$ right_now=$(date +"%x %r %Z")
$ time_stamp="Updated on $right_now by $USER"
```

## Constants

If a value is intended to be a constant, it is simply given an uppercase name.
```
#!/bin/bash

# make_page - A script to produce an HTML file

TITLE="System Information for $HOSTNAME"
RIGHT_NOW=$(date +"%x %r %Z")
TIME_STAMP="Updated on $RIGHT_NOW by $USER"

cat <<- _EOF_
    <HTML>
    <HEAD>
        <TITLE>
        $TITLE
        </TITLE>
    </HEAD>

    <BODY>
    <H1>$TITLE</H1>
    <P>$TIME_STAMP
    </BODY>
    </HTML>
_EOF_
```
## Quoting
Quoting is used to accomplish two goal
1. To control (i.e., limit) substitutions and
2. To perform grouping of words.

```aidl
TITLE="System Information for $HOSTNAME"
RIGHT_NOW=$(date +"%x %r %Z")
TIME_STAMP="Updated on $RIGHT_NOW by $USER"
```
### Single and double quotes

Single quote stops substitution.  
Double quote only supresses wild card chars _$ echo "*"_ will only print _"*"_  
In double quote string \ is used to escape meaning of special characters
```
var="this is some text"
var='this is some text'

$ echo "My host name is $HOSTNAME."
My host name is linuxbox.

$ echo 'My host name is $HOSTNAME.'
My host name is $HOSTNAME.

$ echo "My host name is \$HOSTNAME."
My host name is $HOSTNAME.

$ echo "My host name is \"$HOSTNAME\"."
My host name is "linuxbox".
```
### Other backslash tricks
why tow version of flag or option in command. Long one is for better readability so in case using command in shell use long version instead of short

```aidl
ls -r
ls --reverse
```

Instead of putting entire command on one line split option on multi line using escape char "\\" . it should follow by enter immideagely.
```aidl
ls -l \
   --reverse \
   --human-readable \
   --full-time
```
Shell also support following escape characters.  
 
* \\n newline,  
* \\t tab, 
* \\a alert and 
* slash \\ 
 
## Shell Functions
Functions should adhere following rules,
* function must appear before use
* it should contain least one valid command

Best practices,
* divide task in functions
* every function should be stub (dummy data) till implemented

```
#!/bin/bash

# system_page - A script to produce an system information HTML file

##### Constants

TITLE="System Information for $HOSTNAME"
RIGHT_NOW=$(date +"%x %r %Z")
TIME_STAMP="Updated on $RIGHT_NOW by $USER"

##### Functions

function system_info
{
    # Temporary function stub
    echo "function system_info"
}


function show_uptime
{
    # Temporary function stub
    echo "function show_uptime"
}


function drive_space
{
    # Temporary function stub
    echo "function drive_space"
}


function home_space
{
    # Temporary function stub
    echo "function home_space"
}




##### Main

cat <<- _EOF_
  <html>
  <head>
      <title>$TITLE</title>
  </head>

  <body>
      <h1>$TITLE</h1>
      <p>$TIME_STAMP</p>
      $(system_info)
      $(show_uptime)
      $(drive_space)
      $(home_space)
  </body>
  </html>
_EOF_
``` 

## Some Real Work
show_uptime function
```aidl
function show_uptime
{
    echo "<h2>System uptime</h2>"
    echo "<pre>"
    uptime
    echo "</pre>"
}
```

drive_space function
```aidl
function drive_space
{
    echo "<h2>Filesystem space</h2>"
    echo "<pre>"
    df
    echo "</pre>"
}
```

home_space function
```aidl
function home_space
{
    echo "<h2>Home directory space by user</h2>"
    echo "<pre>"
    echo "Bytes Directory"
    du -s /home/* | sort -nr
    echo "</pre>"
}
```

## Flow Control - Part 1


 





