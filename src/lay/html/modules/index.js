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

    //测试路由
    if(this.dataset.id==1){
      var xhr=new XMLHttpRequest();
      xhr.open('get','/list');
      xhr.send();
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
          console.log(xhr.responseText);
        }
        
             
      }
    }
  });

  element.on('nav(do)', function(elem){
    layer.msg('面包屑');
  });
  


  // table.render({
  //   elem: '#test'
  //   //,url:'http://10.3.141.224:3007/api'
  //   ,url:'/list'
  //   //,page:{curr:2}
  //   ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
  //   ,cols: [[
  //     {field:'id', title: 'ID', sort: true}
  //     ,{field:'username', title: '用户名'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
  //     ,{field:'sex', title: '性别', sort: true}
  //     ,{field:'city', title: '城市'}
  //     ,{field:'sign', title: '签名'}
  //     ,{field:'classify', title: '职业', align: 'center'} //单元格内容水平居中
  //     ,{field:'experience', title: '积分', sort: true, align: 'right'} //单元格内容水平居中
  //     ,{field:'score', title: '评分', sort: true, align: 'right'}
  //     ,{field:'wealth', title: '财富', sort: true, align: 'right'}
  //   ]]
  // });

  layui.use('table', function(){
    var table = layui.table;
    
    table.render({
      elem: '#test'
      ,url:'/list'
      ,toolbar: '#toolbarDemo'
      ,title: '用户数据表'
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
        ,{field:'username', title:'商品名称', width:120, edit: 'text'}
        
        ,{field:'sex', title:'分类', width:80, edit: 'text', sort: true}
        ,{field:'city', title:'价格（原价）', width:120}
        ,{field:'sign', title:'价格（现价）', width:120}
        ,{field:'experience', title:'库存', width:80, sort: true}
        ,{field:'ip', title:'状态', width:120}
        ,{field:'joinTime', title:'加入时间', width:120}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
      ]]
      ,page: true
    });
    
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
      var checkStatus = table.checkStatus(obj.config.id);
      switch(obj.event){
        case 'getCheckData':
          var data = checkStatus.data;
          layer.alert(JSON.stringify(data));
        break;
        case 'getCheckLength':
          var data = checkStatus.data;
          layer.msg('选中了：'+ data.length + ' 个');
        break;
        case 'isAll':
          layer.msg(checkStatus.isAll ? '全选': '未全选');
        break;
      };
    });
    
    //监听行工具事件
    table.on('tool(test)', function(obj){
      var data = obj.data;
      //console.log(obj)
      if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        layer.prompt({
          formType: 2
          ,value: data.email
        }, function(value, index){
          obj.update({
            email: value
          });
          layer.close(index);
        });
      }
    });
  });


  exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

layui.use(['demo'],function(demo){
    console.log(demo());
    xxx=demo();


})
var xxx='';