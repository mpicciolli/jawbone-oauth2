/**
 * Created by mpicciolli on 03/06/2016.
 */
var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var moment = require('moment');
var request = require('request');

var Jawbone = require('../dist/Jawbone').Jawbone;

var options;
var client;
var error = new Error('ERROR');

describe('Jawbone API for NodeJS :', function () {

    this.timeout(5000);

    before(function (done) {
        options = {
            client_id: "lIi8OMlenRU",
            client_secret: "e5eedf664371cea451a4ca43e938cf9829e813f9",
            scope: "basic_read extended_read location_read friends_read mood_read mood_write move_read move_write sleep_read sleep_write meal_read meal_write weight_read weight_write cardiac_read cardiac_write generic_event_read generic_event_write",
            redirect_uri: "http://localhost:3000/oauth/oauth_callback",
            access_token: "b6_3pfGGwEgB8ANxhimuRDiwm81cuT3GnIXW3MGqGd5VfGCxRxJbU0fMxmYf2dgE8EvaJSumcI0GoYT-V9UbpVECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP"
        };

        client = new Jawbone(options);
        done();
    });

    describe('Authentication :', function () {
        describe('authorizeURL()', function () {
            it('Should get Jawbone Authentication page', function (done) {
                var url = client.authorizeURL();
                expect(url).to.not.equal(null);
                var options = {
                    url: url
                };
                request.get(options, function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });
    });

    describe('Band Events :', function () {
        describe('getBandEvent()', function () {
            it('Should get the band events', function (done) {
                client.getBandEvent(function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    done();
                });
            });
        });
    });

    describe('Body:', function () {

        var bodyEventCreatedId;

        before(function (done) {
            describe('createBodyEvent()', function () {
                it('Should record a body metrics', function (done) {
                    var bodyEvent = {
                        title: null,
                        weight: 82.6,
                        body_fat: 0,
                        lean_mass: null,
                        bmi: null,
                        note: null,
                        time_created: moment().unix(),
                        tz: null,
                        shared: false
                    };

                    client.createBodyEvent(bodyEvent, function (err, data) {
                        expect(err).to.eq(null);
                        expect(data).to.not.equal(null);
                        bodyEventCreatedId = data.xid;
                        done();
                    });
                });
            });
            done();
        });


        describe('getBodyEvent()', function () {
            it('Retrieve user records of body metrics', function (done) {
                client.getBodyEvent(function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    done();
                });
            });
        });

        describe('getOneBodyEvent()', function () {
            it('Should get one body composition record event', function (done) {
                client.getOneBodyEvent(bodyEventCreatedId, function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    expect(data.xid).to.eq(bodyEventCreatedId);
                    done();
                })
            });
        });


        after(function (done) {
            describe('deleteBodyEvent()', function () {
                it('Should delete a body metrics', function (done) {
                    client.deleteBodyEvent(bodyEventCreatedId, function (err, data) {
                        expect(err).to.eq(null);
                        expect(data).to.not.equal(null);
                        done();
                    });
                });
            });
            done();
        });
    });

    describe('Heart Rate', function () {
        describe('getHeartRate()', function () {
            it('Should get resting heart rate for a user', function (done) {
                client.getCustomEvent(function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    done();
                });
            });
        });
    });

    describe('Custom Event :', function () {

        var customEvent = {
            "title": "Sunset today at November 21st, 2013 at 4:49PM",
            "verb": "Verb to indicate user action",
            "note": "Description of the event",
            "time_created": 1384963500,
            "place_lat": "37.451572",
            "place_lon": "-122.184435",
            "place_acc": 10,
            "place_name": "Work",
            "image_url": "/nudge/image/d/770eca483cd211e3910e22000a1fb6b5_image.png",
            "attributes": {
                "description": "My local sunset time updated"
            },
            "share": false,
            "tz": "America/Los_Angeles"
        };

        var customEventCreatedId;

        before(function (done) {
            describe('createCustomEvent()', function () {
                it('Should record a custom event for the user', function (done) {
                    client.createCustomEvent(customEvent, function (err, data) {
                        expect(err).to.eq(null);
                        expect(data).to.not.equal(null);
                        customEventCreatedId = data.xid;
                        done();
                    });
                });
            });
            done();
        });

        describe('getCustomEvent()', function () {
            it('Should get a custom event for the user', function (done) {
                client.getCustomEvent(function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    done();
                });
            });
        });

        describe('updateCustomEvent()', function () {
            it('Update a custom event', function (done) {
                client.updateCustomEvent(customEventCreatedId, customEvent, function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    expect(data.xid).to.eq(customEventCreatedId);
                    done();
                });
            })
        });

        after(function (done) {
            describe('deleteCustomEvent()', function () {
                it('Delete a custom event', function (done) {
                    client.deleteCustomEvent(customEventCreatedId, function (err, data) {
                        expect(err).to.eq(null);
                        expect(data).to.not.equal(null);
                        done();
                    });
                })
            });
            done();
        });
    });

    describe('Goals :', function () {
        describe('getGoal()', function () {
            it('Should get the user goals', function (done) {
                client.getGoal(function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    done();
                });
            });
        });

        describe('updateGoal()', function () {
            it('Should get the user goals', function (done) {
                var goal = {
                    sleep_total: 30000
                };

                client.updateGoal(goal, function (err, data) {
                    expect(err).to.eq(null);
                    expect(data).to.not.equal(null);
                    done();
                });
            });
        });
    });

    // describe('Meals :', function () {
    //
    //     var meal = {
    //         note: "Something Good",
    //         sub_type: 2,
    //         place_lat: "37.451572",
    //         place_lon: "-122.184435",
    //         place_acc: 10,
    //         place_name: "Good Eats",
    //         time_created: moment().unix(),
    //         tz: "America/Los Angeles",
    //         share: false,
    //         items: [{
    //             "name": "Goldfish",
    //             "description": "",
    //             "amount": 1,
    //             "measurement": "grams",
    //             "type": 3,
    //             "sub_type": 2,
    //             "calcium": 140,
    //             "calories": 319,
    //             "carbohydrate": 31.75,
    //             "cholesterol": 50,
    //             "fiber": 0,
    //             "protein": 14.77,
    //             "saturated_fat": 6,
    //             "sodium": 500,
    //             "sugar": 0,
    //             "unsaturated_fat": 7.313
    //         }]
    //     };
    //
    //     var mealCreatedId;
    //
    //     before(function (done) {
    //         describe('createMeal()', function () {
    //             it('Should create a new meal', function (done) {
    //                 client.createMeal(meal, function (err, data) {
    //                     expect(err).to.eq(null);
    //                     expect(data).to.not.equal(null);
    //                     mealCreatedId = data.xid;
    //                     done();
    //                 });
    //             });
    //         });
    //         done();
    //     });
    //
    //     describe('getMeal()', function () {
    //         it('Should returns the list of meals of the current user', function (done) {
    //             client.getMeal(function (err, data) {
    //                 expect(err).to.eq(null);
    //                 expect(data).to.not.equal(null);
    //                 done();
    //             });
    //         });
    //     });
    //
    //     describe('getOneMeal()', function () {
    //         it('Should returns detailed information about a specific meal', function (done) {
    //             client.getOneMeal(customEventCreatedId, function (err, data) {
    //                 expect(err).to.eq(null);
    //                 expect(data).to.not.equal(null);
    //                 expect(data.xid).to.eq(customEventCreatedId);
    //                 done();
    //             });
    //         })
    //     });
    //
    //
    //     describe('updateCustomEvent()', function () {
    //         it('Update a custom event', function (done) {
    //             client.updateCustomEvent(customEventCreatedId, customEvent, function (err, data) {
    //                 expect(err).to.eq(null);
    //                 expect(data).to.not.equal(null);
    //                 expect(data.xid).to.eq(customEventCreatedId);
    //                 done();
    //             });
    //         })
    //     });
    //
    //     after(function (done) {
    //         describe('deleteCustomEvent()', function () {
    //             it('Delete a custom event', function (done) {
    //                 client.deleteCustomEvent(customEventCreatedId, function (err, data) {
    //                     expect(err).to.eq(null);
    //                     expect(data).to.not.equal(null);
    //                     done();
    //                 });
    //             })
    //         });
    //         done();
    //     });
    // });

    // var sleep = {
    //     time_created: moment().unix() - 10000,
    //     time_completed: moment().unix(),
    //     tz:"America/Los Angeles",
    //     share:false
    // };

    // var mood = {
    //     title: "Youhou !!!",
    //     sub_type: 1,
    //     time_created: moment().unix(),
    //     tz: "America/Los Angeles",
    //     share: false
    // };
});