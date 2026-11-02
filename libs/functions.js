"use strict";
const redis = require("redis");

let subscribres = [],
    publishers = [];

function createClient(args, done, onReady) {
    const client = redis.createClient({ url: args.url });
    // Without an error listener a dropped Redis connection crashes the process.
    client.on("error", (err) => console.error(err));
    client.connect()
        .then(() => onReady(client))
        .catch((err) => done(err, null));
}

function createPublisher(args, done) {
    if (publishers[args.pub] !== undefined) {
        return done("publisher already exist");
    }
    createClient(args, done, (client) => {
        publishers[args.pub] = client;
        done(undefined, "publisher " + args.pub + " created");
    });
}

function createSubscriber(args, done) {
    if (subscribres[args.sub] !== undefined) {
        return done("subscriber already exist");
    }
    createClient(args, done, (client) => {
        subscribres[args.sub] = client;
        done(undefined, "subscriber " + args.sub + " created");
    });
}

function pubslish(args, done) {
    if (publishers[args.pub] === undefined) {
        return done("publisher not found");
    }
    publishers[args.pub].publish(args.topic, args.message)
        .then(() => done(undefined, "publisher " + args.pub + " just publish a message on the topic " + args.topic))
        .catch((err) => done(err, null));
}

function subscribe(args, done) {
    if (subscribres[args.sub] === undefined) {
        return done("subscriber not found");
    }
    subscribres[args.sub].subscribe(args.topic, (message, topic) => {
        let result = {
            "topic": topic,
            "message": message
        }
        done(null, result)
    })
        .then(() => done(undefined, args.sub + " just jubscribe to the topic " + args.topic))
        .catch((err) => done(err, null));
}

module.exports = {
    subscribe: subscribe,
    pubslish: pubslish,
    createSubscriber: createSubscriber,
    createPublisher: createPublisher
}
