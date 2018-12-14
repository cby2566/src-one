const express=require('express');
const loginRouter=require('./login');
const userRouter=require('./user');
const goodsRouter=require('./goods');

const ulist_1=require('./list');

let Router= express.Router();
//登录验证
Router.use('/login',loginRouter);
//用户
Router.use('/user',userRouter);
//商品
Router.use('/goods',goodsRouter);

//测试路由
Router.use('/list',ulist_1);
Router.use('/list/aa',ulist_1);

module.exports=Router;