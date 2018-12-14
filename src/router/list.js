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
        "id": 10000,
        "username": "user-0",
        "sex": "女",
        "city": "城市-0",
        "sign": "签名-0",
        "experience": 255,
        "logins": 24,
        "wealth": 82830700,
        "classify": "作家",
        "score": 57
    },
    {
        "id": 10001,
        "username": "user-1",
        "sex": "男",
        "city": "城市-1",
        "sign": "签名-1",
        "experience": 884,
        "logins": 58,
        "wealth": 64928690,
        "classify": "词人",
        "score": 27
    },
    {
        "id": 10002,
        "username": "user-2",
        "sex": "女",
        "city": "城市-2",
        "sign": "签名-2",
        "experience": 650,
        "logins": 77,
        "wealth": 6298078,
        "classify": "酱油",
        "score": 31
    }]
    };
    //console.log(dat2)
         
    res.send(dat2);
});

// Router.route('/:id').get(async(req, res) => {
//     res.set({'Content-Type':'text/html;'});
//     var fs = require('fs');
//     var data = fs.readFileSync('.//lay//html//index.html');
//     res.send(data);
//     })


module.exports = Router;
