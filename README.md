# express-as-middleware

## WHAT
This is a routing processes for Express for front-end developers. Some of the routing libs from Angular/React are less scalable, especially in managing loads of requests.

## How to make this?
please run the following on your terminal to initiate a fresh project
* ``` mkdir myapp && cd myapp && npm init ``` -> answer all the questions !
* ```npm install express --save```
* ``` npx express-generator``` (please do ```npm install npx``` if you don't have ```npx```, and yes it is not a typo)
* ```npm install ```
* ``` DEBUG=myapp:* npm start ```


## Building Express from Scratch
Please follow [these instructions](https://expressjs.com/en/starter/hello-world.html), very easy to follow.

## Redis
To use the redis, you should run the following command under directory [cache](cache): ```docker run --name redis-for-express -p 6379:6379 -d  redis-for-express``` The data is bound under data/folder. See [Dockerfile](cache/Dockerfile) for more detail. The redis.conf is configured such that the protection mode is off and binding to container host (not your localhost) is off.
