const express=require('express');
const bodyParser=require('body-parser');
const _sql=require('./sql');
let Router= express.Router();
let urlbodyparser=bodyParser.urlencoded({ extended: false });
Router.post('/',urlbodyparser, async (req,res)=>{
    let {username,password}=req.body;
    let sql=`SELECT * from f_user WHERE fname='${username}'AND fpws='${password}'AND status=1`;

    let data=await _sql.query(sql);
    res.send(data);
});

module.exports=Router;