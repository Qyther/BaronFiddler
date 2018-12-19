function save() {
  localStorage.setItem("html",document.getElementsByClassName("html")[0].value);
  localStorage.setItem("css",document.getElementsByClassName("css")[0].value);
  localStorage.setItem("js",document.getElementsByClassName("js")[0].value);
}
function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}
function clearConsole() {
  document.getElementsByClassName("consolebar")[0].innerHTML="";
}
addEventListener("message",e=>{
  var data=e.data;
  if(data[0]==="LOG") document.getElementsByClassName("consolebar")[0].innerHTML+="<div class=consolenormal>\""+data[1]+"\"<div class=consoleline></div></div>"
  if(data[0]==="ERROR") document.getElementsByClassName("consolebar")[0].innerHTML+="<div class=consoleerror>\""+data[1]+"\"<div class=consoleline></div></div>"
  if(data[0]==="WARN") document.getElementsByClassName("consolebar")[0].innerHTML+="<div class=consolewarn>\""+data[1]+"\"<div class=consoleline></div></div>"
});
var autorun = false;
var runjs = false;
setInterval(save,100);
var switc = false;
setInterval(()=>{
  var htmlm = document.getElementsByClassName("htmlmarker");
  for(var i=0;i<htmlm.length;i++) {
    if(switc) document.getElementsByClassName("htmlmarker")[i].style.color = "red";
    else document.getElementsByClassName("htmlmarker")[i].style.color = "white";
  }
  if(switc) switc = false;
  else switc = true;
},500);
var lasthtml;
var lastcss;
var lastjs;
var htmlfocus = false;
var cssfocus = false;
var jsfocus = false;
setInterval(()=>{
  if(!lasthtml) lasthtml = document.getElementsByClassName("html")[0].value;
  if(!lastcss) lastcss = document.getElementsByClassName("css")[0].value;
  if(!lastjs) lastjs = document.getElementsByClassName("js")[0].value;
  var tmlh = document.getElementsByClassName("html")[0].value;
  var scs = document.getElementsByClassName("css")[0].value;
  var sj = document.getElementsByClassName("js")[0].value;
  if(runjs) {
    if(tmlh!==lasthtml||scs!==lastcss||sj!==lastjs) {
      document.getElementsByClassName("main")[0].contentWindow.postMessage([tmlh,scs,sj,true], "*");
      save();
      clearConsole();
    }
  }
  if(autorun) {
    if(tmlh!==lasthtml||scs!==lastcss) {
      document.getElementsByClassName("main")[0].contentWindow.postMessage([tmlh,scs,sj,false], "*");
      save();
      clearConsole();
    }
  }
  lasthtml = document.getElementsByClassName("html")[0].value;
  lastcss = document.getElementsByClassName("css")[0].value;
  lastjs = document.getElementsByClassName("js")[0].value;
},250);

function replaceKeys(a,b) {
  if(b==="HTML") {
    var htmlwords = [
      [" "," "],
      ["&SPANHTML;","span class=htmlmarker"],
      ["&OFFSETTED;","span class=offsetted"],
      ["\"","&ARROWL;span style=color:#ff9900&ARROWR;&QUOTE;","&QUOTE;&ARROWL;/span&ARROWR;","&ARROWL;/span&ARROWR;"],
      ["<","&ARROWL;span style=color:#9900a8&ARROWR;&lt;"],
      [">","&gt;&ARROWL;/span&ARROWR;&ARROWL;/span&ARROWR;"],
      ["&ARROWL;","<"],
      ["&ARROWR;",">"],
      ["\n","<br>"],
      ["&QUOTE;","\""]];
      for(var i=0;i<htmlwords.length;i++) {
      if(htmlwords[i][2]!==(null||undefined)&&a.indexOf(htmlwords[i][0])>=0) {
        var am = a.match(new RegExp(htmlwords[i][0],"gi")).length;
        for(var j=0;j<am;j+=2) {
          var as = a.indexOf(htmlwords[i][0]);
          a=a.replace(htmlwords[i][0],htmlwords[i][1]);
          var sa = a.indexOf(htmlwords[i][0]);
          if(a.slice(as,sa).indexOf("&ARROWL;span class=htmlmarker&ARROWR;|&ARROWL;")>=0)
          a=a.replace(htmlwords[i][0],htmlwords[i][2]+htmlwords[i][3]);
        else a=a.replace(htmlwords[i][0],htmlwords[i][2]);
        }
      } else
      a=a.replace(new RegExp(htmlwords[i][0],"gi"),htmlwords[i][1]);
      }
    return a;
  }
  if(b==="CSS") {
    var csswords = [
      [" "," "],
      ["&SPANCSS;","span class=cssmarker"],
      ["&OFFSETTED;","span class=offsetted"],
      ["{","&ARROWL;span style=color:#ef4fff&ARROWR;{&ARROWL;/span&ARROWR;&ARROWL;span style=color:#dcccff&ARROWR;"],
      ["}","&ARROWL;span style=color:#ef4fff&ARROWR;}&ARROWL;/span&ARROWR;&ARROWL;/span&ARROWR;"],
      ["<","&lt;"],
      [">","&gt;"],
      ["&ARROWL;","<"],
      ["&ARROWR;",">"],
      ["\n","<br>"]];
      for(var i=0;i<csswords.length;i++) {
      if(csswords[i][2]!==(null||undefined)&&a.indexOf(csswords[i][0])>=0) {
        var am = a.match(new RegExp(csswords[i][0],"gi")).length;
        for(var j=0;j<am;j+=2) {
          var as = a.indexOf(csswords[i][0]);
          a=a.replace(csswords[i][0],csswords[i][1]);
          var sa = a.indexOf(csswords[i][0]);
          if(a.slice(as,sa).indexOf("&ARROWL;span class=htmlmarker&ARROWR;|&ARROWL;")>=0)
          a=a.replace(csswords[i][0],csswords[i][2]+csswords[i][3]);
        else a=a.replace(csswords[i][0],csswords[i][2]);
        }
      } else
      a=a.replace(new RegExp(csswords[i][0],"gi"),csswords[i][1]);
      }
    return a;
  }
  if(b==="JS") {
    var jswords = [
      [" "," "],
      ["&SPANJS;","span class=jsmarker"],
      ["&OFFSETTED;","span class=offsetted"],
      ["\"","&ARROWL;span style=color:#52d800&ARROWR;&QUOTE;","&QUOTE;&ARROWL;/span&ARROWR;","&ARROWL;/span&ARROWR;"],
      ["var","&ARROWL;span style=color:#AA0D91&ARROWR;var&ARROWL;/span&ARROWR;"],
      ["new","&ARROWL;span style=color:#AA0D91&ARROWR;new&ARROWL;/span&ARROWR;"],
      ["function","&ARROWL;span style=color:#AA0D91&ARROWR;function&ARROWL;/span&ARROWR;"],
      ["<","&lt;"],
      [">","&gt;"],
      ["&ARROWL;","<"],
      ["&ARROWR;",">"],
      ["\n","<br>"],
      ["&QUOTE;","\""]];
      for(var i=0;i<jswords.length;i++) {
      if(jswords[i][2]!==(null||undefined)&&a.indexOf(jswords[i][0])>=0) {
        var am = a.match(new RegExp(jswords[i][0],"gi")).length;
        for(var j=0;j<am;j+=2) {
          var as = a.indexOf(jswords[i][0]);
          a=a.replace(jswords[i][0],jswords[i][1]);
          var sa = a.indexOf(jswords[i][0]);
          if(a.slice(as,sa).indexOf("&ARROWL;span class=jsmarker&ARROWR;|&ARROWL;")>=0)
          a=a.replace(jswords[i][0],jswords[i][2]+jswords[i][3]);
        else a=a.replace(jswords[i][0],jswords[i][2]);
        }
      } else
      a=a.replace(new RegExp(jswords[i][0],"gi"),jswords[i][1]);
      }
    return a;
  }
}
var fullscreen = false;
var change = true;
var savep = [];
setInterval(()=>{
  
  document.getElementsByClassName("htmlt")[0].scrollTop+=(document.getElementsByClassName("html")[0].scrollTop+document.getElementsByClassName("htmlt")[0].scrollTop);
  document.getElementsByClassName("csst")[0].scrollTop+=(document.getElementsByClassName("css")[0].scrollTop+document.getElementsByClassName("csst")[0].scrollTop);
  document.getElementsByClassName("jst")[0].scrollTop+=(document.getElementsByClassName("js")[0].scrollTop-document.getElementsByClassName("jst")[0].scrollTop);
});
setInterval(()=>{
  var off = -14;
  document.getElementsByClassName("autoruncheck")[0].innerHTML = "Automatically run HTML and CSS ("+(autorun.toString().slice(0,1).toUpperCase()+autorun.toString().slice(1))+")";
  document.getElementsByClassName("autoruncheckjs")[0].innerHTML = "Automatically run HTML, CSS and JS ("+(runjs.toString().slice(0,1).toUpperCase()+runjs.toString().slice(1))+")";
  document.getElementsByClassName("htmlt")[0].style.width = document.getElementsByClassName("resizehtml")[0].offsetLeft-10+"px";
  document.getElementsByClassName("csst")[0].style.width = (document.getElementsByClassName("resizecss")[0].offsetLeft-10-document.getElementsByClassName("resizehtml")[0].offsetLeft)+"px";
  document.getElementsByClassName("jst")[0].style.width = (document.getElementsByClassName("resizejs")[0].offsetLeft-10-document.getElementsByClassName("resizecss")[0].offsetLeft)+"px";
  document.getElementsByClassName("html")[0].style.width = document.getElementsByClassName("htmlt")[0].clientWidth-off+"px";
  document.getElementsByClassName("css")[0].style.width = document.getElementsByClassName("csst")[0].clientWidth-off+"px";
  document.getElementsByClassName("js")[0].style.width = document.getElementsByClassName("jst")[0].clientWidth-off+"px";
  document.getElementsByClassName("main")[0].style.width = (innerWidth-document.getElementsByClassName("resizejs")[0].offsetLeft)-10+"px";
  document.getElementsByClassName("csst")[0].style.left = document.getElementsByClassName("resizehtml")[0].offsetLeft+"px";
  document.getElementsByClassName("jst")[0].style.left = document.getElementsByClassName("resizecss")[0].offsetLeft+"px";
  document.getElementsByClassName("css")[0].style.left = document.getElementsByClassName("csst")[0].offsetLeft+"px";
  document.getElementsByClassName("js")[0].style.left = document.getElementsByClassName("jst")[0].offsetLeft+"px";
  document.getElementsByClassName("main")[0].style.left = document.getElementsByClassName("resizejs")[0].offsetLeft+"px";
  if(fullscreen) {
    savep[0]=document.getElementsByClassName("main")[0].offsetLeft;
    savep[1]=document.getElementsByClassName("main")[0].clientWidth;
    document.getElementsByClassName("main")[0].style.left="-4px";
    document.getElementsByClassName("main")[0].style.width=innerWidth+"px";
    change = false;
  } else if(!change) {
    change=true;
    document.getElementsByClassName("main")[0].style.left=savep[0]+"px";
    document.getElementsByClassName("main")[0].style.width=savep[1]+"px";
  }


  var thtml = document.getElementsByClassName("html")[0];
  var startPosition = thtml.selectionStart;
  var endPosition = thtml.selectionEnd;
  if(startPosition===endPosition&&htmlfocus) {
  var recds = thtml.value.slice(startPosition).indexOf("\n");
  if(recds<0) recds=thtml.value.length;
  var recsd = getPosition(thtml.value.slice(startPosition),"\n",1);
  if(recsd<0) recsd=thtml.value.length;
  document.getElementsByClassName("htmlt")[0].innerHTML = 
  replaceKeys("&ARROWL;span&ARROWR;"+
  thtml.value.slice(0,startPosition)+
  "&ARROWL;&SPANHTML;&ARROWR;|&ARROWL;/span&ARROWR;&ARROWL;&OFFSETTED;&ARROWR;"+
  thtml.value.slice(startPosition,recds+startPosition)+
  "&ARROWL;/span&ARROWR;\n"+
  thtml.value.slice(recsd+startPosition+1),"HTML");
  } else if(htmlfocus) {
    document.getElementsByClassName("htmlt")[0].innerHTML =
    ("&ARROWL;span&ARROWR;"+
    thtml.value.slice(0,startPosition)+
    "&ARROWL;aspn class=selected&ARROWR;"+thtml.value.slice(startPosition,endPosition)+"&ARROWL;/span;&ARROWR;&ARROWL;/span&ARROWR;&ARROWL;span&ARROWR;"+
    thtml.value.slice(endPosition,thtml.value.length)+"&ARROWL;/span&ARROWR;").replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\n/gi,"<br>").replace(/&ARROWL;/gi,"<").replace(/&ARROWR;/gi,">");
  } else
    document.getElementsByClassName("htmlt")[0].innerHTML = replaceKeys(thtml.value,"HTML");
  var tcss = document.getElementsByClassName("css")[0];
  var startPosition = tcss.selectionStart;
  var endPosition = tcss.selectionEnd;
  if(startPosition===endPosition&&cssfocus) {
  var recds = tcss.value.slice(startPosition).indexOf("\n");
  if(recds<0) recds=tcss.value.length;
  var recsd = getPosition(tcss.value.slice(startPosition),"\n",1);
  if(recsd<0) recsd=tcss.value.length;
  document.getElementsByClassName("csst")[0].innerHTML = 
  replaceKeys("&ARROWL;span&ARROWR;"+
  tcss.value.slice(0,startPosition)+
  "&ARROWL;&SPANCSS;&ARROWR;|&ARROWL;/span&ARROWR;&ARROWL;&OFFSETTED;&ARROWR;"+
  tcss.value.slice(startPosition,recds+startPosition)+
  "&ARROWL;/span&ARROWR;\n"+
  tcss.value.slice(recsd+startPosition+1),"CSS");
  } else if(cssfocus) {
    document.getElementsByClassName("csst")[0].innerHTML =
    ("&ARROWL;span&ARROWR;"+
    tcss.value.slice(0,startPosition)+
    "&ARROWL;span class=selected&ARROWR;"+tcss.value.slice(startPosition,endPosition)+"&ARROWL;/span;&ARROWR;&ARROWL;/span&ARROWR;&ARROWL;span&ARROWR;"+
    tcss.value.slice(endPosition,tcss.value.length)+"&ARROWL;/span&ARROWR;").replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\n/gi,"<br>").replace(/&ARROWL;/gi,"<").replace(/&ARROWR;/gi,">");
  } else
    document.getElementsByClassName("csst")[0].innerHTML = replaceKeys("&ARROWL;span&ARROWR;"+tcss.value+"&ARROWL;/span&ARROWR;","CSS");
  var tjs = document.getElementsByClassName("js")[0];
  var startPosition = tjs.selectionStart;
  var endPosition = tjs.selectionEnd;
  if(startPosition===endPosition&&jsfocus) {
  var recds = tjs.value.slice(startPosition).indexOf("\n");
  if(recds<0) recds=tjs.value.length;
  var recsd = getPosition(tjs.value.slice(startPosition),"\n",1);
  if(recsd<0) recsd=tjs.value.length;
  document.getElementsByClassName("jst")[0].innerHTML = 
  replaceKeys("&ARROWL;span&ARROWR;"+
  tjs.value.slice(0,startPosition)+
  "&ARROWL;&SPANJS;&ARROWR;|&ARROWL;/span&ARROWR;&ARROWL;&OFFSETTED;&ARROWR;"+
  tjs.value.slice(startPosition,recds+startPosition)+
  "&ARROWL;/span&ARROWR;\n"+
  tjs.value.slice(recsd+startPosition+1),"JS");
} else if(jsfocus) {
    document.getElementsByClassName("jst")[0].innerHTML =
    ("&ARROWL;span&ARROWR;"+
    tjs.value.slice(0,startPosition)+
    "&ARROWL;span class=selected&ARROWR;"+tjs.value.slice(startPosition,endPosition)+"&ARROWL;/span;&ARROWR;&ARROWL;/span&ARROWR;&ARROWL;span&ARROWR;"+
    tjs.value.slice(endPosition,tjs.value.length)+"&ARROWL;/span&ARROWR;").replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\n/gi,"<br>").replace(/&ARROWL;/gi,"<").replace(/&ARROWR;/gi,">");
  } else
   document.getElementsByClassName("jst")[0].innerHTML = replaceKeys(tjs.value,"JS");
});
(()=>{
  setTimeout(()=>{
    if(localStorage.getItem("autorun")!==(null||undefined)) autorun = localStorage.getItem("autorun");
    if(localStorage.getItem("runjs")!==(null||undefined)) runjs = localStorage.getItem("runjs");
    var mode = 0;
    var rhtml = document.getElementsByClassName("resizehtml")[0];
    var html = document.getElementsByClassName("html")[0];
    var rcss = document.getElementsByClassName("resizecss")[0];
    var css = document.getElementsByClassName("css")[0];
    var rjs = document.getElementsByClassName("resizejs")[0];
    var js = document.getElementsByClassName("js")[0];
    var main = document.getElementsByClassName("main")[0];
    var runw = document.getElementsByClassName("runw")[0];
    var runwo = document.getElementsByClassName("runwo")[0];
    var clear = document.getElementsByClassName("clear")[0];
    var settings = document.getElementsByClassName("settings")[0];
    var htmlt = document.getElementsByClassName("htmlt")[0];
    var csst = document.getElementsByClassName("csst")[0];
    var jst = document.getElementsByClassName("jst")[0];
    var autorunhc = document.getElementsByClassName("autorun")[0];
    var autorunhcj = document.getElementsByClassName("autorunjs")[0];
    var cross = document.getElementsByClassName("cross")[0];
    var maximize = document.getElementsByClassName("maximize")[0];
    var minimize = document.getElementsByClassName("minimize")[0];
    var show = document.getElementsByClassName("show")[0];
    var hide = document.getElementsByClassName("hide")[0];
    var consolebar = document.getElementsByClassName("consolebar")[0];
    html.addEventListener("keydown",e=>{
      if(e.key==="Tab") {
        e.preventDefault();
        var s = html.selectionStart+0;
        var odin = html.value.slice(0,s);
        var dva = html.value.slice(s);
        var res = odin+"  "+dva;
        html.value = res;
        html.selectionStart = s+2;
        html.selectionEnd = s+2;
      }
    });
    css.addEventListener("keydown",e=>{
      if(e.key==="Tab") {
        e.preventDefault();
        var s = css.selectionStart+0;
        var odin = css.value.slice(0,s);
        var dva = css.value.slice(s);
        var res = odin+"  "+dva;
        css.value = res;
        css.selectionStart = s+2;
        css.selectionEnd = s+2;
      }
    });
    js.addEventListener("keydown",e=>{
      if(e.key==="Tab") {
        e.preventDefault();
        var s = js.selectionStart+0;
        var odin = js.value.slice(0,s);
        var dva = js.value.slice(s);
        var res = odin+"  "+dva;
        js.value = res;
        js.selectionStart = s+2;
        js.selectionEnd = s+2;
      }
      if(e.key==="(") {
        e.preventDefault();
        var s = js.selectionStart+0;
        var odin = js.value.slice(0,s);
        var dva = js.value.slice(s);
        var res = odin+"()"+dva;
        js.value = res;
        js.selectionStart = s+1;
        js.selectionEnd = s+1;
      }
      if(e.key==="{") {
        e.preventDefault();
        var s = js.selectionStart+0;
        var odin = js.value.slice(0,s);
        var dva = js.value.slice(s);
        var res = odin+"{}"+dva;
        js.value = res;
        js.selectionStart = s+1;
        js.selectionEnd = s+1;
      }
    });
    show.addEventListener("mousedown",()=>{
      consolebar.style.display = "block";
      show.style.display="none";
      hide.style.display="block";
    });
    hide.addEventListener("mousedown",()=>{
      consolebar.style.display = "none";
      show.style.display="block";
      hide.style.display="none";
    });
    maximize.addEventListener("mousedown",()=>{
      fullscreen=true;
      minimize.style.display="block";
      maximize.style.display="none";
    });
    minimize.addEventListener("mousedown",()=>{
      fullscreen=false;
      minimize.style.display="none";
      maximize.style.display="block";
    });
    html.addEventListener("focus",()=>{
      htmlfocus = true;
    });
    html.addEventListener("blur",()=>{
      htmlfocus = false;
    });
    css.addEventListener("focus",()=>{
      cssfocus = true;
    });
    css.addEventListener("blur",()=>{
      cssfocus = false;
    });
    js.addEventListener("focus",()=>{
      jsfocus = true;
    });
    js.addEventListener("blur",()=>{
      jsfocus = false;
    });
    cross.addEventListener("mousedown",()=>{
      document.getElementsByClassName("settingsclass")[0].style.display = "none";
    });
    settings.addEventListener("mousedown",()=>{
      document.getElementsByClassName("settingsclass")[0].style.display = "block";
    })
    autorunhc.addEventListener("mousedown",()=>{
      if(autorun) autorun = false;
      else autorun = true;
      runjs = false;
      localStorage.setItem("autorun",autorun);
      localStorage.setItem("runjs",runjs);
    });
    autorunhcj.addEventListener("mousedown",()=>{
      if(runjs) runjs = false;
      else runjs = true;
      autorun = false;
      localStorage.setItem("autorun",autorun);
      localStorage.setItem("runjs",runjs);
    });
    html.value = `<!DOCTYPE html>
<html>
<head></head>
<body>
</body>
</html>`;
    css.value = `body {

}`;
    if(localStorage.getItem("html")) html.value = localStorage.getItem("html");
    if(localStorage.getItem("css")) css.value = localStorage.getItem("css");
    if(localStorage.getItem("js")) js.value = localStorage.getItem("js");
    runw.addEventListener("mousedown",()=>{
      main.contentWindow.postMessage([html.value,css.value,js.value,true], "*");
      save();
      clearConsole();
    });
    runwo.addEventListener("mousedown",()=>{
      main.contentWindow.postMessage([html.value,css.value,js.value,false], "*");
      save();
      clearConsole();
    });
    clear.addEventListener("mousedown",()=>{
        var confirmation = confirm("Are you sure that you want to reset all saves and end up back to normal?");
        if(confirmation) {
        html.value = `<!DOCTYPE html>
<html>
<head></head>
<body>
</body>
</html>`;
      css.value = `body {

}`;
      js.value="";
      save();
      localStorage.removeItem("HTML");
      localStorage.removeItem("CSS");
      localStorage.removeItem("JS");
    }
    });
    document.addEventListener("mousedown",e=>{
      if(e.clientX>rhtml.offsetLeft&&e.clientX<rhtml.offsetLeft+rhtml.clientWidth) mode=1;
      if(e.clientX>rcss.offsetLeft&&e.clientX<rcss.offsetLeft+rcss.clientWidth) mode=2;
      if(e.clientX>rjs.offsetLeft&&e.clientX<rjs.offsetLeft+rjs.clientWidth) mode=3;
    });
    document.addEventListener("mousemove",e=>{
      if(mode===1) {
        if(rhtml.offsetLeft+e.movementX>innerWidth/8&&rhtml.offsetLeft+e.movementX<innerWidth/4+innerWidth/8) {
        rhtml.style.left = rhtml.offsetLeft+e.movementX+"px";
      }
      }
      if(mode===2) {
        if(rcss.offsetLeft+e.movementX>innerWidth/4+innerWidth/8&&rcss.offsetLeft+e.movementX<innerWidth/2+innerWidth/8) {
        rcss.style.left = rcss.offsetLeft+e.movementX+"px";
      }
      }
      if(mode===3) {
        if(rjs.offsetLeft+e.movementX>innerWidth/2+innerWidth/8&&rjs.offsetLeft+e.movementX<innerWidth-innerWidth/8) {
        rjs.style.left = rjs.offsetLeft+e.movementX+"px";
      }
      }
    });
    document.addEventListener("mouseup",()=>mode=0);
  });
})();