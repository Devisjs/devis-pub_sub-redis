let devis=require("devis");
devis.use("../index");


devis.call({ role: "sub", action: "create" },{sub:"sub1"},(err,res)=>{
    console.log(res);
    devis.call({ transport: "pub/sub", action: "subscribe" },{sub:"sub1",topic:"test"},(err,res)=>{
        console.log(res);
    });
});



devis.listen({
    type: 'http',
    port: '8881',
    host: '127.0.0.1',
    protocol: 'http'
});
