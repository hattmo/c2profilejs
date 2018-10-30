# C2 Profile JS

[![Build Status](https://travis-ci.org/hattmo/c2profilejs.svg?branch=master)](https://travis-ci.org/hattmo/c2profilejs)

## About

C2 Profile JS is a web app designed to ease the generation of C2 profiles for the implant tool [Cobalt Strike](https://www.cobaltstrike.com/).  C2 profiles are not overly complex but when red teams need to adapt to BLUEFOR on the fly, time is a critical factor.  C2 Profile JS can improve turnaround time for C2 profiles and reduce chances of error.

## Dependencies

* Nodejs
* Java

## How to

C2 Profile is best used through the docker container hattmo/c2profilejs.

~~~bash
docker run --rm -d -p 3000:80 --name c2profilejs hattmo/c2profilejs:latest
~~~

then navigate to <http://localhost:3000> to begin using the tool.
___
C2 Profile JS can be built and ran from source with the following commands

~~~bash
npm install
npm run build
npm start
~~~

Java keytool must be accessable from the path the program is run.
___

## Author

Designed and maintained by [Matthew Howard](https://www.linkedin.com/in/matthew-howard-4013ba87/)
