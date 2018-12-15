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
      ,url:'/goods'
      ,toolbar: `<div class="layui-btn-container">
      <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
      <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>
      <button class="layui-btn layui-btn-sm" lay-event="isAll">验证是否全选</button>
    </div>`
      ,title: '商品列表'
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field:'SID', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
        ,{field:'SNAME', title:'商品名称', width:120, edit: 'text'}
        
        ,{field:'STAG', title:'分类', width:80, edit: 'text', sort: true}
        ,{field:'PRICE', title:'价格（原价）', width:120}
        ,{field:'PRICE', title:'价格（现价）', width:120}
        ,{field:'REPE', title:'库存', width:80, sort: true}
        ,{field:'DIAN', title:'状态', width:120}
        ,{field:'joinTime', title:'加入时间', width:150}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:200}
      ]]
      ,page: true
      ,limit: 10
    });
    
    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
      console.log(obj)
    });
    //监听工具条
    table.on('tool(barDemo)', function(obj){
      var data = obj.data;
      if(obj.event === 'detail'){
        layer.msg('ID：'+ data.id + ' 的查看操作');
      } else if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        layer.alert('编辑行：<br>'+ JSON.stringify(data))
      }
    });
    
    var $ = layui.$, active = {
      getCheckData: function(){ //获取选中数据
        var checkStatus = table.checkStatus('idTest')
        ,data = checkStatus.data;
        layer.alert(JSON.stringify(data));
      }
      ,getCheckLength: function(){ //获取选中数目
        var checkStatus = table.checkStatus('idTest')
        ,data = checkStatus.data;
        layer.msg('选中了：'+ data.length + ' 个');
      }
      ,isAll: function(){ //验证是否全选
        var checkStatus = table.checkStatus('idTest');
        layer.msg(checkStatus.isAll ? '全选': '未全选')
      }
    };
    
    $('.demoTable .layui-btn').on('click', function(){
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  
    
    
  });


  exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

layui.use(['demo'],function(demo){
    console.log(demo());
    xxx=demo();


})
var xxx='';