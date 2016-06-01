"use strict";
var OAuth = require('oauth');
var qs = require('querystring');
var moment = require('moment');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Jawbone = require('../dist/Jawbone').Jawbone;

app.use(cookieParser());
app.use(session({secret: 'bigSecret'}));
app.listen(3000);


var options = {
    client_id: "lIi8OMlenRU",
    client_secret: "e5eedf664371cea451a4ca43e938cf9829e813f9",
    scope: "basic_read extended_read location_read friends_read mood_read mood_write move_read move_write sleep_read sleep_write meal_read meal_write weight_read weight_write cardiac_read cardiac_write generic_event_read generic_event_write",
    redirect_uri: "http://localhost:3000/oauth/oauth_callback"
};

app.get('/', function (req, res) {

    var client = new Jawbone(options);
    
    res.redirect(client.authorizeURL());
});

app.get('/oauth/oauth_callback', function (req, res) {

    var code = req.query.code;
    
    var client = new Jawbone(options);

    client.getRequestToken(code, function (err, res) {
        console.log(res);
    });
});

app.get('/test', function (req, res) {
    options.access_token="b6_3pfGGwEgB8ANxhimuRDiwm81cuT3GnIXW3MGqGd5VfGCxRxJbU0fMxmYf2dgE8EvaJSumcI0GoYT-V9UbpVECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP";
//"access_token": "Je5CDuGC9OQWA7glkvsTAIxTROoomAisVMoygpmEeSZp2unIKNv7_puujesDa0CBI9kncuO0JgRXW2MSxp0B_VECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP", "token_type": "Bearer", "expires_in": 31536000, "refresh_token": "RWuGvZ23POs-b6Uhe1nEvUE18Y9fMNtqpXCCfvMEvGfdL2WxNgQvKekaCy5aBtavNNWfJhnfRQwlAN2iCODyqw"
    var client = new Jawbone(options);

    client.getBodyEvent(function (err, data) {
        res.send(data);
    });
});

//https://apigee.com/oauth_callback/UP/oauth2CodeCallback?code=mGKV_178jYzxqJfTogjahRsyVUzxWa_qZZxyv4M-kTD_tpMD-scm8oyydxk-ZMEe4675e9PR2JnD6u6cbRLabwJcUBjI6eiUmwPsZau6mE4qFHUbrwIyuWo0Z2LBaFf926_9J8ClH736u1YGuXQ4XULYuz_gcPxLKrRG72wteU0G01vzYiqxC4UYU4wUZRr7y46ZmM12KnYoKlCedaKes1U7DkcELlxzM4RsLvKGvhg



// var passport = require('passport');
// var JawboneStrategy = require('passport-jawbone').Strategy;
//
// passport.use(new JawboneStrategy({
//         clientID     : "lIi8OMlenRU",
//         clientSecret : "e5eedf664371cea451a4ca43e938cf9829e813f9",
//         callbackURL  : "http://localhost:3000/oauth/oauth_callback",
//         passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//     },
//     function(req, token, refreshToken, profile, done) {
//         console.log("ok");
//     }
// ));
//
//
// app.get('/', passport.authorize('jawbone', { scope : 'move_read' }));
//
// app.get('/oauth/oauth_callback',function(){
//
//     passport.
//     //
//     //passport.authorize('jawbone', {
//     //    scope: ['move_read'],
//     //    failureRedirect: '/auth/jawbone/failure'
//     //}), function(req, res) {
//     //    res.redirect('/auth/jawbone/success');
//     //}
//
//    code=W3AjaI7_iOVWA-RAijyJwELsustPIqURawlb4LRAcxY95szb0LSrpsdKXBCNYlGP3S9lsTYELynpGgsuWgbWr--GVkL4W468gA0vox9BEJVeQaE-y_Ag1qIwg5Jnf2wau806cG3fyeK38JHFIwYjz9NnDJGsrEzDbiLyDvDrnd3CEEfhKF5rKSgqUJ51op6zVTsORwQuXHMzhGwu8oa-GA
//
//     console.log("ok2");
//
//     var options = {
//         // ** REQUIRED **
//         access_token:  'xyz'  // Access token for specific user,
//         client_secret: 'abc'  // Client Secret (required for up.refreshToken.get())
//     }
//
//     var up = require('jawbone-up')(options);
// });
