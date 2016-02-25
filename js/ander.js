"use strict";var $=ander;function ander(b,a){return(a||document).querySelector(b)}ander.ready=function(a){addEventListener("DOMContentLoaded",a,false)};function ander_init(a){a.version="1.0.0";Function.prototype.method=function(b,c){return this.prototype[b]=c,this};String.prototype.append=function(b){return this+b};HTMLElement.method("on",function(c,b){return this.addEventListener(c,b,false),this}).method("off",function(c,b){return this.removeEventListener(c,b),this});NodeList.method("on",function(g,f){var d=g.split(" "),b,h=d.length,c=0,e=this.length;for(;c<e;c++){for(b=0;b<h;b++){this[c].on(d[b],f)}}return this});if(!this.Promise){this.Promise=function(){var g=0,b=1,d=2;function h(l,k){if(l._state!==g){return l}l._state=b;l._value=k;e(function(){c(l)});return l}function j(l,k){if(l._state!==g){return l}l._state=d;l._value=k;e(function(){c(l)});return l}function c(s){if(s._state===g){return}var l=s._subscribers,r=s._state,o=s._value,m=0,q=l.length,p,n=[],k;for(;m<q;m+=3){k=l[m];p=l[m+r];if(p){o=p(o);if(typeof o==="object"&&typeof o.then==="function"){o._subscribers=k._subscribers;k=o}else{k._value=o;k._state=b}}else{k._value=o;k._state=r}n.push(k)}l.length=0;m=0;q=n.length;for(;m<q;m++){c(n[m])}}function f(m){if(typeof m!=="function"){throw TypeError("Argument 1 of Promise.constructor is not a function")}var l=this;this._subscribers=[];if(m!==i){try{m(function(n){h(l,n)},function(n){j(l,n)})}catch(k){j(l,k)}}}f.prototype={constructor:f,_state:g,then:function(p,k){var o=this,m=o._state,n,l;if(m===b&&!p||m===d&&!k){return o}n=o._subscribers;l=new f(i);n.push(l);n.push(p);n.push(k);m&&e(function(){c(o)});return l},"catch":function(k){return this.then(null,k)}};f.resolve=function(k){return h(new this(i),k)};f.reject=function(k){return j(new this(i),k)};f.race=function(n){var m=new f(i),l=0,o=n.length,q,p=function(r){return resovle(m,r)},k=function(r){return j(m,r)};for(;l<o;l++){q=q[l];if(q._state===b){p(q._value);break}else{if(q._state===d){k(q._value);break}}q.then(p,k)}return m};f.all=function(o){var l=new f(i),n=0,q=o.length,p=q,s=[],r,m=function(t){return function(){s[t]=x;--p===0&&resovle(l,s);return l}},k=function(t){return j(l,t)};for(;n<q;n++){r=r[n];if(r._state===b){p--;s[n]=r._value}else{if(r._state===d){k(r._value);break}else{r.then(m(n),k)}}}return l};function e(k){setTimeout(k,0)}function i(){}return f}()}this.raf=this.requestAnimationFrame||this.webkitRequestAnimationFrame||this.mozRequestAnimationFrame||function(b){return setTimeout(b,16.7)};this.caf=this.cancelAnimationFrame||this.webkitCancelAnimationFrame||this.mozCancelAnimationFrame||function(b){clearTimeout(b)};a.qs=function(c,b){return(b||document).querySelectorAll(c)};a.tag=function(b){return document.createElement(b)};a.ajax=function(b){return new Promise(function(d,c){var e=new XMLHttpRequest();b.beforeSend&&b.beforeSend();e.onload=function(){d(b.dataType==="json"?JSON.parse(this.responseText):b.dataType==="xml"?this.responseXML:this.responseText)};e.onerror=function(){c(this.responseText)};e.open(b.method||"GET",b.url,true);e.setRequestHeader("X-Request-With","XMLHttpRequest");b.cache===false&&e.setRequestHeader("If-Modified-Since","0");e.send(b.data||null)})};a.getScript=function(c,b){var d=document.head||a("head"),e=document.createElement("script");b&&(e.onload=b);e.src=c;d.appendChild(e)};a.route={};a.route.check=function(){var b=location.hash;if(b){if(b.charAt(1)==="!"){this.key=b.substr(2);this.path=this.key.replace(/_/g,"/");this.path+=".html";return true}}else{this.key="index";this.path="article/list.html";return true}return false};a.route.get=function(c){var b=a("#main");b.innerHTML='<p class="loading">页面加载中...</p>';a.ajax({url:c}).then(function(d){b.innerHTML=d;a.loadedEffect(b);var e=a(".adr-comment",b);if(e){e.setAttribute("data-thread-key",a.route.key);e.setAttribute("data-url",location.href)}typeof DUOSHUO==="object"&&DUOSHUO.init()})};a.route.change=function(){if(this.check()){this.get(this.path)}};a.route.init=function(){if(this.check()){this.get(this.path)}window.addEventListener("hashchange",function(){a.route.check()&&a.route.change()},false)};a.createAsideList=function(){var c=this.tag,d=c("div"),e,f,b,g=0,h=arguments.length,j;for(;g<h;g++){j=arguments[g];e=c("h3");e.innerHTML=j.title;d.appendChild(e);f=c("ol");j.list.forEach(function(i){b=c("li");b.innerHTML=new String('<a href="').append(i.url).append('">').append(i.text).append("</a>");f.appendChild(b)});d.appendChild(f)}d.className="r_cat";a("#aside").appendChild(d)};a.loadedEffect=function(b){var c=b.children[1];if(!c){return}c.classList.add("main-effect");c.offsetHeight;c.classList.remove("main-effect")};a.route.init();a.getScript("data/aside_list.js")}ander.ready(function(){ander_init.call(window,ander);$.getScript("js/ware.js");$.getScript("js/comment.js")});