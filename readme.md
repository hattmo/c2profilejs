# C2 Profile JS

## About

C2 Profile JS is a web server designed to ease the generation of c2 profiles for the implant tool [Cobalt Strike][1].  C2 profiles are not overly complex but when red teams need to adapt to bluefor on the fly, time is a critical factor.  C2 Profile JS can improve turnaround time for C2 profiles and reduce chances of error.
## Requirements

* Nodejs
* Java

## How to

C2 Profile is best used through the docker container hattmo/c2profilejs.
~~~
docker run -d -p 3000:80 --name c2profilejs hattmo/c2profilejs
~~~

then navigate to http://localhost:80 to begin using the tool.

___

C2 Profile JS can be built and ran from source with the following commands

~~~
npm i --production
npm start
~~~

Java keytool must be accessable from the path the program is run.
___



## Author

Designed and maintained by [Matthew Howard][2]

[1]: "https://www.cobaltstrike.com/" 
[2]: "https://www.linkedin.com/in/matthew-howard-4013ba87/"
