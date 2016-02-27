"use strict";var $=ander;function ander(b,a){return(a||document).querySelector(b)}ander.ready=function(a){addEventListener("DOMContentLoaded",a,false)};function ander_init(a){a.version="1.0.0";Function.prototype.method=function(b,c){return this.prototype[b]=c,this};String.prototype.append=function(b){return this+b};Date.format=function(b){var c=new this(b);return new String(c.getFullYear()).append("-").append((c.getMonth()+101+"").substr(1)).append("-").append((c.getDate()+101+"").substr(1))};HTMLElement.method("on",function(c,b){return this.addEventListener(c,b,false),this}).method("off",function(c,b){return this.removeEventListener(c,b),this});NodeList.method("on",function(g,f){var d=g.split(" "),b,h=d.length,c=0,e=this.length;for(;c<e;c++){for(b=0;b<h;b++){this[c].on(d[b],f)}}return this});if(!this.Promise){this.Promise=function(){var g=0,b=1,d=2;function h(l,k){if(l._state!==g){return l}l._state=b;l._value=k;e(function(){c(l)});return l}function j(l,k){if(l._state!==g){return l}l._state=d;l._value=k;e(function(){c(l)});return l}function c(s){if(s._state===g){return}var l=s._subscribers,r=s._state,o=s._value,m=0,q=l.length,p,n=[],k;for(;m<q;m+=3){k=l[m];p=l[m+r];if(p){o=p(o);if(typeof o==="object"&&typeof o.then==="function"){o._subscribers=k._subscribers;k=o}else{k._value=o;k._state=b}}else{k._value=o;k._state=r}n.push(k)}l.length=0;m=0;q=n.length;for(;m<q;m++){c(n[m])}}function f(m){if(typeof m!=="function"){throw TypeError("Argument 1 of Promise.constructor is not a function")}var l=this;this._subscribers=[];if(m!==i){try{m(function(n){h(l,n)},function(n){j(l,n)})}catch(k){j(l,k)}}}f.prototype={constructor:f,_state:g,then:function(p,k){var o=this,m=o._state,n,l;if(m===b&&!p||m===d&&!k){return o}n=o._subscribers;l=new f(i);n.push(l);n.push(p);n.push(k);m&&e(function(){c(o)});return l},"catch":function(k){return this.then(null,k)}};f.resolve=function(k){return h(new this(i),k)};f.reject=function(k){return j(new this(i),k)};f.race=function(n){var m=new f(i),l=0,o=n.length,q,p=function(r){return resovle(m,r)},k=function(r){return j(m,r)};for(;l<o;l++){q=q[l];if(q._state===b){p(q._value);break}else{if(q._state===d){k(q._value);break}}q.then(p,k)}return m};f.all=function(o){var l=new f(i),n=0,q=o.length,p=q,s=[],r,m=function(t){return function(){s[t]=x;--p===0&&resovle(l,s);return l}},k=function(t){return j(l,t)};for(;n<q;n++){r=r[n];if(r._state===b){p--;s[n]=r._value}else{if(r._state===d){k(r._value);break}else{r.then(m(n),k)}}}return l};function e(k){setTimeout(k,0)}function i(){}return f}()}this.raf=this.requestAnimationFrame||this.webkitRequestAnimationFrame||this.mozRequestAnimationFrame||function(b){return setTimeout(b,16.7)};this.caf=this.cancelAnimationFrame||this.webkitCancelAnimationFrame||this.mozCancelAnimationFrame||function(b){clearTimeout(b)};a.qs=function(c,b){return(b||document).querySelectorAll(c)};a.tag=function(b){return document.createElement(b)};a.ajax=function(b){return new Promise(function(d,c){var e=new XMLHttpRequest();b.beforeSend&&b.beforeSend();e.onload=function(){d(b.dataType==="json"?JSON.parse(this.responseText):b.dataType==="xml"?this.responseXML:this.responseText)};e.onerror=function(){c(this.responseText)};e.open(b.method||"GET",b.url,true);e.setRequestHeader("X-Request-With","XMLHttpRequest");b.cache===false&&e.setRequestHeader("If-Modified-Since","0");e.send(b.data||null)})};a.template={_cache:{},parse:function(c,b){return this._cache[c]?this._cache[c](b):(this._cache[c]=new Function("list","var r='',i=0,ii=list.length,data;if(typeof ii==\"undefined\"){ii=1;list=[list];}for(;i<ii;i++){data=list[i];r+='"+ander("#"+c).innerHTML.replace(/[\r\n\t]/g," ").split("'").join("\\'").replace(/<%=(.*?)%>/g,"'+$1+'").split("<%").join("';").split("%>").join("r+='")+"';}return r;"))(b)}};a.getScript=function(c,b){var d=document.head||a("head"),e=document.createElement("script");b&&(e.onload=b);e.src=c;d.appendChild(e)};a.route={};a.route._index="data/list.js";a.route.check=function(){var c=location.hash,b;if(c){b=/#!(\w+)(#\w+)*/.exec(c);if(b){this.key=b[1];if(this.key==="index"){this.path=this._index}else{this.path=this.key.replace(/_/g,"/");this.path+=".html"}this.showID=b[2];return true}}else{this.key="index";this.path=this._index;return true}return false};a.route.get=function(c){var b=a("#main");b.innerHTML='<p class="loading"><i class="loading-icon"></i>页面加载中...</p>';if(this.key==="index"){a.ajax({url:c,dataType:"json"}).then(function(d){b.innerHTML=new String('<h2 class="main-title">最新文章</h2><ul class="article-list">').append(ander.template.parse("list_tmpl",d)).append("</ul>");a.loadedEffect(b)})}else{a.ajax({url:c}).then(function(d){b.innerHTML=d;a.loadedEffect(b);var e=a(".adr-comment",b);if(e){e.setAttribute("data-thread-key",a.route.key);e.setAttribute("data-url",location.href.replace(location.hash,"#!"+a.route.key))}typeof DUOSHUO==="object"&&DUOSHUO.init()})}};a.route.change=function(){if(this.check()){this.get(this.path)}};a.route.init=function(){if(this.check()){this.get(this.path)}window.addEventListener("hashchange",function(){a.route.check()&&a.route.change()},false)};a.createAsideList=function(d){var k=this.tag,j=k("div"),e,f,g,c=0,h=d.length,b;for(;c<h;c++){b=d[c];e=k("h3");e.innerHTML=b.title;j.appendChild(e);f=k("ol");b.list.forEach(function(i){g=k("li");g.innerHTML=new String('<a href="').append(i.url).append('">').append(i.text).append("</a>");f.appendChild(g)});j.appendChild(f)}j.className="r_cat";a("#aside").appendChild(j)};a.loadedEffect=function(b){var c=b.children[1];if(!c){return}c.classList.add("main-effect");c.offsetHeight;c.classList.remove("main-effect")};a.route.init();a.ajax({url:"data/aside_list.js",dataType:"json"}).then(function(b){a.createAsideList(b)})}ander.ready(function(){var a=0,b=ander("#toTop"),c=false;ander_init.call(window,ander);window.addEventListener("scroll",function(){clearTimeout(a);a=setTimeout(function(){b.className=window.scrollY<50?"":"show"},300)},false);b.on("click",function(){var d=window.scrollX||0,e=window.scrollY;this.className="";(function f(){e-=e*0.2;if(Math.abs(e)>1.5){scrollTo(d,e);setTimeout(f,26)}else{scrollTo(d,0)}})()});$.getScript("js/ware.js");$.getScript("js/comment.js")});