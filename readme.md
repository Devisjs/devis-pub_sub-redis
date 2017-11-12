# Devis Pub/Sub redis
 <img  src="https://avatars3.githubusercontent.com/u/21971184?v=4&amp;s=200" href="http://devisjs.surge.sh" width="250" />

>A Devis plugin for message transport over Redis pubsub

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
$ npm install --devis-pub_sub-redis
```

## Example 
you cann see a full example in example folder

