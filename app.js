var express = require('express');
var cors = require('cors');
var Twit = require('twit');
var serverPort = 3000;

var app = express();

var T = new Twit({
  consumer_key:         config.TConsumerKey,
  consumer_secret:      config.TConsumerSecretKey,
  access_token:         config.TAccessToken,
  access_token_secret:  config.TAccessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
})

app.use(express.static("./public"));

app.listen(serverPort);

console.log(`Server running on port ${serverPort]`)