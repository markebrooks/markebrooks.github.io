var XWiki=(function(B){var A=B.widgets=B.widgets||{};
if(typeof A.XList=="undefined"){if(typeof console!="undefined"&&typeof console.warn=="function"){console.warn("[Suggest widget] Required class missing: XWiki.widgets.XList")
}}else{A.Suggest=Class.create({options:{minchars:1,method:"get",varname:"input",className:"ajaxsuggest",timeout:2500,delay:500,offsety:0,shownoresults:true,noresults:"No results!",maxheight:250,cache:false,seps:"",icon:null,resultsParameter:"results",resultId:"id",resultValue:"value",resultInfo:"info",parentContainer:"body"},sInput:"",nInputChars:0,aSuggestions:[],iHighlighted:0,initialize:function(C,D){this.fld=$(C);
if(!this.fld){return false
}this.options=Object.extend(Object.clone(this.options),D||{});
if(!$(this.options.parentContainer)){this.options.parentContainer=$(document.body)
}if(this.options.seps){this.seps=this.options.seps
}else{this.seps=""
}this.fld.observe("keyup",this.onKeyUp.bindAsEventListener(this));
if(Prototype.Browser.IE||Prototype.Browser.WebKit){this.fld.observe("keydown",this.onKeyPress.bindAsEventListener(this))
}else{this.fld.observe("keypress",this.onKeyPress.bindAsEventListener(this))
}this.fld.setAttribute("autocomplete","off")
},onKeyUp:function(F){var D=F.keyCode;
switch(D){case Event.KEY_RETURN:case Event.KEY_ESC:case Event.KEY_UP:case Event.KEY_DOWN:break;
default:if(this.seps){var E=-1;
for(var C=0;
C<this.seps.length;
C++){if(this.fld.value.lastIndexOf(this.seps.charAt(C))>E){E=this.fld.value.lastIndexOf(this.seps.charAt(C))
}}if(E==-1){this.getSuggestions(this.fld.value)
}else{this.getSuggestions(this.fld.value.substring(E+1))
}}else{this.getSuggestions(this.fld.value)
}}},onKeyPress:function(D){if(!$(this.suggest)){return 
}var C=D.keyCode;
switch(C){case Event.KEY_RETURN:if(this.aSuggestions.length==1){this.highlightFirst()
}this.setHighlightedValue();
Event.stop(D);
break;
case Event.KEY_ESC:this.clearSuggestions();
Event.stop(D);
break;
case Event.KEY_UP:this.changeHighlight(C);
Event.stop(D);
break;
case Event.KEY_DOWN:this.changeHighlight(C);
Event.stop(D);
break;
default:break
}},getSuggestions:function(F){F=F.strip();
if(F==this.sInput){return false
}if(F.length<this.options.minchars){this.sInput="";
return false
}if(F.length>this.nInputChars&&this.aSuggestions.length&&this.options.cache){var C=[];
for(var D=0;
D<this.aSuggestions.length;
D++){if(this.aSuggestions[D].value.substr(0,F.length).toLowerCase()==F.toLowerCase()){C.push(this.aSuggestions[D])
}}this.sInput=F;
this.nInputChars=F.length;
this.aSuggestions=C;
this.createList(this.aSuggestions);
return false
}else{this.sInput=F;
this.nInputChars=F.length;
var E=this;
clearTimeout(this.ajID);
this.ajID=setTimeout(function(){E.doAjaxRequest()
},this.options.delay)
}return false
},doAjaxRequest:function(){var F=this;
var D=this.options.script+this.options.varname+"="+encodeURIComponent(this.fld.value.strip());
var G=this.options.method;
var E={};
if(this.options.json){E.Accept="application/json"
}else{E.Accept="application/xml"
}var C=new Ajax.Request(D,{method:G,requestHeaders:E,onSuccess:this.setSuggestions.bindAsEventListener(this),onFailure:function(H){new B.widgets.Notification("Failed to retrieve suggestions : ')"+H.statusText,"error",{timeout:5})
}})
},setSuggestions:function(F){this.aSuggestions=[];
if(this.options.json){var G=F.responseJSON;
if(!G){return false
}var E=G[this.options.resultsParameter];
for(var D=0;
D<E.length;
D++){this.aSuggestions.push({id:E[D][this.options.resultId],value:E[D][this.options.resultValue],info:E[D][this.options.resultInfo]})
}}else{var C=F.responseXML;
var E=C.getElementsByTagName(this.options.resultsParameter)[0].childNodes;
for(var D=0;
D<E.length;
D++){if(E[D].hasChildNodes()){this.aSuggestions.push({id:E[D].getAttribute("id"),value:E[D].childNodes[0].nodeValue,info:E[D].getAttribute("info")})
}}}this.createList(this.aSuggestions)
},createList:function(H){var C=this;
if(this.suggest&&this.suggest.parentNode){this.suggest.remove()
}this.killTimeout();
if(H.length==0&&!this.options.shownoresults){return false
}var D=new Element("div",{"class":"suggestItems "+this.options.className});
var I=new B.widgets.XList([],{icon:this.options.icon,classes:"suggestList",eventListeners:{click:function(){C.setHighlightedValue();
return false
},mouseover:function(){C.setHighlight(this.getElement())
}}});
for(var G=0;
G<H.length;
G++){var E=H[G].value,N=E.toLowerCase().indexOf(this.sInput.toLowerCase());
var F=E.substring(0,N)+"<span class='highlight'>"+E.substring(N,N+this.sInput.length)+"</span>"+E.substring(N+this.sInput.length);
var K=new Element("span").update(F);
var L=new Element("div").insert(new Element("span",{"class":"suggestId"}).update(H[G].id)).insert(new Element("span",{"class":"suggestValue"}).update(H[G].value)).insert(new Element("span",{"class":"suggestInfo"}).update(H[G].info));
var M=new B.widgets.XListItem(K,{containerClasses:"suggestItem",value:L,noHighlight:true});
I.addItem(M)
}if(H.length==0){I.addItem(new B.widgets.XListItem(this.options.noresults,{classes:"noSuggestion"}))
}D.appendChild(I.getElement());
var J=this.fld.cumulativeOffset();
D.style.left=J.left+"px";
D.style.top=(J.top+this.fld.offsetHeight+this.options.offsety)+"px";
D.style.width=this.fld.offsetWidth+"px";
D.onmouseover=function(){C.killTimeout()
};
D.onmouseout=function(){C.resetTimeout()
};
$(this.options.parentContainer).insert(D);
this.suggest=D;
this.iHighlighted=0;
var C=this;
this.toID=setTimeout(function(){C.clearSuggestions()
},this.options.timeout)
},changeHighlight:function(C){var E=this.suggest.down("ul");
if(!E){return false
}var F,D;
if(this.iHighlighted){if(C==40){D=this.iHighlighted.next()||E.down("li")
}else{if(C==38){D=this.iHighlighted.previous()||E.down("li:last-child")
}}}else{if(C==40){D=E.down("li")
}else{if(C==38){if(E.select("li")>0){D=E.select("li")[E.select("li").length]
}}}}if(D){this.setHighlight(D)
}},setHighlight:function(C){if(this.iHighlighted){this.clearHighlight()
}C.addClassName("xhighlight");
this.iHighlighted=C;
this.killTimeout()
},clearHighlight:function(){if(this.iHighlighted){this.iHighlighted.removeClassName("xhighlight");
delete this.iHighlighted
}},highlightFirst:function(){if(this.suggest&&this.suggest.down("ul")){var C=this.suggest.down("ul").down("li");
if(C){this.setHighlight(C)
}}},setHighlightedValue:function(){if(this.iHighlighted&&!this.iHighlighted.hasClassName("noSuggestion")){if(this.sInput==""&&this.fld.value==""){this.sInput=this.fld.value=this.iHighlighted.down(".suggestValue").innerHTML
}else{if(this.seps){var F=-1;
for(var E=0;
E<this.seps.length;
E++){if(this.fld.value.lastIndexOf(this.seps.charAt(E))>F){F=this.fld.value.lastIndexOf(this.seps.charAt(E))
}}if(F==-1){this.sInput=this.fld.value=this.iHighlighted.down(".suggestValue").innerHTML
}else{this.fld.value=this.fld.value.substring(0,F+1)+this.iHighlighted.down(".suggestValue").innerHTML;
this.sInput=this.fld.value.substring(F+1)
}}else{this.sInput=this.fld.value=this.iHighlighted.down(".suggestValue").innerHTML
}}Event.fire(this.fld,"xwiki:suggest:selected",{id:this.iHighlighted.down(".suggestId").innerHTML,value:this.iHighlighted.down(".suggestValue").innerHTML,info:this.iHighlighted.down(".suggestInfo").innerHTML});
this.fld.focus();
this.clearSuggestions();
if(typeof (this.options.callback)=="function"){this.options.callback({id:this.iHighlighted.down(".suggestId").innerHTML,value:this.iHighlighted.down(".suggestValue").innerHTML,info:this.iHighlighted.down(".suggestInfo").innerHTML})
}if(this.fld.id.indexOf("_suggest")>0){var D=this.fld.id.substring(0,this.fld.id.indexOf("_suggest"));
var C=$(D);
if(C){C.value=this.iHighlighted.down(".suggestInfo").innerHTML
}}}},killTimeout:function(){clearTimeout(this.toID)
},resetTimeout:function(){clearTimeout(this.toID);
var C=this;
this.toID=setTimeout(function(){C.clearSuggestions()
},1000)
},clearSuggestions:function(){this.killTimeout();
var C=$(this.suggest);
var E=this;
if(C){var D=new Effect.Fade(C,{duration:"0.25",afterFinish:function(){if($(E.suggest)){$(E.suggest).remove();
delete E.suggest
}}})
}}})
}return B
})(XWiki||{});