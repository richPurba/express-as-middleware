var express = require('express');
var router = express.Router();

var {v1: uuidv1} = require('uuid');
var redis = require('redis');
var redisClient = redis.createClient();// doesn't work for

/* GET users listing. */
router.get('/', function(req, res, next) {
  var body =  req.body;
  var answer = "respond with a resource";

  redisClient.hkeys(body.username,(err,replies) => {
    console.log(replies);
    res.send(replies);
    redisClient.quit();
  });

  redisClient.set(body.username,answer,redis.print);// cached but you need to provide some mechanism to call the cache next time, instead of this one.
  res.send(answer);
  redisClient.quit();
});

/* GET user by id*/
router.get('/:userid', function(request,response){ //NOTE: see that the req/request are 2 of the same thing!
  response.send('user')
}) 


module.exports = router;
