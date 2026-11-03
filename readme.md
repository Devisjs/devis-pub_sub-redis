# Devis Pub/Sub redis
 <img  src="https://avatars3.githubusercontent.com/u/21971184?v=4&amp;s=200" href="http://devisjs.surge.sh" width="250" />

>A Devis plugin for message transport over Redis pub/sub

<p align="center">
  <a href="https://www.npmjs.com/package/devis-pub_sub-redis"><img src="https://img.shields.io/npm/v/devis-pub_sub-redis.svg" alt="Version"></a>
  <a href="https://github.com/Devisjs/devis-pub_sub-redis/actions/workflows/ci.yml"><img src="https://github.com/Devisjs/devis-pub_sub-redis/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

# Pub/Sub transport

## Problems
*  App send messages to the applications that are interested in receiving the message without knowing the identities of the receivers
* Tight coupling of sender and receiver

## Solution
* Extend the communcation infrastructure by including a topic for each message
* Enable listening apps to receive messages from only specified topics
* create a mecanism that sends messages to all interested receivers


This plugin solves this problem by using redis.

## Actors in Pub/Sub 
* Publisher : Sender apps that tag each message with the name of a topic.

* Sibscriber : Receiver apps that choose which topic to receive messages from.

* Pub/Sub server : This plugin

## Install

Node.js 22 or later and a Redis server are required. Devis is a peer dependency, so install both:

```bash
$ npm install --save devis
$ npm install --save devis-pub_sub-redis
```

## Example 

### Quick Example
```javascript
const devis = require("devis")
    .plug("devis-pub_sub-redis")

    //Create a subscriber
    .call({ role: "pub", action: "create" }, { pub: "pub1" }, (err, res) => {
        console.log(res);

    });

setTimeout(() => {
    devis.call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "test", message: "new message" }, (err, res) => {
        console.log(res);
    });
}, 3000);

//Create a subscriber
devis.call({ role: "sub", action: "create" },{sub:"sub1"},(err,res)=>{
    console.log(res);
});
devis.call({ transport: "pub/sub", action: "subscribe" },{sub:"sub1",topic:"test"},(err,res)=>{
    console.log(res);
});

devis.listen({
    type: 'http',
    port: '8888',
    host: '127.0.0.1',
    protocol: 'http'
});
```

### Options

`role: "pub"` and `role: "sub"` accept a `url` argument (for example `redis://user:pass@host:6379`). Without it the client connects to `redis://localhost:6379`.

The `subscribe` callback is called once when the subscription is confirmed, then once per message received on that topic, with `{ topic, message }`.

### Full example
you can see a full example in example folder

## Upgrading from 1.x

* Node.js 22 or later and Devis 3 or 4 are required. Devis is now a peer dependency.
* The plugin uses the Redis client 6, so it needs Redis 6 or later.
* A `subscribe` callback now receives only the messages of its own topic. In 1.x, subscribing one subscriber to several topics delivered every message to every callback.


