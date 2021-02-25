var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletaRouter = require("./routes/bicicletas");
var bicicletasAPIRouter = require("./routes/API/bicicletas");
var usuarioAPIRouter = require("./routes/API/usuario")
var tokenRouter = require('./routes/token');
var usuarioRouter = require('./routes/usuario');
var authAPIRouter = require('./routes/API/auth');

const Usuario = require('./models/usuario');
const Token = require('./models/Tokens');

const store = new session.MemoryStore;



var app = express();


var mongoose = require("mongoose");
var mongodb = 'mongodb://localhost/red_bicicletas';
mongoose.connect(mongodb, {useNewUrlParser : true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('secretKey', 'jwt_pwd_!!223344');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login',function (req,res) {
  res.render('session/login');
})

app.post('/login',function (req,res,next) {
  passport.authenticate('local',function (err,user, info) {
    if (err) return next(err);
    if (!user) return res.render('session/login',{info});
    req.logIn(user,function (err) {
      if (err) return next(err);
      return res.redirect('/');
    })
  })(req,res,next)
})

app.get('/logout',function (req,res) {
  req.logOut();
  res.redirect('/');
})

app.get('/forgotPassword',function (req,res) {
  
})

app.post('/forgotPassword',function (req,res) {
  
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/bicicletas",bicicletaRouter);
app.use('/API/bicicletas', loggedIn,bicicletasAPIRouter);
app.use('/API/usuarios', usuarioAPIRouter);
app.use('/API/bicicleta', validarUsuario, bicicletaRouter);
app.use('/token',tokenRouter);
app.use('/token',usuarioRouter);
app.use('/API/auth', authAPIRouter)
app.use(session({
  cookie: {maxAge: 480 *60 *60 +1000},
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicis!'

}))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function loggedIn(req,res,next) {
  if (req.user) {
    next();
  } else {
    console.log('user sin logearse');
    res.redirect('/');
  }
}

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({status: "error", message: err.message, data: null});
    } else {

      req.body.userId = decoded.id

      console.log('jwt verifyt: ', decoded);

      next();
    }
  });
}


module.exports = app;
