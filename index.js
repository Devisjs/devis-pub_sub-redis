"use strict";

const devis = require("devis");
const pubSubFuncs = require("./libs/functions");    

devis.push({ role: "pub", action: "create" }, pubSubFuncs.createPublisher);

devis.push({ role: "sub", action: "create" }, pubSubFuncs.createSubscriber);

devis.push({ transport: "pub/sub", action: "pubslish" }, pubSubFuncs.pubslish);

devis.push({ transport: "pub/sub", action: "subscribe" }, pubSubFuncs.subscribe);

module.exports = devis;