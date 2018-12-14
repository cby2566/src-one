/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/    
layui.define(['layer', 'form','element','table'], function(exports){
  var layer = layui.layer
  ,form = layui.form,dome=layui.dome,element = layui.element,table=layui.table;


  
  console.log('index.js',xxx);
  layer.msg('Hello World');
  
  element.init(); //更新全部  2.1.6 可用 element.render() 方法替代
  element.render('nav'); 
  
  element.on('nav()', function(elem){
    
    layer.msg(elem.text());
  });

  element.on('nav(do)', function(elem){
    layer.msg('面包屑');
  });
  


  table.render({
    elem: '#test'
    ,url:'http://10.3.141.224:3007/api'
    //,page:{curr:2}

    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    ,cols: [[
      {field:'id', title: 'ID', sort: true}
      ,{field:'username', title: '用户名'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      ,{field:'sex', title: '性别', sort: true}
      ,{field:'city', title: '城市'}
      ,{field:'sign', title: '签名'}
      ,{field:'classify', title: '职业', align: 'center'} //单元格内容水平居中
      ,{field:'experience', title: '积分', sort: true, align: 'right'} //单元格内容水平居中
      ,{field:'score', title: '评分', sort: true, align: 'right'}
      ,{field:'wealth', title: '财富', sort: true, align: 'right'}
    ]]
  });




  exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

layui.use(['demo'],function(demo){
    console.log(demo());
    xxx=demo();


})
var xxx='';