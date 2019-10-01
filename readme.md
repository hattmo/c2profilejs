# C2 Profile JS

[![Build Status](https://travis-ci.org/hattmo/c2profilejs.svg?branch=master)](https://travis-ci.org/hattmo/c2profilejs)

## 🚧 UNDER CONSTRUCTION 🚧

I'm in the process of updating the look and feel of the UI so some of the components are unstyled, but all the functionality is still there.

## About

C2 Profile JS is a web app designed to ease the generation of C2 profiles for the implant tool [Cobalt Strike](https://www.cobaltstrike.com/).  C2 profiles are not overly complex but when red teams need to adapt to BLUEFOR on the fly, time is a critical factor.  C2 Profile JS can improve turnaround time for C2 profiles and reduce chances of error.

## Dependencies

### Development

* Nodejs
* Java

### Production

* Docker

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

## Configuration

The environment variable APP_ROOT can be set if the app is hosted on a subdirectory of the domain.

~~~bash

# Must begin with a slash and end without a slash
APP_ROOT=/c2profilejs

# Or be a FQDN with no trailing slash

APP_ROOT=http://hattmo.com/c2profilejs

~~~

## Author

Designed and maintained by [Matthew Howard](https://www.linkedin.com/in/matthew-howard-4013ba87/).

Support me with a [donation](https://www.paypal.me/hattmo)!
