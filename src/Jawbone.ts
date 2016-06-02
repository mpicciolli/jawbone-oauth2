var request = require('request');

export interface IJawbone {
    authorizeURL():string;
    getRequestToken(code:string, cb:any):void;

    //Body
    getBodyEvent(cb:any):any;
    getOneBodyEvent(id:string, cb:any):any;
    createBodyEvent(event:IBodyEvent, cb:any):any;
    deleteBodyEvent(id:string, cb:any):any;

}

export interface IJawboneOptionModel {
    client_id:string;
    client_secret;
    redirect_uri:string;
    scope:string;
    access_token?:string
}

export interface IBodyEvent {
    title:string;
    weight:number;
    body_fat:number;
    lean_mass:number;
    bmi:number;
    note:string;
    time_created:number;
    tz:string;
    share:boolean;
}

export class Jawbone implements IJawbone {

    public static authentication:string = "https://jawbone.com/auth/oauth2/auth";
    public static authorization:string = "https://jawbone.com/auth/oauth2/token";
    public static jawboneApi:string = "https://jawbone.com/nudge/api/v.1.1/";

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
            if (err)
                console.log(err);

            if (body) {
                cb(null, body)
            }
        });
    }

    getBodyEvent(cb:any):any {
        this.apiGet("body_events", cb);
    }

    getOneBodyEvent(id:string, cb:any):any {
        this.apiGetId("body_events", id, cb);
    }

    createBodyEvent(event:IBodyEvent, cb:any):any {
        this.apiPost("body_events", event, cb);
    }

    deleteBodyEvent(id:string, cb:any):any {
        this.apiDelete("body_events", id, cb);
    }

    // /**
    //  * Serializes an object into a parameter string
    //  * for use with making REST API calls.
    //  *
    //  * @tutorial http://stackoverflow.com/a/1714899/2953164
    //  * @private
    //  * @param  {Object} obj Object to serialize.
    //  * @return {String}     String representation of object as param string.
    //  */
    // private serialize(obj) {
    //     var str = [];
    //     for (var p in obj) {
    //         if (obj.hasOwnProperty(p)) {
    //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //         }
    //     }
    //     return str.join("&");
    // };

    private apiGet(str:string, cb) {
        let url = Jawbone.jawboneApi
            .concat("users/@me/")
            .concat(str);

        request({
                url: url,
                headers: {
                    'X-HostCommonName': "jawbone.com",
                    'Authorization': 'Bearer ' + this.config.access_token,
                    'Host': "jawbone.com",
                    'X-Target-URI': "https://jawbone.com",
                    'Accept': 'application/json',
                    'Connection': 'Keep-Alive'
                }
            },
            function (err, response, body) {
                if (err)
                    console.log(err);

                if (body)
                    cb(null, body);
            });
    }

    private apiGetId(str:string, id:string, cb) {
        let url = Jawbone.jawboneApi
            .concat(str)
            .concat('/')
            .concat(id);

        request({
                url: url,
                headers: {
                    'X-HostCommonName': "jawbone.com",
                    'Authorization': 'Bearer ' + this.config.access_token,
                    'Host': "jawbone.com",
                    'X-Target-URI': "https://jawbone.com",
                    'Accept': 'application/json',
                    'Connection': 'Keep-Alive'
                }
            },
            function (err, response, body) {
                if (err)
                    console.log(err);

                if (body)
                    cb(null, body);
            });
    };

    private apiPost(str:string, options:any, cb:any) {
        let url = Jawbone.jawboneApi
            .concat("users/@me/")
            .concat(str);


        request({
                url: url,
                method: 'POST',
                headers: {
                    'X-HostCommonName': "jawbone.com",
                    'Authorization': 'Bearer ' + this.config.access_token,
                    'Host': "jawbone.com",
                    'X-Target-URI': "https://jawbone.com",
                    'Accept': 'application/json',
                    'Connection': 'Keep-Alive'
                },
                form: options
            },
            function (err, response, body) {
                if (err)
                    console.log(err);

                if (body)
                    cb(null, body);
            });
    }

    private apiDelete(str:string, id:string, cb:any) {

        let url = Jawbone.jawboneApi
            .concat(str)
            .concat('/')
            .concat(id);

        request({
                url: url,
                method: 'DELETE',
                headers: {
                    'X-HostCommonName': "jawbone.com",
                    'Authorization': 'Bearer ' + this.config.access_token,
                    'Host': "jawbone.com",
                    'X-Target-URI': "https://jawbone.com",
                    'Accept': 'application/json',
                    'Connection': 'Keep-Alive'
                }
            },
            function (err, response, body) {
                if (err)
                    console.log(err);

                if (body)
                    cb(null, body);
            });
    }
}