var express = require('express');
var router = express.Router();
var redis = require('redis');
var redisClient = redis.createClient();

// Assume this is a database
var collections = {
  Rich: 123,
  Alessandro: 455,
  Martin: 789
}

var locations = {
  Rich: "Amsterdam",
  Alessandro: "Schiedam",
  Martin: "Utrecht"
}

// Callback  for Query Parameter
var queryParam = function(request,response,next) {
  if(request.query.q === undefined){
    console.log(3);
    next();
  }
  var answer  = {};
  answer[request.params.userId] = locations[request.params.userId];
  console.log(4);
  response.send(answer);
}

// Callback for namedParam
var namedParam  = function(request,response) {
  console.log(5);
   redisClient.get(request.params.userId.toLowerCase(),(err,reply) => {
    console.log(6);
     var answer = {};
     answer[request.params.userId] =  reply;
     response.send(answer);
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(collections);
});

/* GET user by id*/
router.get('/:userId', function(request,response,next){ //NOTE: see that the req/request are 2 of the same thing!

  // Trying to cache
  redisClient.get(request.params.userId.toLowerCase(), (err,reply) => {
    console.log(request.params.userId);
  if(reply === null){
    console.log(2);
      redisClient.set(request.params.userId.toLowerCase(),collections[request.params.userId]);
     }
  });
  next();
}, [queryParam,namedParam]);


module.exports = router;  // NOTE!
