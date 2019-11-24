(function(){function A(B){if(typeof console!="undefined"&&typeof console.warn=="function"){console.warn(B)
}}if(typeof XWiki.widgets=="object"&&typeof XWiki.widgets.FullScreen=="function"){XWiki.editors=XWiki.editors||{};
XWiki.editors.FullScreenEditing=Class.create(XWiki.widgets.FullScreen,{initialize:function($super){A("XWiki.editors.FullScreenEditing is deprecated since XWiki 2.6RC2. Use XWiki.widgets.FullScreen instead.");
$super()
}})
}if(window.useXWKns){A("_xwk namespace is deprecated since XWiki 2.6RC1. Use the XWiki namespace instead.");
if(typeof _xwk=="undefined"){_xwk=new Object()
}}else{_xwk=window
}_xwk.ajaxSuggest=Class.create(XWiki.widgets.Suggest,{initialize:function($super){A("ajaxSuggest is deprecated since XWiki 2.6RC1. Use XWiki.widgets.Suggest instead.");
var B=$A(arguments);
B.shift();
$super.apply(_xwk,B)
}});
window.displayDocExtra=XWiki.displayDocExtra.wrap(function(){A("window.displayDocExtra is deprecated since XWiki 1.9M2. Use XWiki.displayDocExtra instead.");
var B=$A(arguments),C=B.shift();
return C.apply(window,B)
});
if(typeof XWiki.widgets=="object"&&typeof XWiki.widgets.LiveTable=="function"){window.ASSTable=Class.create(XWiki.widgets.LiveTable,{initialize:function($super,B,F,E,C,G,H,I,D){A("window.ASSTable is deprecated since XWiki 1.9M2. Use XWiki.widgets.LiveTable instead.");
if($("showLimits")){if($("showLimits").up("tr")){$("showLimits").up("tr").insert({after:new Element("tr").update(new Element("td").update(new Element("div",{id:E+"-pagination","class":"xwiki-grid-pagination-content"})))})
}$("showLimits").id=E+"-limits"
}if($("scrollbar1")&&$("scrollbar1").up("td")){if($("scrollbar1").up("td").next()){$("scrollbar1").up("td").next().remove()
}$("scrollbar1").up("td").remove()
}if($("table-filters")){$("table-filters").id=E+"-filters"
}$super(B,E,H,{action:D})
}})
}window.hideForm=function(B){A("window.hideForm is deprecated since XWiki 2.6RC1. Use a CSS selector + Element#toggleClassName instead.");
B.getElementsByTagName("fieldset").item(0).className="collapsed"
};
window.toggleForm=function(C){A("window.toggleForm is deprecated since XWiki 2.6RC1. Use a CSS selector + Element#toggleClassName instead.");
var B=C.getElementsByTagName("fieldset").item(0);
if(B.className=="collapsed"){B.className="expanded"
}else{B.className="collapsed"
}};
window.createCookie=XWiki.cookies.create.wrap(function(){A("window.createCookie is deprecated since XWiki 2.6RC1. Use XWiki.cookies.create instead.");
var B=$A(arguments),C=B.shift();
return C.apply(window,B)
});
window.readCookie=XWiki.cookies.read.wrap(function(){A("window.readCookie is deprecated since XWiki 2.6RC1. Use XWiki.cookies.read instead.");
var B=$A(arguments),C=B.shift();
return C.apply(window,B)
});
window.eraseCookie=XWiki.cookies.erase.wrap(function(){A("window.eraseCookie is deprecated since XWiki 2.6RC1. Use XWiki.cookies.erase instead.");
var B=$A(arguments),C=B.shift();
return C.apply(window,B)
});
window.togglePanelVisibility=XWiki.togglePanelVisibility.wrap(function(){A("window.togglePanelVisibility is deprecated since XWiki 2.6RC1. Use XWiki.togglePanelVisibility instead.");
var B=$A(arguments),C=B.shift();
return C.apply(window,B)
})
})();