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

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_gAH4qjl2YIK1yAN5zBywEN67");



//======== SSL certification files ==========================//

var options = {
    key: fs.readFileSync('my-server.key.pem', 'utf8').toString(),
    cert: fs.readFileSync('maddieandshaine.com.crt', 'utf8').toString(),
    ca: [fs.readFileSync('maddieandshaine.com1.crt', 'utf8').toString(),
         fs.readFileSync('maddieandshaine.com2.crt', 'utf8').toString(),
         fs.readFileSync('maddieandshaine.com3.crt', 'utf8').toString()]
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

// app.post('/api/confirm', function(req, res){
//    
//     console.log('some string');
//    
//     var stripeToken = req.body.stripeToken;
//
//     var charge = stripe.charges.create({
//         amount: req.body.price, // amount in cents, again
//         currency: "usd",
//         source: stripeToken,
//         description: "Example charge"
//     }, function(err, charge) {
//         if (err && err.type === 'StripeCardError') {
//             // The card has been declined
//             res.send(err);
//         }else{
//             res.send(charge);
//         }
//     }); 
//    
// });


    var stripeToken = req.body.stripeToken;

    var charge = stripe.charges.create({
        amount: 1000,
        currency: 'usd',
        source: stripeToken,
        description: 'example'
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError'){
            console.log(err);
        } else{
            res.send(charge);
        }
    });


//======= Set up server =======//



http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);


https.createServer(options, app).listen(443, function(){
    console.log('damnit pat');
});


// on your terminal under your root of the project, run node server.js
// or npm install -g nodemon. Then run nodemon server.js, and that restarts the server whenever anything is changed
// all the console logs on this page, and the controllers it requires, are on the terminal

