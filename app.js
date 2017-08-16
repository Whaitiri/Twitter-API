var express = require('express');
var serverPort = 3000;

var app = express();

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
})

app.use(express.static("./public"));

app.listen(serverPort);

console.log(`Server running on port ${serverPort]`)