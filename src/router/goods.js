const express = require('express');
const _sql = require('./sql');
let Router = express.Router();

Router.get('/', async(req, res) => {
    let sql = `SELECT * FROM ulist`;
    let data = await _sql.query(sql);
    res.send(data);
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