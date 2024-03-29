if(Object.isUndefined(Effect)){throw ("dragdrop.js requires including script.aculo.us' effects.js library")
}var Droppables={drops:[],remove:function(A){this.drops=this.drops.reject(function(B){return B.element==$(A)
})
},add:function(B){B=$(B);
var A=Object.extend({greedy:true,hoverclass:null,tree:false},arguments[1]||{});
if(A.containment){A._containers=[];
var C=A.containment;
if(Object.isArray(C)){C.each(function(D){A._containers.push($(D))
})
}else{A._containers.push($(C))
}}if(A.accept){A.accept=[A.accept].flatten()
}Element.makePositioned(B);
A.element=B;
this.drops.push(A)
},findDeepestChild:function(A){deepest=A[0];
for(i=1;
i<A.length;
++i){if(Element.isParent(A[i].element,deepest.element)){deepest=A[i]
}}return deepest
},isContained:function(B,A){var C;
if(A.tree){C=B.treeNode
}else{C=B.parentNode
}return A._containers.detect(function(D){return C==D
})
},isAffected:function(A,C,B){return((B.element!=C)&&((!B._containers)||this.isContained(C,B))&&((!B.accept)||(Element.classNames(C).detect(function(D){return B.accept.include(D)
})))&&Position.within(B.element,A[0],A[1]))
},deactivate:function(A){if(A.hoverclass){Element.removeClassName(A.element,A.hoverclass)
}this.last_active=null
},activate:function(A){if(A.hoverclass){Element.addClassName(A.element,A.hoverclass)
}this.last_active=A
},show:function(A,C){if(!this.drops.length){return 
}var B,D=[];
this.drops.each(function(E){if(Droppables.isAffected(A,C,E)){D.push(E)
}});
if(D.length>0){B=Droppables.findDeepestChild(D)
}if(this.last_active&&this.last_active!=B){this.deactivate(this.last_active)
}if(B){Position.within(B.element,A[0],A[1]);
if(B.onHover){B.onHover(C,B.element,Position.overlap(B.overlap,B.element))
}if(B!=this.last_active){Droppables.activate(B)
}}},fire:function(B,A){if(!this.last_active){return 
}Position.prepare();
if(this.isAffected([Event.pointerX(B),Event.pointerY(B)],A,this.last_active)){if(this.last_active.onDrop){this.last_active.onDrop(A,this.last_active.element,B);
return true
}}},reset:function(){if(this.last_active){this.deactivate(this.last_active)
}}};
var Draggables={drags:[],observers:[],register:function(A){if(this.drags.length==0){this.eventMouseUp=this.endDrag.bindAsEventListener(this);
this.eventMouseMove=this.updateDrag.bindAsEventListener(this);
this.eventKeypress=this.keyPress.bindAsEventListener(this);
Event.observe(document,"mouseup",this.eventMouseUp);
Event.observe(document,"mousemove",this.eventMouseMove);
Event.observe(document,"keypress",this.eventKeypress)
}this.drags.push(A)
},unregister:function(A){this.drags=this.drags.reject(function(B){return B==A
});
if(this.drags.length==0){Event.stopObserving(document,"mouseup",this.eventMouseUp);
Event.stopObserving(document,"mousemove",this.eventMouseMove);
Event.stopObserving(document,"keypress",this.eventKeypress)
}},activate:function(A){if(A.options.delay){this._timeout=setTimeout(function(){Draggables._timeout=null;
window.focus();
Draggables.activeDraggable=A
}.bind(this),A.options.delay)
}else{window.focus();
this.activeDraggable=A
}},deactivate:function(){this.activeDraggable=null
},updateDrag:function(A){if(!this.activeDraggable){return 
}var B=[Event.pointerX(A),Event.pointerY(A)];
if(this._lastPointer&&(this._lastPointer.inspect()==B.inspect())){return 
}this._lastPointer=B;
this.activeDraggable.updateDrag(A,B)
},endDrag:function(A){if(this._timeout){clearTimeout(this._timeout);
this._timeout=null
}if(!this.activeDraggable){return 
}this._lastPointer=null;
this.activeDraggable.endDrag(A);
this.activeDraggable=null
},keyPress:function(A){if(this.activeDraggable){this.activeDraggable.keyPress(A)
}},addObserver:function(A){this.observers.push(A);
this._cacheObserverCallbacks()
},removeObserver:function(A){this.observers=this.observers.reject(function(B){return B.element==A
});
this._cacheObserverCallbacks()
},notify:function(B,A,C){if(this[B+"Count"]>0){this.observers.each(function(D){if(D[B]){D[B](B,A,C)
}})
}if(A.options[B]){A.options[B](A,C)
}},_cacheObserverCallbacks:function(){["onStart","onEnd","onDrag"].each(function(A){Draggables[A+"Count"]=Draggables.observers.select(function(B){return B[A]
}).length
})
}};
var Draggable=Class.create({initialize:function(B){var C={handle:false,reverteffect:function(F,E,D){var G=Math.sqrt(Math.abs(E^2)+Math.abs(D^2))*0.02;
new Effect.Move(F,{x:-D,y:-E,duration:G,queue:{scope:"_draggable",position:"end"}})
},endeffect:function(E){var D=Object.isNumber(E._opacity)?E._opacity:1;
new Effect.Opacity(E,{duration:0.2,from:0.7,to:D,queue:{scope:"_draggable",position:"end"},afterFinish:function(){Draggable._dragging[E]=false
}})
},zindex:1000,revert:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,snap:false,delay:0};
if(!arguments[1]||Object.isUndefined(arguments[1].endeffect)){Object.extend(C,{starteffect:function(D){D._opacity=Element.getOpacity(D);
Draggable._dragging[D]=true;
new Effect.Opacity(D,{duration:0.2,from:D._opacity,to:0.7})
}})
}var A=Object.extend(C,arguments[1]||{});
this.element=$(B);
if(A.handle&&Object.isString(A.handle)){this.handle=this.element.down("."+A.handle,0)
}if(!this.handle){this.handle=$(A.handle)
}if(!this.handle){this.handle=this.element
}if(A.scroll&&!A.scroll.scrollTo&&!A.scroll.outerHTML){A.scroll=$(A.scroll);
this._isScrollChild=Element.childOf(this.element,A.scroll)
}Element.makePositioned(this.element);
this.options=A;
this.dragging=false;
this.eventMouseDown=this.initDrag.bindAsEventListener(this);
Event.observe(this.handle,"mousedown",this.eventMouseDown);
Draggables.register(this)
},destroy:function(){Event.stopObserving(this.handle,"mousedown",this.eventMouseDown);
Draggables.unregister(this)
},currentDelta:function(){return([parseInt(Element.getStyle(this.element,"left")||"0"),parseInt(Element.getStyle(this.element,"top")||"0")])
},initDrag:function(A){if(!Object.isUndefined(Draggable._dragging[this.element])&&Draggable._dragging[this.element]){return 
}if(Event.isLeftClick(A)){var C=Event.element(A);
if((tag_name=C.tagName.toUpperCase())&&(tag_name=="INPUT"||tag_name=="SELECT"||tag_name=="OPTION"||tag_name=="BUTTON"||tag_name=="TEXTAREA")){return 
}var B=[Event.pointerX(A),Event.pointerY(A)];
var D=this.element.cumulativeOffset();
this.offset=[0,1].map(function(E){return(B[E]-D[E])
});
Draggables.activate(this);
Event.stop(A)
}},startDrag:function(B){this.dragging=true;
if(!this.delta){this.delta=this.currentDelta()
}if(this.options.zindex){this.originalZ=parseInt(Element.getStyle(this.element,"z-index")||0);
this.element.style.zIndex=this.options.zindex
}if(this.options.ghosting){this._clone=this.element.cloneNode(true);
this._originallyAbsolute=(this.element.getStyle("position")=="absolute");
if(!this._originallyAbsolute){Position.absolutize(this.element)
}this.element.parentNode.insertBefore(this._clone,this.element)
}if(this.options.scroll){if(this.options.scroll==window){var A=this._getWindowScroll(this.options.scroll);
this.originalScrollLeft=A.left;
this.originalScrollTop=A.top
}else{this.originalScrollLeft=this.options.scroll.scrollLeft;
this.originalScrollTop=this.options.scroll.scrollTop
}}Draggables.notify("onStart",this,B);
if(this.options.starteffect){this.options.starteffect(this.element)
}},updateDrag:function(event,pointer){if(!this.dragging){this.startDrag(event)
}if(!this.options.quiet){Position.prepare();
Droppables.show(pointer,this.element)
}Draggables.notify("onDrag",this,event);
this.draw(pointer);
if(this.options.change){this.options.change(this)
}if(this.options.scroll){this.stopScrolling();
var p;
if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){p=[left,top,left+width,top+height]
}}else{p=Position.page(this.options.scroll);
p[0]+=this.options.scroll.scrollLeft+Position.deltaX;
p[1]+=this.options.scroll.scrollTop+Position.deltaY;
p.push(p[0]+this.options.scroll.offsetWidth);
p.push(p[1]+this.options.scroll.offsetHeight)
}var speed=[0,0];
if(pointer[0]<(p[0]+this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[0]+this.options.scrollSensitivity)
}if(pointer[1]<(p[1]+this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[1]+this.options.scrollSensitivity)
}if(pointer[0]>(p[2]-this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[2]-this.options.scrollSensitivity)
}if(pointer[1]>(p[3]-this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[3]-this.options.scrollSensitivity)
}this.startScrolling(speed)
}if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}Event.stop(event)
},finishDrag:function(B,E){this.dragging=false;
if(this.options.quiet){Position.prepare();
var D=[Event.pointerX(B),Event.pointerY(B)];
Droppables.show(D,this.element)
}if(this.options.ghosting){if(!this._originallyAbsolute){Position.relativize(this.element)
}delete this._originallyAbsolute;
Element.remove(this._clone);
this._clone=null
}var F=false;
if(E){F=Droppables.fire(B,this.element);
if(!F){F=false
}}if(F&&this.options.onDropped){this.options.onDropped(this.element)
}Draggables.notify("onEnd",this,B);
var A=this.options.revert;
if(A&&Object.isFunction(A)){A=A(this.element)
}var C=this.currentDelta();
if(A&&this.options.reverteffect){if(F==0||A!="failure"){this.options.reverteffect(this.element,C[1]-this.delta[1],C[0]-this.delta[0])
}}else{this.delta=C
}if(this.options.zindex){this.element.style.zIndex=this.originalZ
}if(this.options.endeffect){this.options.endeffect(this.element)
}Draggables.deactivate(this);
Droppables.reset()
},keyPress:function(A){if(A.keyCode!=Event.KEY_ESC){return 
}this.finishDrag(A,false);
Event.stop(A)
},endDrag:function(A){if(!this.dragging){return 
}this.stopScrolling();
this.finishDrag(A,true);
Event.stop(A)
},draw:function(A){var F=this.element.cumulativeOffset();
if(this.options.ghosting){var C=Position.realOffset(this.element);
F[0]+=C[0]-Position.deltaX;
F[1]+=C[1]-Position.deltaY
}var E=this.currentDelta();
F[0]-=E[0];
F[1]-=E[1];
if(this.options.scroll&&(this.options.scroll!=window&&this._isScrollChild)){F[0]-=this.options.scroll.scrollLeft-this.originalScrollLeft;
F[1]-=this.options.scroll.scrollTop-this.originalScrollTop
}var D=[0,1].map(function(G){return(A[G]-F[G]-this.offset[G])
}.bind(this));
if(this.options.snap){if(Object.isFunction(this.options.snap)){D=this.options.snap(D[0],D[1],this)
}else{if(Object.isArray(this.options.snap)){D=D.map(function(G,H){return(G/this.options.snap[H]).round()*this.options.snap[H]
}.bind(this))
}else{D=D.map(function(G){return(G/this.options.snap).round()*this.options.snap
}.bind(this))
}}}var B=this.element.style;
if((!this.options.constraint)||(this.options.constraint=="horizontal")){B.left=D[0]+"px"
}if((!this.options.constraint)||(this.options.constraint=="vertical")){B.top=D[1]+"px"
}if(B.visibility=="hidden"){B.visibility=""
}},stopScrolling:function(){if(this.scrollInterval){clearInterval(this.scrollInterval);
this.scrollInterval=null;
Draggables._lastScrollPointer=null
}},startScrolling:function(A){if(!(A[0]||A[1])){return 
}this.scrollSpeed=[A[0]*this.options.scrollSpeed,A[1]*this.options.scrollSpeed];
this.lastScrolled=new Date();
this.scrollInterval=setInterval(this.scroll.bind(this),10)
},scroll:function(){var current=new Date();
var delta=current-this.lastScrolled;
this.lastScrolled=current;
if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){if(this.scrollSpeed[0]||this.scrollSpeed[1]){var d=delta/1000;
this.options.scroll.scrollTo(left+d*this.scrollSpeed[0],top+d*this.scrollSpeed[1])
}}}else{this.options.scroll.scrollLeft+=this.scrollSpeed[0]*delta/1000;
this.options.scroll.scrollTop+=this.scrollSpeed[1]*delta/1000
}Position.prepare();
Droppables.show(Draggables._lastPointer,this.element);
Draggables.notify("onDrag",this);
if(this._isScrollChild){Draggables._lastScrollPointer=Draggables._lastScrollPointer||$A(Draggables._lastPointer);
Draggables._lastScrollPointer[0]+=this.scrollSpeed[0]*delta/1000;
Draggables._lastScrollPointer[1]+=this.scrollSpeed[1]*delta/1000;
if(Draggables._lastScrollPointer[0]<0){Draggables._lastScrollPointer[0]=0
}if(Draggables._lastScrollPointer[1]<0){Draggables._lastScrollPointer[1]=0
}this.draw(Draggables._lastScrollPointer)
}if(this.options.change){this.options.change(this)
}},_getWindowScroll:function(w){var T,L,W,H;
with(w.document){if(w.document.documentElement&&documentElement.scrollTop){T=documentElement.scrollTop;
L=documentElement.scrollLeft
}else{if(w.document.body){T=body.scrollTop;
L=body.scrollLeft
}}if(w.innerWidth){W=w.innerWidth;
H=w.innerHeight
}else{if(w.document.documentElement&&documentElement.clientWidth){W=documentElement.clientWidth;
H=documentElement.clientHeight
}else{W=body.offsetWidth;
H=body.offsetHeight
}}}return{top:T,left:L,width:W,height:H}
}});
Draggable._dragging={};
var SortableObserver=Class.create({initialize:function(B,A){this.element=$(B);
this.observer=A;
this.lastValue=Sortable.serialize(this.element)
},onStart:function(){this.lastValue=Sortable.serialize(this.element)
},onEnd:function(){Sortable.unmark();
if(this.lastValue!=Sortable.serialize(this.element)){this.observer(this.element)
}}});
var Sortable={SERIALIZE_RULE:/^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,sortables:{},_findRootElement:function(A){while(A.tagName.toUpperCase()!="BODY"){if(A.id&&Sortable.sortables[A.id]){return A
}A=A.parentNode
}},options:function(A){A=Sortable._findRootElement($(A));
if(!A){return 
}return Sortable.sortables[A.id]
},destroy:function(A){A=$(A);
var B=Sortable.sortables[A.id];
if(B){Draggables.removeObserver(B.element);
B.droppables.each(function(C){Droppables.remove(C)
});
B.draggables.invoke("destroy");
delete Sortable.sortables[B.element.id]
}},create:function(C){C=$(C);
var B=Object.extend({element:C,tag:"li",dropOnEmpty:false,tree:false,treeTag:"ul",overlap:"vertical",constraint:"vertical",containment:C,handle:false,only:false,delay:0,hoverclass:null,ghosting:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,format:this.SERIALIZE_RULE,elements:false,handles:false,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction},arguments[1]||{});
this.destroy(C);
var A={revert:true,quiet:B.quiet,scroll:B.scroll,scrollSpeed:B.scrollSpeed,scrollSensitivity:B.scrollSensitivity,delay:B.delay,ghosting:B.ghosting,constraint:B.constraint,handle:B.handle};
if(B.starteffect){A.starteffect=B.starteffect
}if(B.reverteffect){A.reverteffect=B.reverteffect
}else{if(B.ghosting){A.reverteffect=function(F){F.style.top=0;
F.style.left=0
}
}}if(B.endeffect){A.endeffect=B.endeffect
}if(B.zindex){A.zindex=B.zindex
}var D={overlap:B.overlap,containment:B.containment,tree:B.tree,hoverclass:B.hoverclass,onHover:Sortable.onHover};
var E={onHover:Sortable.onEmptyHover,overlap:B.overlap,containment:B.containment,hoverclass:B.hoverclass};
Element.cleanWhitespace(C);
B.draggables=[];
B.droppables=[];
if(B.dropOnEmpty||B.tree){Droppables.add(C,E);
B.droppables.push(C)
}(B.elements||this.findElements(C,B)||[]).each(function(H,F){var G=B.handles?$(B.handles[F]):(B.handle?$(H).select("."+B.handle)[0]:H);
B.draggables.push(new Draggable(H,Object.extend(A,{handle:G})));
Droppables.add(H,D);
if(B.tree){H.treeNode=C
}B.droppables.push(H)
});
if(B.tree){(Sortable.findTreeElements(C,B)||[]).each(function(F){Droppables.add(F,E);
F.treeNode=C;
B.droppables.push(F)
})
}this.sortables[C.identify()]=B;
Draggables.addObserver(new SortableObserver(C,B.onUpdate))
},findElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.tag)
},findTreeElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.treeTag)
},onHover:function(E,D,A){if(Element.isParent(D,E)){return 
}if(A>0.33&&A<0.66&&Sortable.options(D).tree){return 
}else{if(A>0.5){Sortable.mark(D,"before");
if(D.previousSibling!=E){var B=E.parentNode;
E.style.visibility="hidden";
D.parentNode.insertBefore(E,D);
if(D.parentNode!=B){Sortable.options(B).onChange(E)
}Sortable.options(D.parentNode).onChange(E)
}}else{Sortable.mark(D,"after");
var C=D.nextSibling||null;
if(C!=E){var B=E.parentNode;
E.style.visibility="hidden";
D.parentNode.insertBefore(E,C);
if(D.parentNode!=B){Sortable.options(B).onChange(E)
}Sortable.options(D.parentNode).onChange(E)
}}}},onEmptyHover:function(E,G,H){var I=E.parentNode;
var A=Sortable.options(G);
if(!Element.isParent(G,E)){var F;
var C=Sortable.findElements(G,{tag:A.tag,only:A.only});
var B=null;
if(C){var D=Element.offsetSize(G,A.overlap)*(1-H);
for(F=0;
F<C.length;
F+=1){if(D-Element.offsetSize(C[F],A.overlap)>=0){D-=Element.offsetSize(C[F],A.overlap)
}else{if(D-(Element.offsetSize(C[F],A.overlap)/2)>=0){B=F+1<C.length?C[F+1]:null;
break
}else{B=C[F];
break
}}}}G.insertBefore(E,B);
Sortable.options(I).onChange(E);
A.onChange(E)
}},unmark:function(){if(Sortable._marker){Sortable._marker.hide()
}},mark:function(B,A){var D=Sortable.options(B.parentNode);
if(D&&!D.ghosting){return 
}if(!Sortable._marker){Sortable._marker=($("dropmarker")||Element.extend(document.createElement("DIV"))).hide().addClassName("dropmarker").setStyle({position:"absolute"});
document.getElementsByTagName("body").item(0).appendChild(Sortable._marker)
}var C=B.cumulativeOffset();
Sortable._marker.setStyle({left:C[0]+"px",top:C[1]+"px"});
if(A=="after"){if(D.overlap=="horizontal"){Sortable._marker.setStyle({left:(C[0]+B.clientWidth)+"px"})
}else{Sortable._marker.setStyle({top:(C[1]+B.clientHeight)+"px"})
}}Sortable._marker.show()
},_tree:function(E,B,F){var D=Sortable.findElements(E,B)||[];
for(var C=0;
C<D.length;
++C){var A=D[C].id.match(B.format);
if(!A){continue
}var G={id:encodeURIComponent(A?A[1]:null),element:E,parent:F,children:[],position:F.children.length,container:$(D[C]).down(B.treeTag)};
if(G.container){this._tree(G.container,B,G)
}F.children.push(G)
}return F
},tree:function(D){D=$(D);
var C=this.options(D);
var B=Object.extend({tag:C.tag,treeTag:C.treeTag,only:C.only,name:D.id,format:C.format},arguments[1]||{});
var A={id:null,parent:null,children:[],container:D,position:0};
return Sortable._tree(D,B,A)
},_constructIndex:function(B){var A="";
do{if(B.id){A="["+B.position+"]"+A
}}while((B=B.parent)!=null);
return A
},sequence:function(B){B=$(B);
var A=Object.extend(this.options(B),arguments[1]||{});
return $(this.findElements(B,A)||[]).map(function(C){return C.id.match(A.format)?C.id.match(A.format)[1]:""
})
},setSequence:function(B,C){B=$(B);
var A=Object.extend(this.options(B),arguments[2]||{});
var D={};
this.findElements(B,A).each(function(E){if(E.id.match(A.format)){D[E.id.match(A.format)[1]]=[E,E.parentNode]
}E.parentNode.removeChild(E)
});
C.each(function(E){var F=D[E];
if(F){F[1].appendChild(F[0]);
delete D[E]
}})
},serialize:function(C){C=$(C);
var B=Object.extend(Sortable.options(C),arguments[1]||{});
var A=encodeURIComponent((arguments[1]&&arguments[1].name)?arguments[1].name:C.id);
if(B.tree){return Sortable.tree(C,arguments[1]).children.map(function(D){return[A+Sortable._constructIndex(D)+"[id]="+encodeURIComponent(D.id)].concat(D.children.map(arguments.callee))
}).flatten().join("&")
}else{return Sortable.sequence(C,arguments[1]).map(function(D){return A+"[]="+encodeURIComponent(D)
}).join("&")
}}};
Element.isParent=function(B,A){if(!B.parentNode||B==A){return false
}if(B.parentNode==A){return true
}return Element.isParent(B.parentNode,A)
};
Element.findChildren=function(D,B,A,C){if(!D.hasChildNodes()){return null
}C=C.toUpperCase();
if(B){B=[B].flatten()
}var E=[];
$A(D.childNodes).each(function(G){if(G.tagName&&G.tagName.toUpperCase()==C&&(!B||(Element.classNames(G).detect(function(H){return B.include(H)
})))){E.push(G)
}if(A){var F=Element.findChildren(G,B,A,C);
if(F){E.push(F)
}}});
return(E.length>0?E.flatten():[])
};
Element.offsetSize=function(A,B){return A["offset"+((B=="vertical"||B=="height")?"Height":"Width")]
};