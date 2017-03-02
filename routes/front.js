var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();

// middleware that is specific to this router
router.use(function (req, res, next) {
	next();
});

router.get('/', jsonParser, function(req, res){
    res.status(200).send('Use /api/0.1 as end point');
    res.end();
});

router.post('/', jsonParser, function(req, res){
    res.status(200).send('Use /api/0.1 as end point');
    res.end();
});

module.exports = router;