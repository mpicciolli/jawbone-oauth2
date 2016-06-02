# jawbone-oauth2
[![NPM][npm-image]][npm-url]

Jawbone API library for node.js


## Install

```sh
$ npm install --save jawbone-oauth2
```


## Usage

```js

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Jawbone = require('../dist/Jawbone').Jawbone;

app.use(cookieParser());
app.use(session({secret: 'bigSecret'}));
app.listen(3000);


var options = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: "basic_read extended_read location_read friends_read mood_read mood_write move_read move_write sleep_read sleep_write meal_read meal_write weight_read weight_write cardiac_read cardiac_write generic_event_read generic_event_write",
    redirect_uri:  process.env.CALLBACK_URL
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
```

## Release Notes

See release notes [here](./RELEASENOTES.md).

## Contributing

Contributions are welcome. See issues [here](https://github.com/mpicciolli/jawbone-oauth2/issues).

## License

Licensed under [Apache 2.0](./LICENSE).

[npm-image]: https://nodei.co/npm/jawbone-oauth2.png
[npm-url]: https://nodei.co/npm/jawbone-oauth2/
[daviddm-image]: https://david-dm.org/mpicciolli/jawbone-oauth2.svg
[daviddm-url]: https://david-dm.org/mpicciolli/jawbone-oauth2