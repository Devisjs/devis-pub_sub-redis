const devis = require("devis");

devis.use("../index");

devis.call({ role: "pub", action: "create" }, { pub: "pub1" }, (err, res) => {
    console.log(res);

});

setTimeout(() => {
    devis.call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "test", message: "mess1" }, (err, res) => {
        console.log(res);
    });
}, 3000);

setTimeout(() => {
    devis.call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "test", message: "mess2" }, (err, res) => {
        console.log(res);
    });
}, 4000);

setTimeout(() => {
    devis.call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "test", message: "mess3" }, (err, res) => {
        console.log(res);
    });
}, 5000);

setTimeout(() => {
    devis.call({ transport: "pub/sub", action: "pubslish" }, { pub: "pub1", topic: "test2", message: "mess4" }, (err, res) => {
        console.log(res);
    });
}, 7000);

devis.listen({
    type: 'http',
    port: '8888',
    host: '127.0.0.1',
    protocol: 'http'
});
