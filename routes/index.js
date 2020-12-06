var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/content', function(req, res, next) {
  res.render('content', { title: 'Express' });
});

router.get('/footer', function(req, res, next) {
  res.render('footer', { title: 'Express' });
});

router.get('/nav', function(req, res, next) {
  res.render('nav', { title: 'Express' });
});
router.get('/sign', function(req, res, next) {
  res.render('sign', { title: 'Express' });
});


module.exports = router;
