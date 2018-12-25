const express = require('express');
const _sql = require('./sql');
const multer=require('multer');
const path =require('path');
let Router = express.Router();

Router.get('/',async(req,res)=>{
    let {page,limit} = req.query;
    let sql=`select * from car`;
    let sql2=`SELECT car.fid,f_user.fname FROM car,f_user WHERE car.fid=f_user.fid`;

    let data = await _sql.query(sql);
    let data3 = await _sql.query(sql2);
    //console.log(data3)
        
    let data2={
        "code": 0,
        "msg": "20",
        "data":data.data
    }
    res.send(data2);
});


module.exports=Router;