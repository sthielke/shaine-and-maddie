//============================================//
//================SERVER PAGE=================//
//============================================//


//======== Require dependencies from package.json ========//
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport.js');



//======== SSL certification files ==========================//

var options = {
    key: fs.readFileSync('my-server.key.pem').toString(),
    cert: fs.readFileSync('intermediate.crt').toString(),
    ca: [fs.readFileSync('maddieandshaine.com1.crt').toString(),
         fs.readFileSync('maddieandshaine.com2.crt').toString(),
         fs.readFileSync('maddieandshaine.com3.crt').toString()]
    };

//========== create service ================================//

var app = express();

//======== Connect and name your database in mongodb =========//

mongoose.connect('mongodb://localhost/registry');

//======== requiring api contrtoller ========//
var authenticationController = require('./controllers/authentication.js');
var apiController = require('./controllers/api.js');

//========= Express config, look at documentation =========//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/app'));

// more passport stuff
app.use(cookieParser());
app.use(flash());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// initializing a passport session
app.use(passport.initialize());

app.use(passport.session());

app.post('/auth/login', authenticationController.processLogin);


app.post('/auth/signup', authenticationController.processSignup);


app.get('/auth/logout', authenticationController.logout);

//======== Single page being rendered for ==========//
app.get('/', function(req, res){
    res.sendFile('index.html', { root : './app' })
});

app.get('/userinfo', authenticationController.getUser);

//======= api routes =========//
app.post('/api/product', apiController.post);
app.get('/api/product', apiController.get);
app.put('/api/product/:id', apiController.put);
app.get('/api/product/:id', apiController.get);
app.delete('/api/product/:id', apiController.delete);

app.use(passportConfig.ensureAuthenticated);

//======= Set up server =======//



// http.createServer(app).listen(80, function(){
//     console.log('port 8080')
// });

https.createServer(options, app).listen(443, function(){
   console.log('damnit pat'); 
});


// on your terminal under your root of the project, run node server.js
// or npm install -g nodemon. Then run nodemon server.js, and that restarts the server whenever anything is changed
// all the console logs on this page, and the controllers it requires, are on the terminal

