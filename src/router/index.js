const express=require('express');
const loginRouter=require('./login');
const userRouter=require('./user');
const goodsRouter=require('./goods')
let Router= express.Router();
//登录验证
Router.use('/login',loginRouter);
//用户
Router.use('/user',userRouter);
//商品
Router.use('/goods',goodsRouter);

module.exports=Router;