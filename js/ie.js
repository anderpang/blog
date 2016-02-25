onload=function(){
  var div=document.createElement("div");
  document.getElementsByTagName("div")[0].style.display="none";
  div.innerHTML='<div style="position:absolute;left:50%;top:50%;width:300px;height:200px;margin-top:-100px;margin-left:-150px;color:#FFF;"><h2>您的浏览器版本过低，请升级！</h2><a style="color:#FFF" href="https://www.baidu.com/s?wd=chrome"><img src="images/chrome.png" alt="chrome" title="谷歌浏览器" /><br />建议使用浏览器</a></div>';
  div.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;background:#000;";
  document.body.appendChild(div);
}