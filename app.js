const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const bodyParser = require('body-parser'); //t0d //Node.js body parsing middleware. Parse incoming request bodies in a
// //middleware before your handlers, available under the req.body property.
const helmet = require('helmet'); //t0d

const mongoose = require('mongoose'); //t0d
const flash = require('connect-flash'); //t0d

//v//==>Needed for Passport
const session = require('express-session');
const passport = require('passport'); //t0d
// const GitHubStrategy = require('passport-github').Strategy; //t0d
//^//==>Needed for Passport

//passport config
require('./config/passport-t0d')(passport);

//Mongo DB config
const db = require('./config/keys').MongoURI; //t0d

//Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('mongodb connected')
  })
  .catch(err => console.log(err)); //t0d

var indexRouter = require('./routes/rt-index');
const homeRouter = require('./routes/rt-home'); //t0d
// const dbInputRouter = require('./routes/rt-dbInput'); //t0d
// const dbSearchRouter = require('./routes/rt-dbSearch'); //t0d
// const dbEditRouter = require('./routes/rt-dbEdit'); //t0d
// const editEntryRouter = require('./routes/rt-editEntry'); //t0d
// const editEntryAndreaRouter = require('./routes/rt-editEntryAndrea'); //t0d
// const noRecordsRouter = require('./routes/rt-noRecords'); //t0d
// const loginRouter = require('./routes/rt-login'); //t0d
const andreaRouter = require('./routes/rt-andrea'); //t0d
const usersRouter = require('./routes/rt-users'); //t0d

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({ //t0d //bodyParser = middleware
//  extended: false
//}));
// app.use(bodyParser.json());//t0d
app.use(helmet()); //t0d

//v//==>Passport config-mixing tuts (bunch + traversy) //t0d
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: {
  //   secure: true
  // }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// const passportConfig = require('./passport-config_t0d');
// passport.use(new GitHubStrategy(
//   passportConfig,
//   function (accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({
//     //   githubId: profile.id
//     // }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     // console.log('profile===>>', profile);
//     return cb(null, profile);
//   }
// ));
// passport.serializeUser((user, cb) => {
//   cb(null, user);
// })
// passport.deserializeUser((user, cb) => {
//   cb(null, user);
// })
//^//==>Passport config //t0d


//GLOBAL VARIABLES (t0d from traversy)
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//v//==>NOTE: THESE ROUTES MUST COME AFTER THE GLOBAL VARIABLES, OR THE GLOBAL VARIABLES WON'T WORK FOR THOSE PAGES
app.use('/', indexRouter);
app.use('/home', homeRouter); //t0d
// app.use('/dbInput', dbInputRouter); //t0d
// app.use('/dbSearch', dbSearchRouter); //t0d
// app.use('/dbEdit', dbEditRouter); //t0d
// app.use('/editEntry', editEntryRouter); //t0d
// app.use('/editEntryAndrea', editEntryAndreaRouter); //t0d
// app.use('/noRecords', noRecordsRouter); //t0d
// app.use('/login', loginRouter); //t0d
app.use('/Andrea', andreaRouter); //t0d
app.use('/users', usersRouter); //t0d
//^//==>NOTE: THESE ROUTES MUST COME AFTER THE GLOBAL VARIABLES, OR THE GLOBAL VARIABLES WON'T WORK FOR THOSE PAGES

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;