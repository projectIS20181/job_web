const express = require('express');
const router = express.Router();
const util = require('util');

exports.router = router;

/* passport */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userModel = require('../models/User.model');

exports.initPassport = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
};

exports.ensureAuthenticated = function (req, res, next) {
    // req.user is set by Passport in the deserialize function
    if (req.user) next();
    else res.redirect('/user/login');
};
  

/* signin */
router.get('/singin',function( req, res, next) {
    res.render('singin', {title: 'ĐĂNG KÍ NHÀ TUYỂN DỤNG'});
});

router.post('/singin',function(req, res, next){
    let user = req.body;
    console.log('user:', user);
});


// todo get login
router.get('/login',function(req, res, next) {
    res.render('login', { 
        title: ' ĐĂNG NHẬP NHÀ TUYỂN DỤNG',
    });
});

// todo post login
/* router.post('/login',function(req, res, next){
    let user = req.body;
    console.log('log user router:', user);
    userModel.getUser(user)
    .then( (respone)=> {
        console.log("log router user",respone.data);
        if(respone.data.status ==="SUCCESS"){
            res.redirect('/');
        }
        else if (respone.data.status ==="FAILED"){
            res.redirect('/user/login');
        }
    })
    .catch((err) => console.log("err router user",err));
}); */

// todo kiem tra login bang passport


router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });




// todo logout
router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/');
});



// todo passport strategy local
passport.use(new LocalStrategy(
    function(username, password, done) {
        var user ={
            username: username,
            password: password,
            role: 2
        };
        console.log('passport user '+ util.inspect(user));
        
        userModel.getUser(user).then(respone => {
            var data =  respone.data;
            if(data.status ==="SUCCESS"){
                var user = data.user;
                console.log("data user: ",user);
                done(null,user) ;
            }
            if(data.status ==="FAILED"){
                console.log("data message: ", data.message);
                done(null,false,data.message);
            }
        }).catch(err => done(err));
    }
));

passport.serializeUser(function(user, done) {
    console.log('serializeUser '+ util.inspect(user));
    done(null, user.user_id);
});

passport.deserializeUser(function (user_id, done) {
    console.log('deserializeUser ' + user_id);
    usersModel.getUserById(user_id)
        .then(respone => {
            data = respone.data;
            if(data.status ==="SUCCESS"){
                var user = JSON.parse(data.user);
                console.log('... found user ' + util.inspect(user));
                done(null, user);
            }
            else {
                done(err);
            }
        })
        .catch(err => done(err));
});
  



