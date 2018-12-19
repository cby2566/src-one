const express = require('express');
const _sql = require('./sql');
const multer=require('multer');
const path =require('path');
let Router = express.Router();
//商品列表渲染
Router.get('/', async(req, res) => {
    // res.set({'Content-Type':'application/json;charset=UTF-8'});

    let sql = `select * from ulist`;
    console.log(sql)
         
    let data = _sql.query(sql);
    console.log(data);
         
    let data2={
        "code": 0,
        "msg": "",
        "data":data
    }
    res.send(data2);
});

module.exports=Router;