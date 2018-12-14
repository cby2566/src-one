const express=require('express');
let Router= express.Router();

Router.get('/',(req,res)=>{
    res.send('user')
});

module.exports=Router;