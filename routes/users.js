var express = require('express');
var router = express.Router();
var {v1: uuidv1} = require('uuid');
var redis = require('redis');
var redisClient = redis.createClient();


var collections = {
  Rich: 123,
  Alessandro: 455,
  Martin: 789
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(collections);
});

/* GET user by id*/
router.get('/:userId', function(request,response){ //NOTE: see that the req/request are 2 of the same thing!

  // Trying to cache
  redisClient.get(request.params.userId.toLowerCase(), (err,reply) => {
     if(reply === null){
      redisClient.set(request.params.userId.toLowerCase(),collections[request.params.userId]);
     }
  });
  var answer = {};
  redisClient.get(request.params.userId.toLowerCase(),(err,reply) => {
    answer[request.params.userId] =  reply;
    response.send(answer);
  });
});


module.exports = router;
