const express = require('express');

let Router = express.Router();

Router.get('/', async(req, res) => {
   //let data=[{fname:'zhangsan'},{age:'18'}];
   res.set({'Content-Type':'application/json;charset=UTF-8'});
   let dat2={
    "code": 0,
    "msg": "",
    "count": 1000,
    "data":[
    {
        "SID": 10000,
        "SNAME": "user-0",
        "STAG": "女",
        "PRICE": "城市-0",
        "PRICE": "签名-0",
        "REPE": 255,
        "DIAN": 24
    },{
        "SID": 10000,
        "SNAME": "user-0",
        "STAG": "女",
        "PRICE": "城市-0",
        "PRICE": "签名-0",
        "REPE": 255,
        "DIAN": 24
    },{
        "SID": 10000,
        "SNAME": "user-0",
        "STAG": "女",
        "PRICE": "城市-0",
        "PRICE": "签名-0",
        "REPE": 255,
        "DIAN": 24
    },{
        "SID": 10000,
        "SNAME": "user-0",
        "STAG": "女",
        "PRICE": "城市-0",
        "PRICE": "签名-0",
        "REPE": 255,
        "DIAN": 24
    },{
        "SID": 10000,
        "SNAME": "user-0",
        "STAG": "女",
        "PRICE": "城市-0",
        "PRICE": "签名-0",
        "REPE": 255,
        "DIAN": 24
    },{
        "SID": 10000,
        "SNAME": "user-0",
        "STAG": "女",
        "PRICE": "城市-0",
        "PRICE": "签名-0",
        "REPE": 255,
        "DIAN": 24
    }
    ]
    };
         
    res.send(dat2);
});

// Router.route('/:id').get(async(req, res) => {
//     res.set({'Content-Type':'text/html;'});
//     var fs = require('fs');
//     var data = fs.readFileSync('.//lay//html//index.html');
//     res.send(data);
//     })


module.exports = Router;
