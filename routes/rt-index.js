var express = require('express');
var router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth-t0dt1tz1');

// const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('vw-index', {
    title: 'vw-index'
  });
});

/* GET dashboard page. */
router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
  res.render('vw-dashboard', {
    title: 'vw-dashboard',
    username: req.user.name
  });
});

// router.get('/login', passport.authenticate('github'));

// router.get('/auth_t0d', passport.authenticate('github'));

// router.get('/auth_t0d', passport.authenticate('github', {
//   successRedirect: '/',
//   failureRedirect: '/loginFailed'
// }));

// router.get('/Andrea',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function (req, res) {
//     res.render('vw-andrea', {
//       user: req.user
//     });
//   });

// router.get('/Andrea',
//   require('connect-ensure-login').ensureLoggedIn());

module.exports = router;