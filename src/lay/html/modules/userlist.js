
layui.define(function(exports){
  //do something
  console.log('userlist.js');
  exports('userlist', function(){
    //如果不暴露接口，会过几十秒提示错误 如下
    //err：Layui hint: userlist is not a valid module
    //alert('Hello World!');
    return {userFun:userF,userFun2:userF2};
  });
});

function userF(layer,data,obj){
//用户添加修改
let fname='',fpws='',tie='',fid='';
if(typeof(data)=='object'){
    fid=data['fid'];
    fname=data['fname'];
    fpws=data['fpws'];
    tie='修改用户';
}else{
    tie='添加用户';
}
    let ht=`
    <form class="layui-form" action="" lay-filter='username1'>
        <div class="layui-form-item">
            <label class="layui-form-label ">用户名</label>
            <div class="layui-input-inline">
                <input type="text" name="fname" required  lay-verify="required" value="${fname}" autocomplete="off" class="layui-input fname" >
            </div>
            <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label ">密码</label>
            <div class="layui-input-inline">
                <input type="text" name="fpws" required  lay-verify="required" value="${fpws}" autocomplete="off" class="layui-input fpws" >
            </div>
            <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>
        
    </form>`;
     layer.open({
        title: tie
        ,content: ht
        ,skin: 'demo-class'
        ,area:['auto', 'auto']
        ,yes:function(index, layero){
                fname=layero[0].querySelector('.fname').value;
                fpws=layero[0].querySelector('.fpws').value;
                var xhr =new XMLHttpRequest();
                if (typeof(data)=='object') {
                    obj.update({fid:fid,fname:fname});
                    xhr.open('get',`/user/amend?username=${fname}&password=${fpws}&fid=${fid}`,true);
                }else{
                    xhr.open('get',`/user/add?username=${fname}&password=${fpws}`,true);
                }
                xhr.send();
                layer.close(index);          
            }
        });


     return {fid,fname};
}
function userF2(layer,data,obj){
//商品分类修改
    
    let qname='',tie='',qid='';
         
    if(typeof(data)=='object'){
        qname=data['qname'];
        qid=data['qid'];
        tie='修改商品分类';
    }else{
        tie='添加商品分类';
    }
    let ht=`
    <form class="layui-form" action="" lay-filter='username1'>
        <div class="layui-form-item">
            <label class="layui-form-label ">商品分类名</label>
            <div class="layui-input-inline">
                <input type="text" name="qname" required  lay-verify="required" value="${qname}" autocomplete="off" class="layui-input qname" >
            </div>
            <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>
    </form>`;

    layer.open({
        title: tie
        ,content: ht
        ,skin: 'demo-class'
        ,area:['auto', 'auto']
        ,yes:function(index, layero){
                qname=layero[0].querySelector('.qname').value;
                var xhr =new XMLHttpRequest();
                if (typeof(data)=='object') {
                    obj.update({qname:qname});
                    xhr.open('get',`/goods/classify/amend?qname=${qname}&qid=${qid}`,true);
                }else{
                    xhr.open('get',`/goods/classify/add?qname=${qname}`,true);
                }
                xhr.send();

                layer.close(index);          
            }
        });

}
