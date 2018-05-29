//this is only an example, handling everything is yours responsibilty !

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var util = require('util')
var cors = require('cors');
var morgan = require('morgan');
var Connection = require('tedious').Connection;
//app.use(cors());
var DButilsAzure = require('./DButils');
var poi = require('./poi');
var general = require('./general');
var registeredUsers = require('./registeredUsers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/poi', poi);
app.use('/registeredUsers', registeredUsers);
app.use('/general', general);

var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

