const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());
app.use(cookieParser());



app.use(session({
    name:'Node_Covid',
    //TODO change the secret before deployment in the production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },store:new MongoStore({
            
                mongooseConnection:db,
                autoRemove:'disabled'
            
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passportLocal.initialize());
app.use(passportLocal.session());

//app.use(customMware.setFlash);
app.use(passportLocal.setAuthenticatedUser)

//use express router
app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        //console.log('Error',err);
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
});

