"use strict";
const redis = require("redis");

let subscribres = [],
    publishers = [];

function createPublisher(args, done) {
    let err;
    let message;
    if (publishers[args.pub] !== undefined) {
        err = "publisher already exist";
    }
    else {
        publishers[args.pub] = redis.createClient();
        message = "publisher " + args.pub + " created";
    }

    done(err, message);
}

function createSubscriber(args, done) {
    let err;
    let message;
    if (subscribres[args.sub] !== undefined) {
        err = "publisher already exist";
    }
    else {
        subscribres[args.sub] = redis.createClient();
        message = "subscriber " + args.sub + " created";
    }

    done(err, message);
}

function pubslish(args, done) {
    let err;
    let message;

    if (publishers[args.pub] === undefined) {
        err = "publisher not found";
    }
    else {
        publishers[args.pub].publish(args.topic, args.message);
        message = "publisher " + args.pub + " just publish a message on the topic " + args.topic;
    }
    done(err, message);
}

function subscribe(args, done) {
    let err;
    let message;

    if (subscribres[args.sub] === undefined) {
        err = "subscriber not found";
    }
    else {
        subscribres[args.sub].subscribe(args.topic);
        message = args.sub + " just jubscribe to the topic " + args.topic;
    }
    done(err, message);

    subscribres[args.sub].on("message", (topic, message) => {
        let result = {
            "topic": topic,
            "message": message
        }
        done(null, result)
    });
}

module.exports = {
    subscribe: subscribe,
    pubslish: pubslish,
    createSubscriber: createSubscriber,
    createPublisher: createPublisher
}