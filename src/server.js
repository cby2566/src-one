const express=require('express');
const {port,root,host}=require('./config');
const Router=require('./router');
let app=express();

app.use(express.static(root));

app.use(Router);

app.listen(port,()=>{
    console.log(`服务器已启动，http://${host}:${port}`)
})