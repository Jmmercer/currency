var express = require('express'),
	http = require('http');

http.globalAgent.maxSockets = 10600
http.globalAgent.keepAlive = true

//Set packages
var errorhandler = require('errorhandler'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),

	app = express();
	port = 8888;

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
			if ('OPTIONS' == req.method) {
				res.send(200);
			} else {
				next();
			}
	});

	app.disable('x-powered-by');
	app.use(helmet());

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))


	// routes ======================================================================
	require('./routes.js')(app); // load our routes and pass in our app

	// launch ======================================================================
	app.listen(port);

	console.log('available at localhost:' + port);