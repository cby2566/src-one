const express=require('express');
const _sql = require('./sql');
let Router= express.Router();

Router.get('/',async(req,res)=>{
    let {page,limit} = req.query;
    let sql=`select * from f_user`;
    let sql2=`SELECT COUNT(*) AS'i' FROM f_user`
    let data = await _sql.query(sql);
    let dataArr=[];
    // console.log(data.data[0].status)
    for(let i=0;i<data.data.length;i++){
        if(data.data[i].status!=1){
            // console.log(data.data[i]);
            dataArr.push(data.data[i]);
        }
    }
    console.log(dataArr);
    var dataArr1 = dataArr.splice((page-1)*10,limit);
    let data1 = await _sql.query(sql2);
    let data2={
        "code": 0,
        "msg": "20",
        "count": data1.data[0].i,
        "data":dataArr1
    }
    res.send(data2);
});

module.exports=Router;