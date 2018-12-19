const express = require('express');
const _sql = require('./sql');
const multer=require('multer');
const path =require('path');
let Router = express.Router();
//商品列表渲染
Router.get('/', async(req, res) => {
    // res.set({'Content-Type':'application/json;charset=UTF-8'});
    let {page,limit} = req.query;
    console.log(page,limit)
    let sql = `select * from ulist ORDER BY SID LIMIT ${(page-1)*10},${limit}`;
    let sql2=`SELECT COUNT(*) AS'i' FROM ulist`
    let data = await _sql.query(sql);
    let data1 = await _sql.query(sql2);
    let data2={
        "code": 0,
        "msg": "",
        "count": data1.data[0].i,
        "data":data.data
    }
    res.send(data2);
});

//商品分类渲染
Router.get('/classify', async(req, res) => {
    // res.set({'Content-Type':'application/json;charset=UTF-8'});
    let {page,limit} = req.query;
    let sql = `SELECT * FROM classify LIMIT ${(page-1)*10},${limit}`;
    let sql2=`SELECT COUNT(*) AS'i' FROM classify`
    let data = await _sql.query(sql);
    let data1 = await _sql.query(sql2);
    let data2={
        "code": 0,
        "msg": "",
        "count": data1.data[0].i,
        "data":data.data
    }
    res.send(data2);
});

Router.get('/classify/add',async(req, res)=>{
    let {qname}=req.query;
    let sql=`INSERT into classify (qname) VALUES ('${qname}')`;
    let data = await _sql.query(sql);
    res.send(data);
});

Router.get('/classify/amend',async(req, res)=>{
    let {qname,qid}=req.query;
    let sql=`UPDATE classify SET qname='${qname}' where qid = ${qid}`;
    let data = await _sql.query(sql); 
    res.send(data);
});

//删除数据
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
});

//上下架更新
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
});

//添加商品
Router.get('/insert',async (res,req)=>{
    let {STAG,SNAME,SCON,PRICE,DIAN,REPE,URL}=res.query;
    console.log(STAG,SNAME,SCON,PRICE,DIAN,REPE)
    let sql=`INSERT into ulist (STAG,SNAME,SCON,PRICE,DIAN,URL,REPE) VALUES ('${STAG}','${SNAME}','${SCON}','${PRICE}','${DIAN}','${URL}',${REPE})`;
    let data = await _sql.query(sql);
    req.send(data);
});

//更新商品接口
Router.get('/update',async (res,req)=>{
    let {STAG,SNAME,SCON,PRICE,DIAN,REPE,SID}=res.query;
    //console.log(STAG,SNAME,SCON,PRICE,DIAN,REPE)
    let sql=`UPDATE ulist SET STAG='${STAG}',SNAME='${SNAME}',SCON='${SCON}',PRICE='${PRICE}',DIAN='${DIAN}',REPE=${REPE} WHERE SID=${SID}`;
    console.log(sql);
    let data = await _sql.query(sql);
    req.send(data);
});
//添加商品图片
var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        // console.log('file:',file)
        let ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now()+ext);
    }
})
    
let upload=multer({storage});

Router.post('/upload',upload.single('imgupload'), (req,res)=>{
    // 通过req.file获取到上传文件的内容
    console.log(path.normalize(req.file.path),req.body);//req.body获取imgid
    // 存储到数据库

    res.send({
        code:1,
        msg:'文件上传成功',
        data:req.file
    })
});

module.exports = Router;