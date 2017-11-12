const devis = require("devis");
devis.use("./index");

devis.call({ role: "sub", action: "create" },{sub:"sub2"},(err,res)=>{
    console.log(res);
    devis.call({ transport: "pub/sub", action: "subscribe" },{sub:"sub2",topic:"test2"},(err,res)=>{
        console.log(res);
    });
});


devis.listen({
    type: 'http',
    port: '8883',
    host: '127.0.0.1',
    protocol: 'http'
});
