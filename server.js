var express = require('express');
var app =  express();
var path = require('path');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var index = require('./modules/login');
var campuslist = require('./modules/campuslist');
var usercampus = require('./modules/usercampus');
var mongoose = require('mongoose');
var sessions = require('express-session');


//global variables
var session;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sessions({secret: "875ty5c07ty05yt039mc8idh", resave: false, saveUninitialized:true}));
/*
app.get('/', function(req,res)
{
	res.sendFile(path.join(__dirname + '/index.html'));
});*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/integ_test');

/*var user1 = new usercampus({ 	name: 'anupam' }); user1.save();*/

app.use(function(req, res, next) //CORs request handle, coss origin resourse sharing
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested=With, content-type, \ Authorisation');

	next();
});

app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.post('/login', index.checks);
/*app.use('/campuslist',campuslist.validtoken);*/

app.get('/', function(req, res, next){
	res.render(__dirname + '/public/angular.ejs')
});

app.post('/campuslist', campuslist.validtoken/*usercampus.getcampuslist*/);

app.use(express.static(__dirname + '/public'));
/*app.get('/login', function(req,res,next){
	res.render(__dirname + '/view/campuslist.ejs')
});*/
	
app.listen(port);
console.log('let see this port works or not');

