var express = require('express');
var router = express.Router();

const passport = require('passport');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('vw-home', { title: 'Catalog Tracker App' });
// });

router.get('/', passport.authenticate('github'));

router.get('/auth_t0d', passport.authenticate('github', {
  successRedirect: '/home',
  failureRedirect: '/loginFailed'
}));

module.exports = router;