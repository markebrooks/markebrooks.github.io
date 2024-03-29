var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(A){A=A.toUpperCase();
var F=this.NODEMAP[A]||"div";
var B=document.createElement(F);
try{B.innerHTML="<"+A+"></"+A+">"
}catch(E){}var D=B.firstChild||null;
if(D&&(D.tagName.toUpperCase()!=A)){D=D.getElementsByTagName(A)[0]
}if(!D){D=document.createElement(A)
}if(!D){return 
}if(arguments[1]){if(this._isStringOrNumber(arguments[1])||(arguments[1] instanceof Array)||arguments[1].tagName){this._children(D,arguments[1])
}else{var C=this._attributes(arguments[1]);
if(C.length){try{B.innerHTML="<"+A+" "+C+"></"+A+">"
}catch(E){}D=B.firstChild||null;
if(!D){D=document.createElement(A);
for(attr in arguments[1]){D[attr=="class"?"className":attr]=arguments[1][attr]
}}if(D.tagName.toUpperCase()!=A){D=B.getElementsByTagName(A)[0]
}}}}if(arguments[2]){this._children(D,arguments[2])
}return $(D)
},_text:function(A){return document.createTextNode(A)
},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(A){var B=[];
for(attribute in A){B.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+A[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"')
}return B.join(" ")
},_children:function(B,A){if(A.tagName){B.appendChild(A);
return 
}if(typeof A=="object"){A.flatten().each(function(C){if(typeof C=="object"){B.appendChild(C)
}else{if(Builder._isStringOrNumber(C)){B.appendChild(Builder._text(C))
}}})
}else{if(Builder._isStringOrNumber(A)){B.appendChild(Builder._text(A))
}}},_isStringOrNumber:function(A){return(typeof A=="string"||typeof A=="number")
},build:function(B){var A=this.node("div");
$(A).update(B.strip());
return A.down()
},dump:function(B){if(typeof B!="object"&&typeof B!="function"){B=window
}var A=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);
A.each(function(C){B[C]=function(){return Builder.node.apply(Builder,[C].concat($A(arguments)))
}
})
}};