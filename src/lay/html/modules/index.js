/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/    
layui.define(['layer', 'form','element','table','laydate'], function(exports){
  var layer = layui.layer
  ,form = layui.form,dome=layui.dome,element = layui.element,table=layui.table,laydate=layui.laydate;


  
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
//测试弹出框

let ht=`
<form class="layui-form" action="">
	<div class="layui-form-item">
		<label class="layui-form-label">用户名</label>
		<div class="layui-input-block">
			<input type="text" name="title" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
		</div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label">密码框</label>
    <div class="layui-input-inline">
      <input type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
    </div>
    <div class="layui-form-mid layui-word-aux">辅助文字</div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label">重复密码</label>
    <div class="layui-input-inline">
      <input type="password" name="password" required lay-verify="required" placeholder="请再次输入密码" autocomplete="off" class="layui-input">
    </div>
    <div class="layui-form-mid layui-word-aux">辅助文字</div>
  </div>
  
  <div class="layui-form-item">
		<label class="layui-form-label">手机号码</label>
		<div class="layui-input-inline">
			<input type="text" name="title" required  lay-verify="required" placeholder="请输入手机号码" autocomplete="off" class="layui-input">
		</div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label">性别</label>
    <div class="layui-input-inline">
      <select name="city" lay-verify="required">
        <option value=""></option>
        <option value="0">男</option>
        <option value="1">女</option>

      </select>
    </div>
  </div>
  
	<div class="layui-form-item"> <!-- 注意：这一层元素并不是必须的 -->
		<label class="layui-form-label">日期</label>
	  <input type="text" class="layui-input layui-input-inline" id="test1" placeholder="请输入手机号码">
	</div>

</form>
`;

  layer.open({
	  title: '添加商品'
	  ,content: ht
	  ,offset: '100px'
	  ,skin: 'demo-class'
	  ,area:['800px', '800px']
	}); 
  form.render();
  
  
  laydate.render({
    elem: '#test1' //指定元素
  });
  
  element.on('nav(do)', function(elem){
    layer.msg('面包屑');
  });

  //表格勾选
 form.on('checkbox()', function(data){
  console.log(data.elem.parentNode.parentNode); //得到checkbox原始DOM对象
  //console.log(data.elem.checked); //是否被选中，true或者false
  //console.log(data.value); //复选框value值，也可以通过data.elem.value得到
  //console.log(data.othis); //得到美化后的DOM对象
}); 
  


  table.render({
    elem: '#test'
    //,url:'http://10.3.141.224:3007/api'
    ,url:'/list'
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