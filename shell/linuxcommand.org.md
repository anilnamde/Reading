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

Commands to controls the flow,
#### if    
it makes a decision based on the exit status of a command. 
```aidl
if commands; then
commands
[elif commands; then    
commands...]
[else
commands]
fi
```
#### test:  
When command terminates it return int value that is Exit Status. _0_ is success and non zero is failure.
```aidl
# $? returns exit code of last executed command
$ ls -d /usr/bin
/usr/bin
$ echo $?
0
$ ls -d /bin/usr
ls: cannot access /bin/usr: No such file or directory
$ echo $?
2
```

_true_ and _false_ also returns exit code
```aidl
$ true
$ echo $?
0
$ false
$ echo $?
1

ex: 
$ if true; then echo "It's true."; fi
```

#### test  
The test command is used most often with the if command to perform true/false decisions. It has two forms,

```aidl
# First form

test expression

# Second form
# space between [, ] and expression is required
[ expression ]
```
Example: 

```aidl
# -f check if .bash_profile is a file
if [ -f .bash_profile ]; then
    echo "You have a .bash_profile. Things are fine."
else
    echo "Yikes! You have no .bash_profile!"
fi
```

Expression | Description
----------- | ----------------
-d _file_| True if file is a directory.
-e _file_|  True if file exists.
-f _file_|True if file exists and is a regular file.
-L _file_|True if file is a symbolic link.
-r _file_|True if file is a file readable by you.
-w _file_|True if file is a file writable by you.
-x _file_|True if file is a file executable by you.
file1 -nt file2|True if file1 is newer than (according to modification time) file2
file1 -ot file2|True if file1 is older than file2
-z _string_|True if string is empty.
-n _string_|True if string is not empty.
string1 = string2|True if string1 equals string2.
string1 != string2|True if string1 does not equal string2.

#### Semicolon
The semicolon is a command separator. Using it allows you to put more than one command on a line
```aidl
$ clear; ls
```

#### exit
_exit_ command sets exit status when script finishes. 
```aidl
exit 0;
exit 1;
```

example: Testing root user  
_>&2_  is used in below script to redirect error to standard error instead of standart output which is console
```aidl
# id -u command is used for getting user id if its 0 then its root user
if [ $(id -u) = "0" ]; then
    echo "superuser"
fi

if [ $(id -u) != "0" ]; then
    echo "You must be the superuser to run this script" >&2
    exit 1
fi
```

example: so with new understanding example to print home space is as follows
```aidl
function home_space
{
    # Only the superuser can get this information

    if [ "$(id -u)" = "0" ]; then
        echo "<h2>Home directory space by user</h2>"
        echo "<pre>"
        echo "Bytes Directory"
            du -s /home/* | sort -nr
        echo "</pre>"
    fi

}   # end of home_space
  
```

# Stay Out Of Trouble

#### Common issues
* _empty variables_: in case variable is not initialized
    ```aidl
    number=
    ```
* Missing quotes: 
    ```
    str="something... 
    ```

#### Isolating problem
* _comments_: comment block of code to narrow issue
* _use echo_: to print where exactly script is and also to print variables and calculations.
* _trace_:    
trace can be enabled by adding -x in shebang for bash script
    ```aidl
    #!/bin/bash -x
    ```
    
    Trace can be turned on and off for a block so code using _set -x_ _set +x_ below  
    ```aidl
    #!/bin/bash
    
    number=1
    
    set -x
    if [ $number = "1" ]; then
        echo "Number equals 1"
    else
        echo "Number does not equal 1"
    fi
    set +x
    ```

## Keyboard Input And Arithmetic
#### read
-n with echo ensure to keep the cursor on the same line.  
read can take two flags  
_-t [n]_ to timeout if user does not enter input.  
_-s_ is silent mode input chars will not be visible  
```aidl
#!/bin/bash

echo -n "Enter some text > "
read text
echo "You entered: $text"
```

```aidl
#!/bin/bash

echo -n "Hurry up and type something! > "
if read -t 3 response; then
    echo "Great, you made it in time!"
else
    echo "Sorry, you are too slow!"
fi
```

#### Arithmetic
note double _()_ around number shell with these perform arithmatic operation
```
$ echo $((2+2))
```
> Note: variables not referred with _$_ when used in arithmatic  
>
```aidl
#!/bin/bash

first_num=0
second_num=0

echo -n "Enter the first number --> "
read first_num
echo -n "Enter the second number -> "
read second_num

echo "first number + second number = $((first_num + second_num))"
echo "first number - second number = $((first_num - second_num))"
echo "first number * second number = $((first_num * second_num))"
echo "first number / second number = $((first_num / second_num))"
echo "first number % second number = $((first_num % second_num))"
echo "first number raised to the"
echo "power of the second number   = $((first_num ** second_num))"
```

Following is example to assign to arithmetic calculation
```aidl
#!/bin/bash

seconds=0

echo -n "Enter number of seconds > "
read seconds

hours=$((seconds / 3600))
seconds=$((seconds % 3600))
minutes=$((seconds / 60))
seconds=$((seconds % 60))

echo "$hours hour(s) $minutes minute(s) $seconds second(s)"
```
## Flow Control - Part 2
#### Case
patterns: chould be string, wildcard. Multiple patterns can be matched with _|_ 
```aidl
case word in
    patterns ) commands ;;
esac
```

ex:
```aidl
#!/bin/bash

echo -n "Enter a number between 1 and 3 inclusive > "
read character
case $character in
    1 ) echo "You entered one."
        ;;
    2 ) echo "You entered two."
        ;;
    3 ) echo "You entered three."
        ;;
    * ) echo "You did not enter a number between 1 and 3."
esac
```

ex:
```aidl
#!/bin/bash

echo -n "Type a digit or a letter > "
read character
case $character in
                                # Check for letters
    [[:lower:]] | [[:upper:]] ) echo "You typed the letter $character"
                                ;;

                                # Check for digits
    [0-9] )                     echo "You typed the digit $character"
                                ;;

                                # Check for anything else
    * )                         echo "You did not type a letter or a digit"
esac
```

#### Loop 
##### While
```aidl
#!/bin/bash

number=0
while [ "$number" -lt 10 ]; do
    echo "Number = $number"
    number=$((number + 1))
done
```

##### Until
```
#!/bin/bash

number=0
until [ "$number" -ge 10 ]; do
    echo "Number = $number"
    number=$((number + 1))
done

```
#### for



## Example menu
```aidl
#!/bin/bash

press_enter()
{
    echo -en "\nPress Enter to continue"
    read
    clear
}

selection=
until [ "$selection" = "0" ]; do
    echo "
    PROGRAM MENU
    1 - display free disk space
    2 - display free memory

    0 - exit program
"
    echo -n "Enter selection: "
    read selection
    echo ""
    case $selection in
        1 ) df ; press_enter ;;
        2 ) free ; press_enter ;;
        0 ) exit ;;
        * ) echo "Please enter 1, 2, or 0"; press_enter
    esac
done
```

## Positional param
$[n]: returns nth param to shell  
$#: returns number of the command life param 
```aidl
$ command.sh one two three .. 
$0: command.sh
$1: one
$2: two
..
```
## Shift
_Shift_ command moves the command positional param to left one at a time

```
#!/bin/bash

echo "You start with $# positional parameters"

# Loop until all parameters are used up
while [ "$1" != "" ]; do
    echo "Parameter 1 equals $1"
    echo "You now have $# positional parameters"

    # Shift all the parameters down by one
    shift

done

```

