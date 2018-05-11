const MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server
// Initiates the db connection and and returns the instance in a db letiable
let url = 'mongodb://13.65.32.181';
// Use connect method to connect to the Server

MongoClient.connect(url, function (err, db) {
    let database = db.db('dev-bot');
    let m = function () {
        if (this.id == res) {
            for (let i of this.orders) emit(this.id, i)
        }
    }
    let r = function (key, value) {   
        let d =  []
        for (let i = 0; i < value.length; i++) {
            for (let k of dishNames) {
                let f = false;
                let a = [];
                for (let j = 0; j < value[i].orders.length; j++) {
                    if (value[i].orders[j].dishName == k) {
                        f = true;
                    } else {
                        a.push(value[i].orders[j].fid);
                    }
                }
                if (f && a.length != 0) d = d.concat(a);
            }
        }
        return {freqDishes : [...new Set(d)] }
    }
    database.collection('vendors').mapReduce(m, r, {
            out: {
                inline: 1
            },
            scope: {
                res: 'carnivore thane',
                dishNames: ["Paneer Tikka Combo", "Boneless Chicken Nawabi", "Karkori Kabab"]
            }
        },
        function (err, data) {
            console.log(JSON.stringify(data, null, 2));
        })
    db.close();
});
