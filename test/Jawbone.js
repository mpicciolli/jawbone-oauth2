"use strict";
var OAuth = require('oauth');
var qs = require('querystring');
var moment = require('moment');
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: 'bigSecret'}));
app.listen(3000);
var passport = require('passport');
var JawboneStrategy = require('passport-jawbone').Strategy;

passport.use(new JawboneStrategy({
        clientID     : "lIi8OMlenRU",
        clientSecret : "e5eedf664371cea451a4ca43e938cf9829e813f9",
        callbackURL  : "http://localhost:3000/oauth/oauth_callback",
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {
        console.log("ok");
    }
));


app.get('/', passport.authorize('jawbone', { scope : 'move_read' }));

app.get('/oauth/oauth_callback',function(){

    passport.
    //
    //passport.authorize('jawbone', {
    //    scope: ['move_read'],
    //    failureRedirect: '/auth/jawbone/failure'
    //}), function(req, res) {
    //    res.redirect('/auth/jawbone/success');
    //}

   code=W3AjaI7_iOVWA-RAijyJwELsustPIqURawlb4LRAcxY95szb0LSrpsdKXBCNYlGP3S9lsTYELynpGgsuWgbWr--GVkL4W468gA0vox9BEJVeQaE-y_Ag1qIwg5Jnf2wau806cG3fyeK38JHFIwYjz9NnDJGsrEzDbiLyDvDrnd3CEEfhKF5rKSgqUJ51op6zVTsORwQuXHMzhGwu8oa-GA

    console.log("ok2");

    var options = {
        // ** REQUIRED **
        access_token:  'xyz'  // Access token for specific user,
        client_secret: 'abc'  // Client Secret (required for up.refreshToken.get())
    }

    var up = require('jawbone-up')(options);
});
