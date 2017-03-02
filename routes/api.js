var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    api = require('../api');

// middleware that is specific to this router
router.use(function (req, res, next) {
	next();
});

router.get('/0.1', jsonParser, function(req, res){
    res.status(200).send('This route is not available');
    res.end();
});

router.post('/0.1/', jsonParser, function(req, res){
    api.ver001(req.body, res);
});

module.exports = router;