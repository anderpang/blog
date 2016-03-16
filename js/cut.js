var module={};
function cut(str,blen){
  var len=str.length,i,counter;
  if(len<blen)return str;
  i=0;
  counter=i;
  while(i<len)
  {
    if(str.charCodeAt(i)<256){
      counter++;
    }
    else
    {
      if(counter>blen-2)break;
      counter+=2;
    }
    i++;
  }

  return str.substr(0,i);
}

module.export=cut;
