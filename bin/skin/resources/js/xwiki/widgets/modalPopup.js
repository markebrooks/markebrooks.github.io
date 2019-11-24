var XWiki=(function(B){var A=B.widgets=B.widgets||{};
A.ModalPopup=Class.create({options:{title:"",displayCloseButton:true,screenColor:"",borderColor:"",titleColor:"",backgroundColor:"",screenOpacity:"0.5",verticalPosition:"center",horizontalPosition:"center",removeOnClose:false},initialize:function(E,C,D){this.shortcuts={show:{method:this.showDialog,keys:["Ctrl+G","Meta+G"]},close:{method:this.closeDialog,keys:["Esc"]}},this.content=E||"Hello world!";
this.shortcuts=Object.extend(Object.clone(this.shortcuts),C||{});
this.options=Object.extend(Object.clone(this.options),D||{});
this.registerShortcuts("show")
},createDialog:function(E){this.dialog=new Element("div",{"class":"xdialog-modal-container"});
var D=new Element("div",{"class":"xdialog-screen"}).setStyle({opacity:this.options.screenOpacity,backgroundColor:this.options.screenColor});
this.dialog.update(D);
this.dialogBox=new Element("div",{"class":"xdialog-box"});
this.dialogBox._x_contentPlug=new Element("div");
this.dialogBox.update(this.dialogBox._x_contentPlug);
this.dialogBox._x_contentPlug.update(this.content);
if(this.options.title){var F=new Element("div",{"class":"xdialog-title"}).update(this.options.title);
F.setStyle({color:this.options.titleColor});
this.dialogBox.insertBefore(F,this.dialogBox.firstChild)
}if(this.options.displayCloseButton){var C=new Element("div",{"class":"xdialog-close",title:"Close"}).update("X");
C.setStyle({color:this.options.titleColor});
C.observe("click",this.closeDialog.bindAsEventListener(this));
this.dialogBox.insertBefore(C,this.dialogBox.firstChild)
}this.dialog.appendChild(this.dialogBox);
this.dialogBox.setStyle({textAlign:"left",borderColor:this.options.borderColor,backgroundColor:this.options.backgroundColor});
switch(this.options.verticalPosition){case"top":this.dialogBox.setStyle({top:"0"});
break;
case"bottom":this.dialogBox.setStyle({bottom:"0"});
break;
default:this.dialogBox.setStyle({top:"35%"});
break
}switch(this.options.horizontalPosition){case"left":this.dialog.setStyle({textAlign:"left"});
break;
case"right":this.dialog.setStyle({textAlign:"right"});
break;
default:this.dialog.setStyle({textAlign:"center"});
this.dialogBox.setStyle({margin:"auto"});
break
}document.body.appendChild(this.dialog);
this.dialog.hide()
},setClass:function(C){this.dialogBox.addClassName("xdialog-box-"+C)
},removeClass:function(C){this.dialogBox.removeClassName("xdialog-box-"+C)
},setContent:function(C){this.content=C;
this.dialogBox._x_contentPlug.update(this.content)
},showDialog:function(C){if(C){Event.stop(C)
}if(!A.ModalPopup.active){A.ModalPopup.active=true;
if(!this.dialog){this.createDialog()
}this.attachKeyListeners();
if(window.browser.isIE6x){this.dialog.setStyle({top:document.viewport.getScrollOffsets().top+"px"});
this.dialog._x_scrollListener=this.onScroll.bindAsEventListener(this);
Event.observe(window,"scroll",this.dialog._x_scrollListener);
$$("select").each(function(D){D._x_initiallyVisible=D.style.visibility;
D.style.visibility="hidden"
})
}this.dialog.show()
}},onScroll:function(C){this.dialog.setStyle({top:document.viewport.getScrollOffsets().top+"px"})
},closeDialog:function(C){if(C){Event.stop(C)
}if(window.browser.isIE6x){Event.stopObserving(window,"scroll",this.dialog._x_scrollListener);
$$("select").each(function(D){D.style.visibility=D._x_initiallyVisible
})
}this.dialog.hide();
if(this.options.removeOnClose){this.dialog.remove()
}this.detachKeyListeners();
A.ModalPopup.active=false
},attachKeyListeners:function(){for(var C in this.shortcuts){if(C!="show"){this.registerShortcuts(C)
}}},detachKeyListeners:function(){for(var C in this.shortcuts){if(C!="show"){this.unregisterShortcuts(C)
}}},registerShortcuts:function(E){var C=this.shortcuts[E].keys;
var F=this.shortcuts[E].method;
for(var D=0;
D<C.size();
++D){if(Prototype.Browser.IE||Prototype.Browser.WebKit){shortcut.add(C[D],F.bindAsEventListener(this,E),{type:"keyup"})
}else{shortcut.add(C[D],F.bindAsEventListener(this,E),{type:"keypress"})
}}},unregisterShortcuts:function(D){for(var C=0;
C<this.shortcuts[D].keys.size();
++C){shortcut.remove(this.shortcuts[D].keys[C])
}},createButton:function(D,F,E,H){var G=new Element("span",{"class":"buttonwrapper"});
var C=new Element("input",{type:D,"class":"button",value:F,title:E,id:H});
G.update(C);
return G
}});
A.ModalPopup.active=false;
return B
}(XWiki||{}));
