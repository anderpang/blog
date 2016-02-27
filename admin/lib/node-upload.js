/****************************
@author:anderpang@qq.com
@version:2014/2/15
@param:
   1、必填：request=ServerRequest,
   2、可选：
      config={
        savepath:'',  //保存路径
        maxsize:0,    //文件最大尺寸（字节数）,0为不限
        extname:'*'   //扩展名（带“.”，多个逗号隔开)，“*”不限，如:extname:'.gif,.jpg,.png'
      }
   3、可选：回调函数
@return:Object
  error:
    0:成功
    1:文件超大
    2:非指定类型文件
    9:未选择上传文件
@example: 
     var http=require("http");
     var upload=require("./node-upload");
     http.createServer(function(request,response){
         upload(request,function(obj){
             console.log(obj);
         });
     });
******************************/
module.exports=function(g){var e={savepath:__dirname+"/",maxsize:0,extname:"*"},h,d=arguments.length,f,a=require("fs"),b=new Buffer(g.headers["content-length"]*1),c=0;if(d==2){if(arguments[1].constructor==Function){h=arguments[1]}else{f=arguments[1]["savepath"];e.maxsize=arguments[1]["maxsize"]||e.maxsize;e.extname=arguments[1]["extname"]||e.extname}}else{if(d==3){h=arguments[2];f=arguments[1]["savepath"];e.maxsize=arguments[1]["maxsize"]||e.maxsize;e.extname=arguments[1]["extname"]||e.extname}}if(f){if(f.indexOf(":")==-1){f=__dirname+"/"+f}if(f.slice(-1)!="/"){f+="/"}if(a.existsSync(f)){e.savepath=f}}e.extname=e.extname.toLowerCase();g.addListener("data",function(i){i.copy(b,c);c+=i.length});g.addListener("end",function(){var o=g.headers["content-type"]||"",m=o.indexOf("boundary="),A=o.substr(m+9),B=A.length,C=[0],r="\r\n\r\n",q=true,z=0,j=function(){return new Date().getTime().toString(16)+(100000+Math.random()*10000>>>0).toString(16)};if(m==-1){h&&h(require("querystring").parse(b.toString()));return}for(;z<c;z++){if(q){if(b[z]==13&&b.slice(z,z+4).toString()==r){z+=3;C.push(z+1);q=false}}else{if(b[z]==45&&b.slice(z,z+B).toString()==A){C.push(z-4);z+=B;q=true}}}z=1;var u=C.length,x={files:[]},y,D,w,p,k,t,v,n,s;for(;z<u;z+=2){y=b.slice(C[z-1],C[z]).toString();k=y.indexOf('filename="');if(k==-1){D=y.slice(y.indexOf('name="')+6,-5);typeof x[D]=="undefined"?x[D]=b.slice(C[z],C[z+1]).toString():x[D]+=","+b.slice(C[z],C[z+1]).toString()}else{t=C[z+1]-C[z];D=y.slice(y.indexOf('name="')+6,k-3);w=y.slice(k+10,y.indexOf("\r\n",k)-1);p=y.slice(y.lastIndexOf("Content-Type:")+14,-4);v=0;n=w.substr(w.indexOf("."));s=j();if(t>0){if(e.maxsize==0||t<=e.maxsize){if(e.extname=="*"||e.extname.indexOf(n.toLowerCase())!=-1){a.writeFileSync(e.savepath+s+n,b.slice(C[z],C[z+1]))}else{v=2}}else{v=1}}else{v=9}x.files.push({name:D,filename:w,mime:p,size:t,savename:v==0?s+n:"",error:v})}}h&&h(x)})};