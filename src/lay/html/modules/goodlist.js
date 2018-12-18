layui.define(['table','element','form'],function(exports){
    //商品列表渲染
    let element = layui.element
    element.init(); //更新全部  2.1.6 可用 element.render() 方法替代
    element.render('nav');
	   //渲染表格封装方法
    // var table = layui.table;
    //var form = layui.form;
    //tableRender(table,form);
    element.on('nav()', function(elem){
    
    var table = layui.table;
    var form = layui.form;

    //得到teble对象
    if(this.dataset.id==1){
		//渲染表格封装方法
    let title='商品列表';
    let url ='/goods';

    
    let arr1=['ID','商品名称','分类','价格（原价）','价格（现价）','库存','状态','加入时间'];
    let arr2=['SID','SNAME','STAG','PRICE','PRICE','REPE','DIAN','joinTime'];
    tableRender(table,form,function(){
      return [arr1,arr2,title,url];
    });

    }
    if(this.dataset.id==2){

      let arr1=['ID','商品分类'];
      let arr2=['qid','qname'];
      let title=arr1[1];
      let url ='/goods/classify';

      tableRender(table,form,function(){
        return [arr1,arr2,title,url];
      });
    }

    if(this.dataset.id==3){

      let arr1=['ID','用户名','加入时间'];
      let arr2=['fid','fname','joi'];
      let title='用户列表';
      let url ='/user';

      tableRender(table,form,function(){
        return [arr1,arr2,title,url];
      });
    }

    })
  
    
    exports('goodlist', function(){
      //alert('Hello World!');
      return {aoe:'20',boe:35};
      //设置该模块返回值
    });
  });


  function tableRender(table,form,arrConfig){
    //表格渲染
    // let arr1=['ID','商品名称','分类','价格（原价）','价格（现价）','库存','状态','加入时间'];
    // let arr2=['SID','SNAME','STAG','PRICE','PRICE','REPE','DIAN','joinTime'];
    
    let arr1=arrConfig()[0];
    let arr2=arrConfig()[1];
    //暂时区分添加商品和商品下架      
    let add_item=arrConfig()[2]=='商品列表'?`<button class="layui-btn layui-btn-sm" lay-event="add_item">添加商品</button>`:'';

    let str=''
    let arr3=[];
    let arr4=[];
    //拼接表头
    arr3.push({type:'checkbox',fixed: 'left'});
    for(let i=0;i<arr1.length;i++){
     let item={field:arr2[i],title:arr1[i]};
     arr3.push(item);
    }
    arr3.push({fixed: 'right', title:'操作', toolbar: '#barDemo', width:200});
    arr4.push(arr3);
    //拼接表头按键组
    let TaB=`<div class="layui-btn-container" lay-filter="addi">
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>
            <button class="layui-btn layui-btn-sm" lay-event="isAll">验证是否全选</button>
			       ${add_item}
          </div>`;
  
    let clo={elem: '#test',
            url:arrConfig()[3],
            toolbar:TaB,
            title: arrConfig()[2],
            cols:arr4,
            page: {curr:1},
            limit: 10,
            done: function(res, curr, count){
              var updown=document.querySelectorAll('.updown');
              for(var i=0;i<updown.length;i++){
                let ok=updown[i].parentNode.parentNode.parentNode.children[7]
                if(ok){
                  let status=ok.innerText;
                  if(status==1){
                    updown[i].innerText='上架';
                    updown[i].classList.add('layui-btn-warm');
                  }
                }
              }

              //得到当前页码
              console.log(curr,res); 
              
            }
          };
    //console.log(clo);
    
    table.render(clo);

    table.on('tool()', function(obj){
        var data = obj.data;
        if(obj.event === 'up'){
          // layer.msg('ID：'+ data.id + ' 的查看操作');
          console.log(this)
          let statusText=this.parentNode.parentNode.parentNode.children[7];
          var status = [200,304];
          var uid=Object.values(data)[0];
          console.log(uid)
          if(this.classList.contains('layui-btn-warm')){
            this.innerText='下架';
            this.classList.remove('layui-btn-warm');
            
            var xhr =new XMLHttpRequest();
            xhr.open('get',`/goods/updown?type=down&id=${uid}`,true);
            xhr.send();
            xhr.onload=()=>{
              if(status.includes(xhr.status)){
                let res=JSON.parse(xhr.responseText)
                console.log(res)
                if(res.status==1){
                  statusText.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;2';
                }
               }
            }
          }else{
            this.innerText='上架';
            this.classList.add('layui-btn-warm')
            var xhr =new XMLHttpRequest();
            xhr.open('get',`/goods/updown?type=up&id=${uid}`,true);
            xhr.send();
            xhr.onload=()=>{
              if(status.includes(xhr.status)){
                let res=JSON.parse(xhr.responseText)
                if(res.status==1){
                  statusText.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;1';
                }
               }
            }
          }
        } else if(obj.event === 'del'){
          layer.confirm('真的删除行么', function(index){
            obj.del();
            layer.close(index);
            var id=Object.keys(data)[0];
            var value=Object.values(data)[0];
            var status = [200,304];
            var xhr =new XMLHttpRequest();
            xhr.open('delete',`/goods?id=${id}&value=${value}`,true);
            xhr.send();
            xhr.onload=()=>{
              if(status.includes(xhr.status)){
                console.log(JSON.parse(xhr.responseText).status)
                
              }
            }
          });
        } else if(obj.event === 'edit'){
          ///layer.alert('编辑行：<br>'+ JSON.stringify(data))
		  let data1=JSON.stringify(data);
               
          add_pop(layer,form,'xiugai',data);
        }
      });
	  
	//监听表头事件
    table.on('toolbar()', function(obj){
      var checkStatus = table.checkStatus(obj.config.id);
      console.log(obj.event)
      if(obj.event=='add_item'){
          add_pop(layer,form);
      }
    });
  }
  
function add_pop(layer,form,xiu_g,jis){
  //测试增加修改商品弹出框

let titi='';
let sid=0;

let ht=`
<form class="layui-form" action="" lay-filter='username1'>
  <div class="layui-form-item">
    <label class="layui-form-label ">商品名</label>
    <div class="layui-input-inline">
      <input type="text" name="SNAME" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input SNAME" >
    </div>
    <div class="layui-form-mid layui-word-aux">辅助文字</div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label ">副标题</label>
    <div class="layui-input-inline">
      <input type="text" name="STAG" required lay-verify="required" placeholder="请输入副标题" autocomplete="off" class="layui-input STAG">
    </div>
    <div class="layui-form-mid layui-word-aux">辅助文字</div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label ">商品价格</label>
    <div class="layui-input-inline">
      <input type="text" name="PRICE" required lay-verify="required" placeholder="请再次商品价格" autocomplete="off" class="layui-input PRICE">
    </div>
    <div class="layui-form-mid layui-word-aux">辅助文字</div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label">商品库存</label>
    <div class="layui-input-inline">
      <input type="text" name="REPE" required  lay-verify="required" placeholder="请输入剩余数量" autocomplete="off" class="layui-input REPE">
    </div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label">商品分类</label>
    <div class="layui-input-inline">
      <select name="city" lay-verify="required">
        <option value=""></option>
        <option value="0">食品</option>
        <option value="1">鱼</option>

      </select>
    </div>
  </div>
  
  <div class="layui-form-item"> <!-- 注意：这一层元素并不是必须的 -->
    <label class="layui-form-label">日期</label>
    <input type="text" class="layui-input layui-input-inline" id="test1" placeholder="上架日期">
  </div>

  <div class="layui-form-item">
    <label class="layui-form-label">上架</label>
    <div class="layui-input-block">
      <input type="checkbox" name="switch" lay-skin="switch" lay-filter="shang">
    </div>
  </div>

    <div class="layui-form-item">
    <label class="layui-form-label">商品描述</label>
    <div class="layui-input-block">
      <textarea name="SCON" placeholder="请输入内容" class="layui-textarea SCON"></textarea>
    </div>
  </div>


<button type="button" class="layui-btn" id="test2">
  <i class="layui-icon">&#xe67c;</i>上传图片
</button>

<script>
layui.use('upload', function(){
  var upload = layui.upload;
   
  //执行实例
  var uploadInst = upload.render({
    elem: '#test2' //绑定元素
  });
});
</script>


</form>
`;

//下架操作
form.on('switch(shang)', function(data){
  //console.log(data.elem); //得到checkbox原始DOM对象
  console.log(data.elem.checked); //开关是否开启，true或者false
  //console.log(data.value); //开关value值，也可以通过data.elem.value得到
  //console.log(data.othis); //得到美化后的DOM对象
}); 
  if(xiu_g=='xiugai'){
    titi='修改商品';  
    sid=jis['SID'];
  }else{
    titi='添加商品';
  }
//
  


  layer.open({
    title: titi
    ,content: ht
    //,offset: '100px'
    ,skin: 'demo-class'
    ,area:['800px', 'auto']
    ,yes:function(index, layero){
      //console.log(layero[0].querySelector('.SCON').value);
      let scon=layero[0].querySelector('.SCON').value;
      let sname=layero[0].querySelector('.SNAME').value;
      let stag=layero[0].querySelector('.STAG').value;
      let dian=1;//分类
      let repe=Number(layero[0].querySelector('.REPE').value);//库存
      let price=layero[0].querySelector('.PRICE').value;

      console.log(scon,sname,stag,dian,repe,price);
           
      var status = [200,304];
      var xhr =new XMLHttpRequest();
      let dat_add='insert';
      dat_add=xiu_g=='xiugai'?'update':dat_add;
            xhr.open('get',`/goods/${dat_add}?SCON=${scon}&SNAME=${sname}&STAG=${stag}&DIAN=${dian}&REPE=${repe}&PRICE=${price}&SID=${sid}`,true);
            xhr.send();
            xhr.onload=()=>{
              if(status.includes(xhr.status)){
                console.log(JSON.parse(xhr.responseText).status);
              }
            }

      layer.close(index);
    }

  });
console.log(jis['SNAME'])
 
form.val("username1", {
  "SNAME": jis['SNAME'],
  "STAG": jis['STAG'],
  "SCON": jis['SCON'],
  "PRICE": jis['PRICE'],
  "REPE": jis['REPE'],
  "DIAN": jis['DIAN'],
});
form.render();//刷新表单样式-全部
}
  