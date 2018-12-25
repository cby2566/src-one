layui.define(function(exports){
  //do something
  console.log('carcar.js');
  
  exports('carcar', function(){
    //alert('Hello World!');
    return {car:car};
  });
});

function car(car1,sid){
    car1.style.display='block';

    let xhr = new XMLHttpRequest();

    xhr.open('GET','/car');
    xhr.send();
    xhr.onload=function(){
      if(xhr.status==200&&xhr.readyState==4){

             
        let data = { name :'laoxie',data2:JSON.parse(xhr.responseText).data,selected:[]};

        let vm=new Vue({
            el:'#carc',
            data: data,
            computed:{
                //这里的函数默认为getter
                ckeckall:{
                    get(){
                        if(this.selected.length==this.data2.length)
                            return true;
                        else
                            return false;
                    },
                    set(c){
                        //全选按键勾选时，知识点多选框的默认值是否是数组
                        if(c)
                            this.selected = this.data2.map((item,idx)=>idx);
                        else
                            this.selected=[];
                    }
                }
            }
        });
        
             
      }

      
    }

         
}