"use strict";
(function(){
   var protocol=location.protocol,
       config={
         isLocal:protocol!=="http:"&&protocol!=="https:"
       },
       cache={},
       doc=document,
       _loader=config.isLocal?getScript:ajax;

   function require(path,callback){
      switch(typeof path){
        case "string": 
          getModule(path,callback);
        break;
        case "object":
           setConfig(path);
        break;
        default:
          callback&&callback(path);
      }     
   }

   function tg(d){return doc.createElement(d)}

   function setConfig(opts){
     if(opts.hasOwnProperty("isLocal"))
     {
         _loader=opts.isLocal?getScript:ajax;
     }
   }

   function Module(callback){
     this.complete=false; 
     this.callbacks=callback?[callback]:[];
   }

   function getModule(path,callback){
      var a=tg("a"),module
      a.href=path;
      path=a.href;
      a=null;
      module=cache[path];
      module?(module.complete?callback&&callback(module.export):callback&&module.callbacks.push(callback)):_loader(path,callback);
   }

   function complete(module,code){
      module.export=new Function('"use strict";var module={};'+code+';return module.export')();        
      module.complete=true;
      module.callbacks.forEach(function(callback){
        callback(module.export);
      });
      module.callbacks.length=0;
   }

   function ajax(path,callback){
      var xhr=new XMLHttpRequest(),module=new Module(callback);
      cache[path]=module;
      xhr.onload=function(){
        complete(module,this.responseText);
      };
      xhr.onerror=function(){
        throw new Error(path+" 加载失!");
      };
      xhr.open("GET",path,true);     
      xhr.send(null);
   }

   function getScript(path,callback){
     var fr=new FileReader(),module=new Module(callback);
      cache[path]=module;
      fr.onload=function(){
        complete(module,this.result);
      };
      fr.readAsText(path);      
   }

   this.require=require;

}).call(this);
