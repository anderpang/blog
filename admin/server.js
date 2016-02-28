var http=require("http"),
   fs=require("fs"),
   config=require("./package.json");

function outputFile(path,out){
    fs.createReadStream(path).pipe(out);
}

function createArticle(data){
    var id=Date.now(), filename="../article/"+id+".html",list;

    fs.writeFileSync(filename,data.content);
    
    //首页列表更新
    filename="../data/list.js";
    if(fs.existsSync(filename))
    {
        list=JSON.parse(fs.readFileSync(filename));
    }
    else
    {
        list=[];
    }
    list.unshift({
      cat:"article", //分类
      date:id,
      title:data.title,
      thumb:data.thumb,
      intro:data.intro
    });
     
    fs.writeFile(filename,JSON.stringify(list));

    //更新右边栏

    filename="../data/aside_list.js";
    if(fs.existsSync(filename))
    {
        list=JSON.parse(fs.readFileSync(filename));
    }
    else
    {
        list=[{"title":"最新文章","list":[]}];
    }

    var url="#!article_"+id,text=data.title;
    list.forEach(function(d){
        d.list.unshift({
          "url":url,
          "text":text      
         });
    });
     
    fs.writeFile(filename,JSON.stringify(list));

}

function Result(code,message){
    this.code=code;
    this.message=message;
}
function htmlResult(isPost)
{
   return '<script type="text/javascript">alert("'+(isPost?"操作成功！":"操作失败！")+'");'+(isPost?'location.href="/";':'history.back();')+'</script>';
}

http.createServer(function(request,response){
    var url=request.url;
    if(request.method === "POST")
    {
        require("./lib/node-upload")(request,function(data){
            var isPost=true;
            try
            {
                createArticle(data);                
            }
            catch(e)
            {
                console.log(e);
                isPost=false;
            }
            
            //response.end(JSON.stringify(isPost?new Result(1,"操作成功！"):new Result(0,"操作失败！")));
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"}); 
            response.end(htmlResult(isPost));

        });
        return;
    }

    switch(url)
    {
        case "/":
        case "/index.html":
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});            
            outputFile("./index.html",response);
         break;
        default:
           url=__dirname+url;
           if(fs.existsSync(url))
          {                        
             outputFile(url,response);
          }
          else
          {
              response.end();
          }
        break;
    }
}).listen(config.port,function(){
    console.log("Ander blog server running on port "+config.port);
});