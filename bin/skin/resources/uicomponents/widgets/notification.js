var XWiki=(function(B){var A=B.widgets=B.widgets||{};
A.Notification=Class.create({text:"Hello world!",defaultOptions:{plain:{timeout:5},info:{timeout:5},warning:{timeout:5},error:{timeout:10},inprogress:{timeout:false},done:{timeout:2}},initialize:function(E,D,C){this.text=E||this.text;
this.type=(typeof this.defaultOptions[D]!="undefined")?D:"plain";
this.options=Object.extend(Object.clone(this.defaultOptions[this.type]),C||{});
this.createElement();
if(!this.options.inactive){this.show()
}},createElement:function(){if(!this.element){this.element=new Element("div",{"class":"xnotification xnotification-"+this.type}).update(this.text);
if(this.options.icon){this.element.setStyle({backgroundImage:this.options.icon,paddingLeft:"22px"})
}if(this.options.backgroundColor){this.element.setStyle({backgroundColor:this.options.backgroundColor})
}if(this.options.color){this.element.setStyle({color:this.options.color})
}this.element=this.element.wrap(new Element("div",{"class":"xnotification-wrapper"}));
Event.observe(this.element,"click",this.hide.bindAsEventListener(this))
}},show:function(){if(!this.element.descendantOf(A.Notification.getContainer())){A.Notification.getContainer().insert({top:this.element})
}this.element.show();
if(this.options.timeout){this.timer=window.setTimeout(this.hide.bind(this),this.options.timeout*1000)
}},hide:function(){this.element.hide();
if(this.element.parentNode){this.element.remove()
}if(this.timer){window.clearTimeout(this.timer);
this.timer=null
}},replace:function(C){if(this.element.parentNode){this.element.replace(C.element)
}if(this.timer){window.clearTimeout(this.timer);
this.timer=null
}C.show()
}});
A.Notification.container=null;
A.Notification.getContainer=function(){if(!A.Notification.container){A.Notification.container=new Element("div",{"class":"xnotification-container"});
$(document.body).insert(A.Notification.container);
if(Prototype.Browser.IE){A.Notification.container.setStyle({position:"absolute",bottom:"0px"});
Event.observe(window,"scroll",function(){var C=new Element("div");
A.Notification.container.insert({top:C});
setTimeout(C.remove.bind(C),1)
})
}}return A.Notification.container
};
return B
}(XWiki||{}));
