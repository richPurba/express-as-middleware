var express = require('express');
var router = express.Router();
var redis = require('redis');
var redisClient = redis.createClient();

// Assume this is a database
var collections = {
  Rich: 123,
  Alessandro: 455,
  Martin: 789,
  Emma: 1012,
  Grace: 1114
}

var locations = {
  Rich: "Amsterdam",
  Alessandro: "Schiedam",
  Martin: "Utrecht"
}

// Callback  for Query Parameter
var queryParam = function(request,response,next) {
  if(!request.query.q){
    console.log(3);
    return next(); // after return, you won't get the following line
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

    if(!reply && isUserAvailable(request)){
      console.log(7);
      answer[request.params.userId] = collections[request.params.userId];
      response.send(answer);
      return;
    } 
    console.log(8);
    if(!isUserAvailable(request)){
      response.redirect('/');// TODO: redirect to back res.redirect('back')  , https://en.wikipedia.org/wiki/HTTP_referer 
      return;
    }
    answer[request.params.userId] = reply;
    response.send(answer);   
  });
  //TODO: HEADER, https://expressjs.com/en/4x/api.html#res.append
}

var isUserAvailable = function(requestObject){
  return collections[requestObject.params.userId] ? true : false;
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
  if(reply === null && isUserAvailable(request) ){
    console.log(2);
      redisClient.set(request.params.userId.toLowerCase(),collections[request.params.userId]?collections[request.params.userId]: Math.random() );
     }
  });
  next(); // no return here
}, [queryParam,namedParam]);


module.exports = router;  // NOTE!
