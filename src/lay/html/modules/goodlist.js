layui.define(['table','element'],function(exports){
    //商品列表渲染
    element = layui.element
    element.init(); //更新全部  2.1.6 可用 element.render() 方法替代
    element.render('nav');
    element.on('nav()', function(elem){
    //得到teble对象
    if(this.dataset.id==1){
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
        ,page: {curr:2}
        ,limit: 10
      });
      
      //监听表格复选框选择
      table.on('checkbox()', function(obj){
        console.log(obj)
      });
      //监听工具条
      table.on('tool()', function(obj){
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
    }
    if(this.dataset.id==2){
      layui.use('table', function(){
        var table = layui.table;
        
        table.render({
          elem: '#test'
          ,url:'/goods/classify'
          ,toolbar: `<div class="layui-btn-container">
          <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
          <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>
          <button class="layui-btn layui-btn-sm" lay-event="isAll">验证是否全选</button>
        </div>`
          ,title: '商品列表'
          ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'qid', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
            ,{field:'qname', title:'姓名', width:800, edit: 'text'}
            ,{field:'sex', title:'性别', width:80, edit: 'text', sort: true}
            ,{field:'city', title:'价格（原价）', width:120}
            ,{field:'sign', title:'价格（现价）', width:120}
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
    }

    if(this.dataset.id==3){
      layui.use('table', function(){
        var table = layui.table;
        
        table.render({
          elem: '#test'
          ,url:'/user'
          ,toolbar: `<div class="layui-btn-container">
          <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
          <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>
          <button class="layui-btn layui-btn-sm" lay-event="isAll">验证是否全选</button>
        </div>`
          ,title: '用户列表'
          ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'fid', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
            ,{field:'fname', title:'商品分类', width:200, edit: 'text'}
            
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
    }

    })
  
    
    exports('goodlist', function(){
      //alert('Hello World!');
      return {aoe:'20',boe:35};
      //设置该模块返回值
    });
  });