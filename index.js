const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
//const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);




//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine','ejs');
app.set('views','./views');



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
app.use(flash());
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

