var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/', routes);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(8000, function() {
  console.log('You are on port 8000');
})
module.exports = app;
