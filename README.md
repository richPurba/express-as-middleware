# express-as-middleware

## WHAT
This is a routing processes for Express for front-end developers. Some of the routing libs from Angular/React are less scalable, especially in managing loads of requests.

## Redis
To use the redis, you should run the following command under directory [cache](cache): ```docker run --name redis-for-express -p 6379:6379 -d  redis-for-express``` The data is bound under data/folder. See [Dockerfile](cache/Dockerfile) for more detail. The redis.conf is configured such that the protection mode is off and binding to container host (not your localhost) is off.
