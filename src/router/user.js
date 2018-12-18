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
        if(data.data[i].status==1){
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
        "count": dataArr1.length,
        "data":dataArr1
    }
    res.send(data2);
});

Router.get('/add',async(req,res)=>{
    let {password,username} = req.query;
    let sql=`INSERT INTO f_user (fname,fpws,STATUS) VALUES ('${username}','${password}',1)`;
    let data = await _sql.query(sql);
    res.send(data);
})

Router.get('/amend',async(req,res)=>{
    let {password,username,fid} = req.query;
    let sql=`UPDATE f_user SET fname='${username}',fpws='${password}' where fid = ${fid}`;
    let data = await _sql.query(sql);
    res.send(data);
})

module.exports=Router;