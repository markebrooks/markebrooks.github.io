var XWiki=function(B){var A=B.widgets=B.widgets||{};
A.XList=Class.create({initialize:function(C,D){this.items=C||[];
this.options=D||{};
this.listElement=new Element(this.options.ordered?"ol":"ul",{"class":"xlist"+(this.options.classes?(" "+this.options.classes):"")});
if(this.items&&this.items.length>0){for(var E=0;
E<this.items.length;
E++){this.addItem(this.items[E])
}}},addItem:function(C){if(!C||!(C instanceof B.widgets.XListItem)){C=new B.widgets.XListItem(C)
}var D=C.getElement();
if(this.options.itemClasses&&!this.options.itemClasses.blank()){D.addClassName(this.options.itemClasses)
}this.listElement.insert(D);
if(typeof this.options.eventListeners=="object"){C.bindEventListeners(this.options.eventListeners)
}if(this.options.icon&&!this.options.icon.blank()){C.setIcon(this.options.icon,this.options.overrideItemIcon)
}C.list=this
},getElement:function(){return this.listElement
}});
A.XListItem=Class.create({initialize:function(E,C){this.options=C||{};
var D="xitem "+(this.options.noHighlight?"":"xhighlight ");
D+=this.options.classes?this.options.classes:"";
this.containerElement=new Element("div",{"class":"xitemcontainer"}).insert(E||"");
this.containerElement.addClassName(this.options.containerClasses||"");
this.containerElement.setStyle({textIndent:"0px"});
if(this.options.value){this.containerElement.insert(new Element("div",{"class":"hidden value"}).insert(this.options.value))
}this.listItemElement=new Element("li",{"class":D}).update(this.containerElement);
if(this.options.icon&&!this.options.icon.blank()){this.setIcon(this.options.icon);
this.hasIcon=true
}if(typeof this.options.eventListeners=="object"){this.bindEventListeners(this.options.eventListeners)
}},getElement:function(){return this.listItemElement
},setIcon:function(D,C){if(!this.hasIcon||C){this.iconImage=new Image();
this.iconImage.onload=function(){this.listItemElement.setStyle({backgroundImage:"url("+this.iconImage.src+")",backgroundRepeat:"no-repeat"});
this.listItemElement.down(".xitemcontainer").setStyle({textIndent:(this.iconImage.width+5)+"px",height:this.iconImage.height+"px"})
}.bind(this);
this.iconImage.src=D
}},bindEventListeners:function(E){var D=Object.keys(E);
for(var C=0;
C<D.length;
C++){this.listItemElement.observe(D[C],E[D[C]].bind(this))
}}});
return B
}(XWiki||{});