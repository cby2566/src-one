/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/    
layui.define(['layer', 'form','element','table'], function(exports){
  var layer = layui.layer
  ,form = layui.form,dome=layui.dome,element = layui.element,table=layui.table;


  
  console.log('index.js',xxx);
  layer.msg('Hello World');
  
<<<<<<< HEAD
  //element.init(); //更新全部  2.1.6 可用 element.render() 方法替代
  //element.render('nav'); 
  
  //element.on('nav()', function(elem){
    
    //layer.msg(elem.text());
//});

  //element.on('nav(do)', function(elem){
    //layer.msg('面包屑');
 // });
=======

>>>>>>> 592d13463628786034902e4a6655f5725f595374

  exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

layui.use(['demo','goodlist'],function(demo,goodlist){
    console.log(demo(),goodlist());
    // xxx=demo();
    xxx.demo=demo;
    xxx.goodlist=goodlist;
    // xxx.classify=classify;
    console.log(xxx.demo(),xxx.goodlist());
})
var xxx={};