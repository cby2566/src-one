const express = require('express');
const _sql = require('./sql');
let Router = express.Router();

Router.get('/', async(req, res) => {
    // res.set({'Content-Type':'application/json;charset=UTF-8'});
    let sql = `SELECT * FROM ulist`;
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

Router.route('/:id')
    //获取商品信息
    .get(async(req, res) => {
        let sql = `SELECT * FROM ulist WHERE SID=${req.params.id}`;
        let data = await _sql.query(sql);
        res.send(data);
    })
    //修改商品信息
    .post((req, res) => {

    })

module.exports = Router;