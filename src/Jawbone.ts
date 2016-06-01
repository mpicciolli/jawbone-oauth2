var request = require('request');

export interface IJawbone {
    authorizeURL():string;
    getRequestToken(code:string, cb:any):void;
}

export interface IJawboneOptionModel {
    client_id:string;
    client_secret;
    redirect_uri:string;
    scope:string;
}

export class Jawbone implements IJawbone {

    public static authentication:string = "https://jawbone.com/auth/oauth2/auth";
    public static authorization:string = "https://jawbone.com/auth/oauth2/token";

    constructor(private config:IJawboneOptionModel) {
        this.config = config;
    }

    authorizeURL():string {
        let url:string = Jawbone.authentication
            .concat("?client_id=")
            .concat(this.config.client_id)
            .concat("&response_type=code")
            .concat("&scope=")
            .concat(this.config.scope)
            .concat("&redirect_uri=")
            .concat(this.config.redirect_uri);

        return url;
    }

    getRequestToken(code:string, cb:any):any {

        let url:string = Jawbone.authorization
            .concat("?client_id=")
            .concat(this.config.client_id)
            .concat("&client_secret=")
            .concat(this.config.client_secret)
            .concat("&grant_type=authorization_code")
            .concat("&code=")
            .concat(code);

        request({
            uri: url,
            method: 'GET',
        }, (err, res, body) => {
            if(err)
                console.log(err);

            if(body){
                cb(null, body)
            }
        });
    }
}