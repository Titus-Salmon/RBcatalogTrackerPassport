var express = require('express');
var router = express.Router();

const passport = require('passport');

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('vw-home', {
//     title: 'Catalog Tracker App'
//   });
// });

router.get('/', passport.authenticate('github'));

router.get('/auth_t0d', function (req, res, next) {
  passport.authenticate('github', {
    // successRedirect: '/',
    failureRedirect: '/loginFailed'
  })
  res.render('vw-home', {
    title: 'Catalog Tracker App'
  });
})


module.exports = router;