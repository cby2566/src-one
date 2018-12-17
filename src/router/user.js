const express=require('express');
let Router= express.Router();

Router.get('/',(req,res)=>{
    let dat2={
        "code": 0,
        "msg": "",
        "count": 1000,
        "data":[
            {
                "fid": 10000,
                "fname": "user-0",
                "sex": "女",
                "city": "城市-0",
                "sign": "签名-0"
            },
            {
                "fid": 10001,
                "fname": "user-3",
                "sex": "女",
                "city": "城市-0",
                "sign": "签名-0"
            },
            {
                "fid": 10002,
                "fname": "user-7",
                "sex": "女",
                "city": "城市-0",
                "sign": "签名-0"
            },
            {
                "fid": 10003,
                "fname": "user-2",
                "sex": "女",
                "city": "城市-0",
                "sign": "签名-0"
            },
            {
                "fid": 10004,
                "fname": "user-3",
                "sex": "女",
                "city": "城市-0",
                "sign": "签名-0"
            }
        ]
    }
    res.send(dat2)
});

module.exports=Router;