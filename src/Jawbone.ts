var request = require('request');

export interface IJawbone {
    authorizeURL():string;
    getRequestToken(code:string, cb:any):void;

    //Band Events
    getBandEvent(cb:any):void;

    //Body
    getBodyEvent(cb:any):void;
    getOneBodyEvent(id:string, cb:any):void;
    createBodyEvent(event:IBodyEvent, cb:any):void;
    deleteBodyEvent(id:string, cb:any):void;

    //Heart Rate
    getHeartRate(cb:any):void;

    //Custom
    getCustomEvent(cb:any):void;
    createCustomEvent(event:ICustomEvent, cb:any):void;
    updateCustomEvent(id:string, event:ICustomEvent, cb:any):void;
    deleteCustomEvent(id:string, cb:any):void;

    //Goals
    getGoal(cb:any):void;
    updateGoal(goal:IGoal, cb:any):void;

    //Meals
    getMeal(cb:any):void;
    getOneMeal(id:string, cb:any):void;
    createMeal(meal:IMeal, cb:any):void;
    updateMeal(id:string, meal:IMeal, cb:any):void;
    deleteMeal(id:string, cb:any):void;
    
    //Mood
    getMood(cb:any):void;
    getOneMood(id:string, cb:any):void;
    createMood(mood:IMood, cb:any):void;
    deleteMood(id:string, cb:any):void;

    //Moves
    getMove(cb:any):void;
    getOneMove(id:string, cb:any):void;
    getMoveGraph(id:string, cb:any):void;
    getMoveTick(id:string, cb:any):void;

    //Sleeps
    getSleep(cb:any):void;
    getOneSleep(id:string, cb:any):void;
    getSleepGraph(id:string, cb:any):void;
    getSleepTick(id:string, cb:any):void;
    createSleep(sleep:ISleep, cb:any):void;
    deleteSleep(id:string, cb:any):void;


}

export interface IMeal {
    note:string;
    sub_type:number;
    image_url?:string;
    photo?:string;
    place_lat:number;
    place_lon:number;
    place_acc:number;
    place_name:string;
    time_created:number;
    tz:string;
    share:boolean;
    items:Array<IMealIteam>;
}

export interface IMealIteam {
    name:string;
    description:string;
    amount:number;
    measurement:string;
    type:number;
    sub_type:number;
    food_categories?:Array<any>;
    category?:string;
    food_type?:number;
    calcium:number;
    calories:number;
    carbohydrate:number;
    cholesterol:number;
    fiber:number;
    protein:number;
    saturated_fat:number;
    sodium:number;
    sugar:number;
    unsaturated_fat:number;
    caffeine:number;
}

export interface IGoal {
    move_steps?:number;
    sleep_total?:number;
    body_weight?:number;
    body_weight_intent?:number;
}

export interface ICustomEvent {
    title:string;
    verb:string;
    attributes:any;
    note:string;
    image_url:string;
    place_lat:number;
    place_lon:number;
    place_acc:number;
    place_name:string;
    time_created:number;
    tz:number;
    share:boolean;
}

export interface IJawboneOptionModel {
    client_id:string;
    client_secret;
    redirect_uri:string;
    scope:string;
    access_token?:string;
}

export interface IMood {
    title:string;
    sub_type:number;
    time_created:number;
    tz:string;
    share:boolean;
}

export interface ISleep {
    time_created:number
    time_completed:number
    ticks?:Array<any>
    tz:string
    share:boolean
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

    getMeal(cb:any):void {
        this.apiGet("meals", cb);
    }

    getOneMeal(id:string, cb:any):void {
        this.apiGetId("meals", id, cb);
    }

    createMeal(meal:IMeal, cb:any):void {
        this.apiPost("meals", meal, cb);
    }

    updateMeal(id:string, meal:IMeal, cb:any):void {
        this.apiPut("meals", id, meal, cb);
    }

    deleteMeal(id:string, cb:any):void {
        this.apiDelete("meals", id, cb);

    }

    public static authentication:string = "https://jawbone.com/auth/oauth2/auth";
    public static authorization:string = "https://jawbone.com/auth/oauth2/token";
    public static jawboneApi:string = "https://jawbone.com/nudge/api/v.1.1/";

    constructor(private config:IJawboneOptionModel) {
        this.config = config;
    }

    //Authentication
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


    getBandEvent(cb:any) {
        this.apiGet("bandevents", cb);
    }


    //Get body composition metrics record events for a user.
    getBodyEvent(cb:any):void {
        this.apiGet("body_events", cb);
    }

    getOneBodyEvent(id:string, cb:any):void {
        this.apiGetId("body_events", id, cb);
    }

    createBodyEvent(event:IBodyEvent, cb:any):void {
        this.apiPost("body_events", event, cb);
    }

    deleteBodyEvent(id:string, cb:any):void {
        this.apiDelete("body_events", id, cb);
    }


    //Get resting heart rate for a user
    getHeartRate(cb:any):void {
        this.apiGet("heartrates", cb); //TODO NOT OK
    }


    getCustomEvent(cb:any):void {
        this.apiGet("generic_events", cb);
    }

    createCustomEvent(event:ICustomEvent, cb:any):void {
        this.apiPost("generic_events", event, cb);
    }

    updateCustomEvent(id:string, event:ICustomEvent, cb:any):void {
        this.apiPut("generic_events", id, event, cb);
    }

    deleteCustomEvent(id:string, cb:any):void {
        this.apiDelete("generic_events", id, cb);
    }


    getGoal(cb:any):void {
        this.apiGet("goals", cb);
    }

    updateGoal(goal:IGoal, cb:any):void {
        this.apiPost("goals", goal, cb);
    }


    //Get the user's move list
    getMove(cb:any):void {
        this.apiGet("moves", cb);
    }

    getOneMove(id:string, cb:any):void {
        this.apiGetId("moves", id, cb);
    }

    getMoveGraph(id:string, cb:any):void {
        let url = Jawbone.jawboneApi
            .concat("moves/")
            .concat(id)
            .concat("/image");

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

    getMoveTick(id:string, cb:any):void {
        let url = Jawbone.jawboneApi
            .concat("moves/")
            .concat(id)
            .concat("/ticks");

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


    getMood(cb:any):void {
        this.apiGet("mood", cb);
    }

    getOneMood(id:string, cb:any):void {
        this.apiGetId("mood", id, cb);
    }

    createMood(mood:IMood, cb:any):void {
        this.apiPost("mood", mood, cb);
    }

    deleteMood(id:string, cb:any):void {
        this.apiDelete("mood", id, cb);
    };


    getSleep(cb:any):void {
        this.apiGet("sleeps", cb);
    }

    getOneSleep(id:string, cb:any):void {
        this.apiGetId("sleeps", id, cb);
    }

    getSleepGraph(id:string, cb:any):void {
        let url = Jawbone.jawboneApi
            .concat("sleeps/")
            .concat(id)
            .concat("/image");

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

    getSleepTick(id:string, cb:any):void {
        let url = Jawbone.jawboneApi
            .concat("sleeps/")
            .concat(id)
            .concat("/ticks");

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

    createSleep(sleep:ISleep, cb:any):void {
        this.apiPost("sleeps", sleep, cb);
    }

    deleteSleep(id:string, cb:any):void {
        this.apiDelete("sleeps", id, cb);

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
                    cb(null, JSON.parse(body).data);
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
                    cb(null, JSON.parse(body).data);
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
                    cb(null, JSON.parse(body).data);
            });
    }

    private apiPut(str:string, id:string, options:any, cb:any) {
        let url = Jawbone.jawboneApi
            .concat(str)
            .concat("/")
            .concat(id)
            .concat("/")
            .concat("partialUpdate");

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
                    cb(null, JSON.parse(body).data);
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
                    cb(null, JSON.parse(body).data);
            });
    }
}