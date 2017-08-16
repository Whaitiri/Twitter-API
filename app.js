var express = require('express');
var cors = require('cors');
var Twit = require('twit');
var config = require('./config');
var path = require('path');
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
	next();
})

app.use(express.static("./public"));
app.use('/scripts', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get("/search=:term", function(request, response){
	var term = request.params.term;
	var params = {q:term, count:10};
	T.get("search/tweets", params, function(error, tweets, twitterResponse){
		if(!error) {
			response.json(tweets.statuses);
		}
	});
});

app.get("/trends", function(request, response){
	var term = request.params.term;
	var params = {id: 23424916};
	T.get("trends/place", params, function(error, trends, twitterResponse){
		if(!error) {
			response.json(trends);
		}
	});
});

app.listen(serverPort);

console.log(`Server running on port ${serverPort}`)