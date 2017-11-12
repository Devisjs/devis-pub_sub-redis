# Devis mongo client
 <img  src="https://avatars3.githubusercontent.com/u/21971184?v=4&amp;s=200" href="http://devisjs.surge.sh" width="250" />

>A data storage plugin for Devisjs

This module supports the majority of necessary features for using your MongoDB database.


## Install

We should install Devis and the plugin :

```bash
$ npm install --save devis
$ npm install --save devis-mongo-client
```

## Supported functions 

* Connect to the database :
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"connect"},{url:mongodb_url},callback);
    ```
    * Example : 
* Create a collection : 
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"createCollection"},{collection:collection},callback);
    ```
* Drop a collection : 
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"dropCollection"},{collection:collection},callback);
    ``` 
    * Example :
     ```javascript
    .call({
		role: "mongodb",
		action: "connect"
        }, { url: "mongodb://localhost:27017/foo" },callback);
    ``` 
* Find data :
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"find"},{collection:collection, type:type, query: query, options: options},callback);
    ```
    *type* : one or many (default : many);
   
    * Examples :  
        * Example 1 : 
        ```javascript
        //close is true by default, but if you don't wanan close the connection you should give false as argument 
        .call({role:"mongodb",action:"find"},{collection:"foo", type : "one", params:{"Acronym" : "L"},close:false},callback);
        ``` 
        * Example 2 : 
        ```javascript
        call({ role: "mongodb", action: "find" }, { type: "many", collection: "foo",query:{Name:"3"}, options: { fields: { "Acronym": 0, _id: 0 } } },callback);
        ```
* Indexes :
    * Create Index : 
        * Syntax :
        ```javascript
        .call({role:"mongodb", action:"index"},{collection:collection, type:type, indexFields: indexFields, params: params},callback);
        ```
        *type* : ensureIndex or createIndex.
    * check index if exist : 
        * Syntax :
        ```javascript
        .call({role:"mongodb", action:"index"},{collection:collection, type:"ifExist", index: index},callback);
        ```
    * get indexes of a given collection : 
        * Syntax : 
        ```javascript
        .call({role:"mongodb", action:"index"},{collection:collection, type:"getAllIndexes"},callback);
        ```
    * Example :
    ```javascript
    .call({role:"mongodb",action:"index"},{collection:"foo", type:"ifExist",index:["_id_","Acronym_1"],callback);
    ```
* Insert data :
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"insert"},{collection:collection, type:type, data: data, params: params},callback);
    ```
    *type* : one or many.
    * Example :
    ```javascript
    let data = [
        {Value: "1",Name: "foo", Acronym:"foo1"}, 
        {Value: "2",Name: "bar", Acronym:"bar1"}];
    .call({ role: "mongodb", action: "insert" },{ type: "many",collection: "foo", data: data },callback);
    ```
* Delete data :
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"delete"},{collection:collection, type:type, query: query},callback);
    ```
    *type* : one or many.
    * Example :
    ```javascript
    .call({role:"mongodb",action:"delete"},{type:"deleteOne", collection:"foo",params:{Value: "1"}},,callback);
    ```
* Update data :
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"update"},{collection:collection, type:type, query: query, data: data},callback);
    ```
    *type* : one or many.
    * Example :
    ```javascript
    let queryOr={
	    $or:[{Value: "1"},{Value:"2"}]};
    let newData={$set: { Name: "foobar"}};
    .call({role:"mongodb", action:"update"},{ type: "many", collection: "foo",query:queryOr, data:newData},callback);
    ```
* Aggregate functions :
    * Syntax :
    ```javascript
    .call({role:"mongodb", action:"aggregate"},{collection:collection, aggQuery: aggQuery},callback);
    ```
    * Example : 
    ```javascript
    let aggQuery = [
            { "$match": { "date": "29.05.2017"} },
            {
                "$group": {
                    "_id": { "Key": "$Key", "date": "$date"},
                    "count": { "$sum": 1 }
            }
        }];
    .call({ role: "mongodb", action: "aggregate" }, { collection: "Production",aggQuery:aggQuery },callback);
    ```
## Example : 
```javascript
//Initialize a Devis instance
let devisMongoClient = require("devis")

//use the devis-mongo-client plugin
        .plug("devis-mongo-client")

        //connect to the database
        .call({
        role: "mongodb",
        action: "connect"
        }, { url: "mongodb://localhost:27017/foo" }, (err, db) => {
            if (err) console.log(err);
            else {

                //call find function of the plugin by giving the collection and search conditions 
                devisMongoClient.call({
                        role: "mongodb",
                        action: "find"
                    }, {
                        collection: "foo",
                        params: {
                            "Acronym": "L"
                        }
                    }, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);
                        }
                });
        });
```
