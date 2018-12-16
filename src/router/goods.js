const express = require('express');
const _sql = require('./sql');
let Router = express.Router();

Router.get('/', async(req, res) => {
    // res.set({'Content-Type':'application/json;charset=UTF-8'});
    let sql = `SELECT * FROM ulist order by sid`;
    let sql2=`SELECT COUNT(*) AS'i' FROM ulist`
    let data = await _sql.query(sql);
    let data1 = await _sql.query(sql2);
    let data2={
        "code": 0,
        "msg": "",
        "count": data1.data.i,
        "data":data.data
    }
    res.send(data2);
});

Router.get('/classify', async(req, res) => {
    // res.set({'Content-Type':'application/json;charset=UTF-8'});
    let sql = `SELECT * FROM classify`;
    let sql2=`SELECT COUNT(*) AS'i' FROM classify`
    let data = await _sql.query(sql);
    let data1 = await _sql.query(sql2);
    let data2={
        "code": 0,
        "msg": "",
        "count": data1.data.i,
        "data":data.data
    }
    res.send(data2);
});
Router.delete('/',async (req, res) => {
    let id=req.query.id;
    let value=req.query.value;
    let sql;
    switch(id){
        case 'SID':
        sql= `DELETE from ulist where SID='${value}'`;
        break;
        case 'qid':
        sql= `DELETE from classify where qid='${value}'`;
        break;
        case 'fid':
        sql= `DELETE from f_user where fid='${value}'`;
        break;
    }
    let data = await _sql.query(sql);
    res.send(data);
})

Router.get('/updown',async(req,res)=>{
    let id=req.query.id;
    let type=req.query.type;
    let sql;
    switch(type){
        case 'up':
        sql= `UPDATE ulist SET DIAN = 1 WHERE SID = ${id}`;
        break;
        case 'down':
        sql=`UPDATE ulist SET DIAN = 2 WHERE SID = ${id}`;
        break;
    }
    // if(type=='up'){
    //     console.log(123)
    //     sql= `UPDATE ulist SET DIAN = 1 WHERE SID = ${id}`;
    // }else if(type=='down'){
    //     sql=`UPDATE ulist SET DIAN = 2 WHERE SID = ${id}`;
    // }
    let data = await _sql.query(sql);
    res.send(data);
})

// Router.route('/:id')
//     //获取商品信息
//     .get(async(req, res) => {
//         let sql = `SELECT * FROM ulist WHERE SID=${req.params.id}`;
//         let data = await _sql.query(sql);
//         res.send(data);
//     })
//     //修改商品信息
//     // .delete((req, res) => {
//     //     console.log(res.query)
//     // })

Router.get('/insert',async (res,req)=>{
    let {STAG,SNAME,SCON,PRICE,DIAN,REPE}=res.query;
    console.log(STAG,SNAME,SCON,PRICE,DIAN,REPE)
    let sql=`INSERT into ulist (STAG,SNAME,SCON,PRICE,DIAN,REPE) VALUES ('${STAG}','${SNAME}','${SCON}','${PRICE}','${DIAN}',${REPE})`;
    let data = await _sql.query(sql);
    req.send(data);
})

module.exports = Router;