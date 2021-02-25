var passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuario = require("../models/usuario");

passport.use(new localStrategy(
    { 
      usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
      passwordField: 'password'
    },
    function(email, password, done){
        Usuario.findOne({email: email}, function(err, usuario){
            if(err) return done(err)
            if(!usuario) return done(null, false, {message: 'Email no existente o incorrecto'});
            if (!usuario.validPassword(password)) return done(null, false, {message: 'Password no existente o incorrecto'});
  
            return done(null, usuario)
        })
    }
  ));

passport.serializeUser(function (user,cb) {
    cb(null,user.id);
})

passport.deserializeUser(function (id,cb) {
    Usuario.findById(id,function (err) {
        cb(err,usuario);
    })
})

module.exports = passport;