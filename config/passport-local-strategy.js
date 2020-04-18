const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require ('../models/doctor');

//authentication using passport 
passport.use(new LocalStrategy({
        usernameField: 'username',
        passReqToCallback:true,
    },
        function (req, username, password, done) {
            //find a user and establish identity
            userSchema.findOne({username: username},function(err,doctor){
                if(err){
                    return done(err);
                }

                if(!doctor || doctor.password != password){
                        return done(null,false);
                }

                return done(null,doctor);
            });
        }
));

//serializing the user to decide which key is kept in the cookie

passport.serializeUser(function (user, done) {
    done(null, user.id); 
});



//deserializing the user from the key in the cookie

passport.deserializeUser(function (id, done) {
    userSchema.findById(id, function (err,user) {
        if(err){
            console.log("Error in finding user");
            return done(err);
        }
        return done(null,user);
    });
});

//check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
    //if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are sending this to the locals use
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
