/**
 * Created by mathieu on 01/06/2016.
 */
var options = {
    access_token:  'Je5CDuGC9OQWA7glkvsTAIxTROoomAisVMoygpmEeSZp2unIKNv7_puujesDa0CBI9kncuO0JgRXW2MSxp0B_VECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP',
    client_secret: 'e5eedf664371cea451a4ca43e938cf9829e813f9'
};

var up = require('jawbone-up')(options);

//up.events.body.get({}, function(){
//
//});

up.sleeps.get({}, function(err, res){
console.log(err, res);
});
