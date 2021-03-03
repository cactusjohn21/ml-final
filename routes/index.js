var express = require('express');
var router = express.Router();


const indexController = require('../controllers/indexController');

router.get('/', indexController.index); 
router.get('/search', indexController.search); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('users/register', { title: 'Express' });
});

module.exports = router;
