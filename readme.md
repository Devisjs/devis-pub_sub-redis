# Devis Pub/Sub redis
 <img  src="https://avatars3.githubusercontent.com/u/21971184?v=4&amp;s=200" href="http://devisjs.surge.sh" width="250" />

>A Devis plugin for message transport over Redis pub/sub

# Pub/Sub transport

## Problems
*  App send messages to the applications that are interested in receiving the message without knowing the identities of the receivers
* Tight coupling of sender and receiver

## Solution
* Extend the communcation infrastructure by including a topic for each message
* Enable listening apps to receive messages from only specified topics
* create a mecanism that sends messages to all interested receivers


This plugin solves this problem by using redis.

## Actoris in Pub/Sub 
* Publisher : Sender apps that tag each message with the name of a topic.

* Sibscriber : Receiver apps that choose which topic to receive messages from.

* Pub/Sub server : This plugin

## Install

We should install Devis and the plugin :

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

### Full example
you can see a full example in example folder

