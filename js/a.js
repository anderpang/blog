function define(fn){
   console.log(fn.toString());
}

function require(path){
  var script=document.createElement("script");
  script.onload=function(){
    this.onload=null;
    document.head.removeChild(this);
  };
  script.src=path;
  document.head.appendChild(script);
}