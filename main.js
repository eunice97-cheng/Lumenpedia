var LastVisible = new Array;
var Timer = false;
var MapShown = {zoom:1,x:512,y:384,id:-1};
var ResizeStats = new Array;
var MoveStats = new Array;

function HiddenDisplay(type,id) {
	if(!LastVisible[type]) LastVisible[type] = 'main';
	if ($(type+'_'+LastVisible[type]))
		$(type+'_'+LastVisible[type]).style.display = "none";
	if ($(type+'_'+id)) {
		switch($(type+'_'+id).tagName) {
			case "TABLE":
                if (isIE())
					$(type+'_'+id).style.display = "block";
				 else
					$(type+'_'+id).style.display = "table";
			break;
			case "DIV":
			default:
				$(type+'_'+id).style.display = "block";
			break;
		}
		LastVisible[type] = id;
	}
	return false;
}

function ShowHint(text,e) {
	if(typeof(ShowHint.arguments[2])=='undefined') {
		e = (!e) ? window.event : e;
	}
	var xpos = e.clientX +((document.documentElement.scrollLeft!=0) ? document.documentElement.scrollLeft : document.body.scrollLeft);
	var ypos = e.clientY + ((document.documentElement.scrollTop!=0) ? document.documentElement.scrollTop : document.body.scrollTop);
	var div = $("xy");
	if(!div) return false;
	div.style.top = ypos+"px";
	var el = $("xyt");
	if(ShowHint.arguments[2]==1) {
		div.style.left = xpos+"px";
		el.style.width = e.width+"px";
		el.style.height = e.height+"px";
	} else {
		div.style.left = xpos+13+"px";
		el.style.width = "auto";
		el.style.height = "auto";
	}
	el.innerHTML = text;
	div.style.display='block';
}

function ShowMessageTimeout(text,time) {
	ShowMessage(text);
	time = parseInt(time);
	if(time==0 || typeof(time)=='undefined') time = 500;
	Timer=setTimeout(HideHint,time);
}

function ShowMessage(text){
	var w = 300,h = 100,top=150;
	if(typeof arguments[1]!='undefined') {
		w = (typeof arguments[1]["w"]!='undefined')?arguments[1]["w"]:w;
		h = (typeof arguments[1]["h"]!='undefined')?arguments[1]["h"]:h;
		top = (typeof arguments[1]["top"]!='undefined')?arguments[1]["top"]:top;
	}
	ShowHint(text,{clientX:(document.body.clientWidth/2-w/2),clientY:top,width:w,height:h},1);
	clearTimeout(Timer);
	Timer = -1;
	addEventListener($("xyt"),"mouseover",function(){addEventListener($("xyt"),"mouseout",TimeOutHide)});
}
function HideHint(){if(Timer==null) return false;var div=$("xy");if(!div)return false;div.style.display='none';removeEventListener(div,"mouseover",LastHint);removeEventListener($("xyt"),"mouseout",TimeOutHide);}
function LastHint(){if(Timer!=null)clearTimeout(Timer);$("xy").style.display="block";}
function TimeOutHide(){if(Timer<0){Timer=0;return false;};Timer=setTimeout(HideHint,500);}
function addEventListener(el,event,func){try{el.addEventListener(event,func,false);}catch(e){try{el.detachEvent('on'+event,func);el.attachEvent('on'+event,func);}catch(e){el['on'+event]=func;}}}
function removeEventListener(el,event,func){try{el.removeEventListener(event,func,false);}catch(e){try{el.detachEvent('on'+event,func);}catch(e){el['on'+event]=null;}}}

var MapsData = {
    shownMapData:{},
    maps:{},
    shownMap:0,
    zoom:1,
    x:512,y:384,
    init:function(maps,coords,lang) {
        this.coords = coords;
        this.lang = lang;
        this.createData(maps);
    },
    createData:function(maps) {
        if (typeof(maps)=='undefined') return false;
        for(var i in this.coords) {
            var size = this.coords[i].length;
            for(var j=0;j<size;j++) {
                this.coords[i][j]["type"] = (this.coords[i][j].t==0)?"mob":(this.coords[i][j].t==1)?"npc":"mine";
            }
        }
        var map=document.createElement("div");
        map.className = "mapTabs";
        var ul = document.createElement("ul");
        ul.className = "tabs";
        var li;
        for(var i=0;i<maps.length;i++)  {
            li = document.createElement("li");
            this.maps[maps[i].id] = {name:maps[i].name,x:maps[i].x,z:maps[i].z,file:maps[i].map,ox:0,oz:-6,px:770,pz:560};
            li.innerHTML = this.createMapTabElement(maps[i],i,0);
            ul.appendChild(li);
        }
        map.appendChild(ul);
        var MapDiv = $("map");
        MapDiv.appendChild(map);
        map = document.createElement("div");
            map.id = "wcoord";
            map.className = "mapCoords";
        MapDiv.appendChild(map);
        
        map = document.createElement("div");
            map.id = "wmap";
            map.className = "mapContainer";
        MapDiv.appendChild(map);

        MapDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0].onclick();
    },
    createMapTabElement:function(data,x,selectedEl){
        return "<"+"a onClick=\"MapsData.setMap(this,"+x+",'"+data.id+"');\"><div>"+data.name+"</div><b>"+data.name+"</b></a>";
    },
    setMap:function(el,x,map_id) {
        if(map_id==this.shownMap) return false;
        var ul = el.parentNode.parentNode;
        for(var i=0;i<ul.childNodes.length;i++){
            if(i!=x)
                ul.childNodes[i].childNodes[0].className="";
            else 
                ul.childNodes[i].childNodes[0].className="selected";
        }
        switch(this.zoom) {
            case 1:this.x=512;this.y=384;break;
            case 2:this.x=1024;this.y=768;setStyles($("map"),{width:this.x+"px"});break;
        }
        if(map_id==21 || map_id==321) {
            this.y *= 2;
        }
        this.showMap(map_id);
        return false;
    },
    showMap:function(map_id) {
        if(x()!=2) return false;
        if(!$("wmap")) return false;
        this.shownMap = map_id;
        var mapzoom = true;
        /*
        if(MapShown.maps[map_id].map_x==MapShown.maps[map_id].map_z && MapShown.maps[map_id].map_x==512) {
            mapzoom = false;
            MapShown.x=MapShown.maps[map_id].map_x;
            MapShown.y=MapShown.maps[map_id].map_z;
            MapShown.zoom = 1;
        } else if (MapShown.maps[map_id].map_x==MapShown.maps[map_id].map_z) {
            MapShown.y=MapShown.x;
        }
        */
        var map_name = this.maps[map_id].file;
        //map_name = map_name.replace(/_1/,"");
        //if(map_name=='b31' || map_name=='b32' || map_name=='b33' || map_name=='b34' || map_name=='b35') map_name='b30';
        //var lang = (map_id=="a31_1" || map_id=="a01_1" || map_id=="a331" || map_id=="a33" || map_id=="a32")?"":"/"+this.lang.lang;
        lang = "/"+this.lang.lang;
        if(mapzoom && this.zoom==1) map_name +="_1";
        var map = $("wmap");
        map.innerHTML = "<img"+ " src='/images/maps"+lang+"/"+map_name+".jpg' width='"+this.x+"' height='"+this.y+"' id='imgmap' "+(mapzoom==true?"onClick='MapsData.zoomMap();'":"")+" />";
        //if(mapzoom) addEventListener($("imgmap"),"click",ZoomMap);
        this.setCoordinats(map_id);
        return false;
    },
    zoomMap:function(){
        with(MapsData) {
            zoom++;
            switch(zoom) {
                case 2:x=1024;y=768;setStyles($("map"),{width:x+"px"});break;
                case 3:x=512;y=384;zoom=1;break;
            }
            setStyles($("imgmap"),{width:x+"px",height:y+"px"});
        }
        MapsData.showMap(MapsData.shownMap);
    },
    setCoordinats:function(map_id) {
        var id = map_id;
        //if(id.indexOf("a31_1")!=-1 || id.indexOf("a01_1")!=-1) {id = id.replace(/_1/,"");};
        var coord = this.coords[id];
        if (!coord || !coord[0]) return false;
        var map = $("wmap");
        this.lastHigh = "";
        var text = "";
        if(coord.length>50) {
            var j = 0;
            for(var i=0;i<coord.length;i++) {
                if (i<30)
                    text += this.addTextCoordinat(text,map_id,i,coord[i]);
                this.addPointToMap(map,map_id,i,coord[i]);
            }
        } else {
            for(var i=0;i<coord.length;i++) {
                text += this.addTextCoordinat(text,map_id,i,coord[i]);
                this.addPointToMap(map,map_id,i,coord[i]);
            }
        }
        var c = $("wcoord");
        c.innerHTML = "";
        if(text!="") c.innerHTML = text;    
    },
    addPointToMap:function(map,map_id,i,coord) {
        var k = 0;
        //if(MapShown.maps[map_id].r!=0) k = MapShown.maps[map_id].r; rotate
        //var xm =  Math.abs(Math.round((coord.x+MapShown.maps[map_id].ox)*MapShown.maps[map_id].px/1000)-1024);
        var xm =  512 + Math.round((coord.x+this.maps[map_id].ox)*this.maps[map_id].px/1024);
        //if(map_id=="world") xm += 234;
        //var ym = Math.abs(Math.round((coord.z+MapShown.maps[map_id].oz)*MapShown.maps[map_id].py/1000)-768);
        var ym =  384 - Math.round((coord.z+this.maps[map_id].oz)*this.maps[map_id].pz/748);
        if(this.zoom==1){xm=xm/2;ym=ym/2;}
        var div = document.createElement("div");
        switch(coord.t) {
            case 'N':div.className = "wmapMob";break;
            case 'Y':div.className = "wmapnpc";break;
            case 'R':div.className = "wmapres";break;
            default:div.className = "wmapMob";break;
        }
        div.id="mob_"+map_id+"_"+i;
        div.style.left=xm-4+"px";
        div.style.top=ym-4+"px";
        div.onmouseover = function(e) {
            e =(!e)?window.event:e;
            MapsData.highlightPoint(map_id+'_'+i,2);
            Hint.show("C: "+coord.x+" "+coord.z,e);
        };
        div.onmouseout = function() {MapsData.highlightPoint(map_id+'_'+i,1);Hint.hide();};
        div.onclick = function() {window.open("http://"+window.location.hostname+"/"+this.lang.lang+"/"+coord.type+"/"+coord.el)};
        map.appendChild(div);
    },
    addTextCoordinat:function(text,map_id,i,coord) {
        return "<a"+" id='c_"+map_id+"_"+i+"' onMouseOver=\"MapsData.highlightPoint('"+map_id+"_"+i+"',2);\" "+
            "onMouseOut=\"MapsData.highlightPoint('"+map_id+"_"+i+"',1);\">"+coord.x+" "+coord.z+";</a> ";        
    },
    highlightPoint:function(id,cl){
        var el = $("mob_"+id);
        var a = $("c_"+id);
        if(cl==2) {
            el.className += "Sel";
            el.style.top = parseInt(el.style.top)-2+"px";
            el.style.left =parseInt(el.style.left)-2+"px";
            if(a) a.className = "Hover";
        } else {
            el.className = el.className.substr(0,el.className.length-3);
            el.style.top = parseInt(el.style.top)+2+"px";
            el.style.left =parseInt(el.style.left)+2+"px";
            if (a) a.className = "";
        }        
    }
}
/*
function AddPointToMap(map,map_id,i,coord) {
    var k = 0;
    if(MapShown.maps[map_id].r!=0) k = MapShown.maps[map_id].r;
    var xm =  Math.abs(Math.round((coord.x+MapShown.maps[map_id].ox)*MapShown.maps[map_id].px/1000)-1024);
    if(map_id=="world") xm += 234;
    var ym = Math.abs(Math.round((coord.z+MapShown.maps[map_id].oz)*MapShown.maps[map_id].py/1000)-768);
    if(MapShown.zoom==1){xm=xm/2;ym=ym/2;}
    var div = document.createElement("div");
    switch(coord.t) {
        case 0:div.className = "wmapMob";break;
        case 1:div.className = "wmapnpc";break;
        case 3:div.className = "wmapres";break;
        default:div.className = "wmapMob";break;
    }
    div.id="mob_"+map_id+"_"+i;
    if(k==2) {
        div.style.left=ym-4+"px";
        div.style.top=xm-4+"px";
    } else {
        div.style.left=xm-4+"px";
        div.style.top=ym-4+"px";
    }
    div.onmouseover = function(e) {
        e =(!e)?window.event:e;
        HighlightPoint(map_id+'_'+i,2);
//        ShowHint("C:"+coord.xr+" "+coord.zr+" ("+coord.y+")"+" ID:"+coord.el+" Name:"+(Elmobs[coord.el]?Elmobs[coord.el].name:Elmes[coord.el].name),e);
        ShowHint("C:"+coord.xr+" "+coord.zr+" ("+coord.y+")",e);
    };
    div.onmouseout = function() {HighlightPoint(map_id+'_'+i,1);HideHint();};
    div.onclick = function() {window.open("http://"+window.location.hostname+"/ru/"+coord.type+"/"+coord.el)};
    map.appendChild(div);
}

function HighlightPoint(id,cl) {
    var el = $("mob_"+id);
    var a = $("c_"+id);
    if(cl==2) {
        el.className += "Sel";
        el.style.top = parseInt(el.style.top)-2+"px";
        el.style.left =parseInt(el.style.left)-2+"px";
        if(a) a.className = "Hover";
    } else {
        el.className = el.className.substr(0,el.className.length-3);
        el.style.top = parseInt(el.style.top)+2+"px";
        el.style.left =parseInt(el.style.left)+2+"px";
        if (a) a.className = "";
    }
}

function AddCoordinatLocation(text,map_id,i,coord) {
    return "<a"+" id='c_"+map_id+"_"+i+"' onMouseOver='HighlightPoint(\""+map_id+"_"+i+"\",2);' onMouseOut=\"HighlightPoint('"+map_id+"_"+i+"',1);\">"+coord.xr+" "+coord.zr+"("+coord.y+");</a> ";
}
function AddCoordinatLocationLite(text,map_id,i,coord) {
    return coord.xr+" "+coord.zr+"("+coord.y+"); ";
}


function SetCoordinats(map_id) {
    var id = map_id;
    if(id.indexOf("a31_1")!=-1 || id.indexOf("a01_1")!=-1) {id = id.replace(/_1/,"");};
    var coord = MapCoordinats[id];
    if (!coord || !coord[0]) return false;
    var map = $("wmap");
    var c = $("wcoord");
    c.innerHTML = "";
    MapShown.lastHigh = "";
    var text = "";
    if(coord.length>50) {
        var j = 0;
        for(var i=0;i<coord.length;i++) {
            if (i<30)
                text += AddCoordinatLocation(text,map_id,i,coord[i]);
                AddPointToMap(map,map_id,i,coord[i]);
        }
    } else {
        for(var i=0;i<coord.length;i++) {
            text += AddCoordinatLocation(text,map_id,i,coord[i]);
            AddPointToMap(map,map_id,i,coord[i]);
        }
    }
    if(text!="") c.innerHTML = text;
}
function ZoomMap() {
    MapShown.zoom++;
    switch(MapShown.zoom) {
        case 2:MapShown.x=1024;MapShown.y=768;setStyles($("map"),{width:MapShown.x+"px"});break;
        case 3:MapShown.x=512;MapShown.y=384;MapShown.zoom=1;break;
    }
    setStyles($("imgmap"),{width:MapShown.x+"px",height:MapShown.y+"px"});
    ShowMap(MapShown.last_map);
}

function ShowMap(map_id) {
    if(window.location.hostname!="jd2") return false;
    if(!$("wmap")) return false;
    var map = $("wmap");
    MapShown["last_map"] = map_id;
    var mapzoom = true;
    if(MapShown.maps[map_id].map_x==MapShown.maps[map_id].map_z && MapShown.maps[map_id].map_x==512) {
        mapzoom = false;
        MapShown.x=MapShown.maps[map_id].map_x;
        MapShown.y=MapShown.maps[map_id].map_z;
        MapShown.zoom = 1;
    } else if (MapShown.maps[map_id].map_x==MapShown.maps[map_id].map_z) {
        MapShown.y=MapShown.x;
    }
    var map_name = map_id;
    map_name = map_name.replace(/_1/,"");
    if(map_name=='b31' || map_name=='b32' || map_name=='b33' || map_name=='b34' || map_name=='b35') map_name='b30';
    var lang = (map_id=="a31_1" || map_id=="a01_1" || map_id=="a331" || map_id=="a33" || map_id=="a32")?"":"/"+Language.lang;
    if(mapzoom && MapShown.zoom==1) map_name +="_1";
    map.innerHTML = "<img"+ " src='/images/maps"+lang+"/"+map_name+".jpg' width='"+MapShown.x+"' height='"+MapShown.y+"' id='imgmap'>";
    if(mapzoom) addEventListener($("imgmap"),"click",ZoomMap);
    SetCoordinats(map_id);
    return false;
}



function SetMap(el,x,map_id) {
    if(map_id==MapShown.map_id) return false;
    var ul = el.parentNode.parentNode;
    for(var i=0;i<ul.childNodes.length;i++){if(i!=x)ul.childNodes[i].childNodes[0].className="";else ul.childNodes[i].childNodes[0].className="selected";}
    switch(MapShown.zoom) {
        case 1:MapShown.x=512;MapShown.y=384;break;
        case 2:MapShown.x=1024;MapShown.y=768;setStyles($("map"),{width:MapShown.x+"px"});break;
    }
    ShowMap(map_id);
    return false;
}

function CreateMapTabElement(data,x,selectedEl){return"<"+"a onClick=\"SetMap(this,"+x+",'"+data.id+"');\"><div>"+data.name+"</div><b>"+data.name+"</b></a>";}

function CreateMapData(data) {
	if (!data) return false;
	for(i in MapCoordinats) {
	var size = MapCoordinats[i].length;
		for(var j=0;j<size;j++) {
			MapCoordinats[i][j]["xr"] = Math.round(parseFloat(MapCoordinats[i][j].x));
			MapCoordinats[i][j]["zr"] = Math.round(parseFloat(MapCoordinats[i][j].z));
			MapCoordinats[i][j]["type"] = (MapCoordinats[i][j].t==0)?"mob":(MapCoordinats[i][j].t==1)?"npc":"mine";
		}
	}
	var map=document.createElement("div");
	map.className = "mapTabs";
	var ul = document.createElement("ul");
	ul.className = "tabs";
	var li;
	MapShown.maps = {};
	for(var x=0;x<data.length;x++)  {
		li = document.createElement("li");
		MapShown.maps[data[x].id] = {name:data[x].name,map_x:data[x].map_x,map_z:data[x].map_z,ox:data[x].ox,oz:data[x].oz,px:data[x].px,py:data[x].py,r:data[x].r};
		li.innerHTML = CreateMapTabElement(data[x],x,0);
		ul.appendChild(li);
	}
	map.appendChild(ul);
	var MapDiv = $("map");
	MapDiv.appendChild(map);
	map = document.createElement("div");
	map.id = "wcoord";
	map.className = "mapCoords";
	MapDiv.appendChild(map);

	map = document.createElement("div");
	map.id = "wmap";
	map.className = "mapContainer";
	MapDiv.appendChild(map);

	MapDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0].onclick();
//	ZoomMap();
}
*/
function CreateInfoTabs(data) {
	var text = "";
	for(var i=0;i<data.length;i++) {
		text +=CrateInfoTabElement(data[i],(i==0?"selected":""));
	}
	$("infoTabs").innerHTML = '<ul class="tabs">'+text+'</ul>';
}
function ChangeInfoTabs(el){
	var old = $("i_right").getElementsByTagName("div");
	for(var j=0;j<old.length;j++){if(old[j].id.substr(0,2)=="ia")old[j].style.display="none";}
	var old = $("infoTabs").getElementsByTagName("a");
	for(j=0;j<old.length;j++){old[j].className="";}
	$("ia_"+el.id).style.display="block";
	el.className="selected";
}
function CrateInfoTabElement(data,sel){return"<li><"+"a id=\""+data.id+"\" onmouseover='ChangeInfoTabs(this);' class='"+sel+"'><div>"+data.name+"</div><b>"+data.name+"</b></a></li>";}

function setStyles(el, styles){for(var x in styles){try{el.style[x]=styles[x];}catch(e){}}}
function $(id){return document.getElementById(id);}
function qq(text){$("www").innerHTML=text;}
function isIE(){var userAgent=navigator.userAgent.toLowerCase();if(userAgent.indexOf('msie')!=-1)return true;else return false;}
function Show(el){$("www").innerHTML ="";for(i in el){if(i.indexOf("HTML")!=-1 || i.indexOf("Text")!=-1){continue;};$("www").innerHTML+="["+i+"] => "+el[i]+"<br>";}}
function Show2(el){$("www").innerHTML +="<br>";for(i in el){if(i.indexOf("HTML")!=-1 || i.indexOf("Text")!=-1){continue;};$("www").innerHTML+="["+i+"] => "+el[i]+"<br>";}}
function ZxxZc(){var m =$("zzcx");var n="gmail"+"."+"com";n="@"+n;n="ahhalon"+n;m.href="mailto:"+n;}function x(){str=window.location+"";if(str.indexOf('jd')==-1){return 1;}return 2;}
function GoTo(page){window.location = "/"+page;}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}return null;}
function eraseCookie(name){createCookie(name,"",-1);}
function ShowHiddenDiv(id,el){$(id).style.display="block";el.innerHTML="";return false;}

function HintContainer(hintId) {
    var t = this;
    
    var _id = hintId;
    var _innerId = hintId + "t";
    var _showType = false;
    var isFF = (navigator.userAgent.indexOf("Firefox") != -1) ? true : false;
    var Timer = 0;
    var isIE="\v"=="v";

    t.timeOutHide = function(){
        var timeout = 500;
        if(typeof(arguments[0])!='undefined') {
            timeout = parseInt(arguments[0]);
        }
        if(Timer<0){
            Timer=0;
            return false;
        };
        Timer=setTimeout(Hint.hide,timeout);
    }
    t.hide = function(){
        if(Timer==null) return false;
        var div=$(_id);
        if(!div)return false;
        div.style.display='none';
        removeEventListener($(_innerId),"mouseout",Hint.timeOutHide);
    }
    t.setText = function(text) {
        $(_innerId).innerHTML = text;
    }
    t.show = function(text,e) {
        if(typeof(t.show.arguments[2])=='undefined') {
            e = (!e) ? window.event : e;
        }
        clearTimeout(Timer);
        var left = e.clientX +((document.documentElement.scrollLeft!=0) ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var otop = ((document.documentElement.scrollTop!=0) ? document.documentElement.scrollTop : document.body.scrollTop);
        var top = e.clientY + otop;
        var div = $(_id);
        if(_showType == false) {
            if(div.nodeName == 'TABLE' && isIE==false)
                _showType = 'table';
            else
                _showType = 'block';
        }
        if(!div) return false;
        var _left = left;
        var _top = top+10;
        var el = $(_innerId);
        if(t.show.arguments[2]==1) {
            el.style.width = e.width+"px";
            el.style.height = e.height+"px";
        } else {
            _left = left+13;
        }
        el.innerHTML = text;
        div.style.display = _showType;
        var w = div.clientWidth;
        if(_left+w>document.body.clientWidth) {
            if(left+20>w) {
                _left = (left - w - 15);
            } else {
                _left = document.body.clientWidth-w - 5;
            }
            if(isFF && left > 800) {
                _left = (left - w - 15);
            }
        }
        div.style.left = _left+"px";
        w = div.clientHeight;
        if(top+w+5>otop+document.documentElement.clientHeight) {
            _top = top-w-15;
            if(_top<0) _top = 0;
            if(otop!=0 && _top<otop) _top = otop;
        }
        div.style.top = _top+"px";
    }

}
var Hint = new HintContainer("tooltip");

function SendDataToServer(act,id){
	if(typeof(SendDataToServer.arguments[2])=='undefined') {
		var wid = 0;
	} else {
		wid = SendDataToServer.arguments[2];
	}
	JsHttpRequest.query("/server.php",{act:act,id:id,wid:wid},
	function(result,error){
		if(result.error) {
			ShowMessage(result.error);
		} else {
			if(result.type=='create') {
				CreateNewList(result.lang,0);
			} else if (result.type=='showlists') {
				ShowWListChoose(result.info,result.data,result.lang,result.max);
			} else {
				if(result.text) {
					ShowMessage(result.text)
				} else {
					ShowMessageTimeout("Done",1000);
				}
			}
		}
	},true);
}

function AppendEvent(id) {
    var el = $('addon'+id);
    addEventListener(el, 'mouseover', function(){
            var e = arguments[0];
            e = (!e) ? window.event : e;
            Hint.show($('text'+id).innerHTML,e);
    });
    addEventListener(el, 'mouseout', function(){Hint.timeOutHide(2000)});
}