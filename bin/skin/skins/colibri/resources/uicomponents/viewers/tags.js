var XWiki=(function(B){var A=B.viewers=B.viewers||{};
A.Tags=Class.create({initialize:function(){$$(".doc-tags .tag-delete").each(this.ajaxTagDelete);
$$(".doc-tags .tag-add a").each(this.createTagAddForm.bind(this));
if($$(".doc-tags .tag-add-form").length>0){this.ajaxifyForm($$(".doc-tags .tag-add-form")[0])
}},ajaxTagDelete:function(C){C.observe("click",function(D){if(D){D.stop()
}if(!C.disabled){new Ajax.Request(C.readAttribute("href").replace(/&xredirect=.+$/,"&ajax=1"),{onCreate:function(){C.disabled=true;
C.notification=new B.widgets.Notification("Deleting tag...","inprogress")
},onSuccess:function(){C.up(".tag-wrapper").remove()
},onFailure:function(E){new B.widgets.Notification(E.responseText||"Server not responding","error")
},on0:function(E){E.request.options.onFailure(E)
},onComplete:function(){C.disabled=false;
C.notification.hide()
}})
}}.bindAsEventListener())
},createTagAddForm:function(C){C.observe("click",function(D){if(D){D.stop()
}if(!C._x_form){if(!C.disabled){new Ajax.Request(C.readAttribute("href").replace(/#.+$/,"&ajax=1&xpage=documentTags"),{onCreate:function(){C.disabled=true;
C.notification=new B.widgets.Notification("Fetching form...","inprogress")
},onSuccess:function(E){var F=C.up();
C.remove();
F.update(E.responseText);
C._x_form=F.firstDescendant();
C._x_form._x_activator=C;
C._x_form.down("input[type=text]").focus();
this.ajaxifyForm(C._x_form)
}.bind(this),onFailure:function(E){new B.widgets.Notification(E.responseText||"Server not responding","error")
},on0:function(E){E.request.options.onFailure(E)
},onComplete:function(){C.disabled=false;
C.notification.hide()
}})
}}else{Element.replace(C,C._x_form);
C._x_form.down("input[type=text]").focus()
}}.bindAsEventListener(this))
},ajaxifyForm:function(D){D.setAttribute("autocomplete","off");
D.down("input[type=text]").setAttribute("autocomplete","off");
D.down("input[type=text]").setAttribute("autocomplete","off");
D.observe("submit",function(E){E.stop();
D.down("input[type=text]").focus();
if(D.tag.value!=""){new Ajax.Request(D.action.replace(/&xredirect=.+$/,"&ajax=1&tag=")+encodeURIComponent(D.tag.value),{onCreate:function(){D.disable();
D.notification=new B.widgets.Notification("Adding tag...","inprogress")
},onSuccess:function(F){var G=new Element("span");
G.insert(F.responseText+" ");
G.select(".tag-delete").each(this.ajaxTagDelete);
while(G.childNodes.length>0){D.up(".tag-add").insert({before:G.firstChild});
D.up(".tag-add").insert({before:" "});
G.removeChild(G.firstChild)
}D.reset()
}.bind(this),onFailure:function(F){new B.widgets.Notification(F.responseText||"Server not responding","error")
},onComplete:function(){D.enable();
D.notification.hide()
},on0:function(F){F.request.options.onFailure(F)
}})
}}.bindAsEventListener(this));
D.observe("reset",function(E){Element.replace(D,D._x_activator)
}.bindAsEventListener(this));
var C=new Element("input",{type:"reset",value:D.down(".button-add-tag-cancel").innerHTML,"class":"button"});
D.down(".button-add-tag-cancel").replace(C);
new B.widgets.Suggest(D.down("input[type=text]"),{script:"/bin/view/Main/?xpage=suggest&classname=XWiki.TagClass&fieldname=tags&firCol=%2D&secCol=%2D&",varname:"input",seps:" ,|",shownoresults:false,icon:"/resources/icons/silk/tag_yellow.gif"})
}});
return B
}(XWiki||{}));
document.observe("xwiki:dom:loaded",function(){new XWiki.viewers.Tags()
});
