"use strict";
const test = require("node:test");
const assert = require("node:assert");
const devis = require("../index");

const url = process.env.REDIS_URL || "redis://localhost:6379";

function call(pattern, args) {
    return new Promise((resolve, reject) => {
        devis.call(pattern, args, (err, res) => (err ? reject(err) : resolve(res)));
    });
}

test("a subscriber receives messages published on its topic only", async () => {
    await call({ role: "pub", action: "create" }, { pub: "pub1", url });
    await call({ role: "sub", action: "create" }, { sub: "sub1", url });

    const received = [];
    const delivered = new Promise((resolve) => {
        devis.call({ transport: "pub/sub", action: "subscribe" }, { sub: "sub1", topic: "test" }, (err, res) => {
            assert.ifError(err);
            if (typeof res === "object") {
                received.push(res);
                resolve();
            }
        });
    });
    // Let the SUBSCRIBE command reach Redis before publishing.
    await new Promise((resolve) => setTimeout(resolve, 100));

    await call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "other", message: "ignored" });
    await call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "test", message: "mess1" });
    await delivered;

    assert.deepStrictEqual(received, [{ topic: "test", message: "mess1" }]);
});

test("creating a subscriber twice is rejected", async () => {
    await assert.rejects(call({ role: "sub", action: "create" }, { sub: "sub1", url }), /subscriber already exist/);
});

test("publishing with an unknown publisher is rejected", async () => {
    await assert.rejects(call({ transport: "pub/sub", action: "pubslish" }, { pub: "nope", topic: "t", message: "m" }), /publisher not found/);
});
