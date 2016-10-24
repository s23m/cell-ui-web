// init project
var express = require('express');
var app = express();

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/src/app.html');
});

app.get("/app.js", function (request, response) {
  response.sendFile(__dirname + '/src/app.js');
});

listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
