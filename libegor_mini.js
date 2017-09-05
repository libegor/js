/* libegor v1.2 mini | Copyright 2017 libegor.ru | http://www.apache.org/licenses/LICENSE-2.0 */
var libegor={Class:{},moveparam:function(a,b){for(var key in b)
    if(typeof b[key]=='string'||typeof b[key]=='number'||typeof b[key]=='boolean'||typeof b[key]=='function'||b[key].obj||b[key].getFullYear||key=='ctx'){a[key]=b[key];}else if(typeof b[key]=='object'){if(!a[key])a[key]={};libegor.moveparam(a[key],b[key]);}},isset:function(a){if(typeof a=='undefined')return 0;return 1;},add:function(){if(arguments.length==0)return 0;else if(arguments.length==1){var parent=this;var type=arguments[0];}
else if(arguments.length==2&&typeof arguments[0]=='object'){var parent=arguments[0];var type=arguments[1];}
else if(arguments.length==2&&typeof arguments[0]!='object'&&typeof arguments[1]=='object'){var parent=this;var type=arguments[0];var param=arguments[1];}
else if(arguments.length==2){var parent=this;var id=arguments[0];var type=arguments[1];}
else if(arguments.length==3&&typeof arguments[0]=='object'){var parent=arguments[0];var type=arguments[1];var param=arguments[2];}
else if(arguments.length==3){var parent=this;var id=arguments[0];var type=arguments[1];var param=arguments[2];}
    if(type=='text')var obj=document.createTextNode(param.text);else var obj=document.createElement(type);if(param&&param.svg)var obj=document.createElementNS('http://www.w3.org/2000/svg',type);obj.parent=parent;obj.obj={};obj.el={};obj.set=function(att,value){this.setAttribute(att,value);return this;}
    obj.get=function(att){return this.getAttribute(att);}
    obj.has=function(att){return this.hasAttribute(att);}
    obj.rem=function(att){this.removeAttribute(att);return this;}
    obj.push=function(obj){var i=0;while(this.el[i])i++;obj.obj.key=i;return this.el[i]=obj;}
    obj.pushList=function(obj){var i=0;while(this.el.list.el[i])i++;obj.obj.key=i;return this.el.list.el[i]=obj;}
    obj.addClass=function(c){if(libegor.isset(this.classList))this.classList.add(c);return this;}
    obj.delClass=function(c){if(libegor.isset(this.classList))this.classList.remove(c);return this;}
    obj.ifClass=function(c){if(!libegor.isset(this.classList))return false;return this.classList.contains(c);}
    obj.hide=function(){if(libegor.isset(this.classList))this.addClass('hidden');return this;}
    obj.show=function(){if(libegor.isset(obj.classList))this.delClass('hidden');return this;}
    obj.del=function(){if(this.parentNode&&this.parentNode.removeChild)this.parentNode.removeChild(this);}
    obj.add=libegor.add;if(param&&param.before)param.before.parentNode.insertBefore(obj,param.before);else if(param&&param.replace)param.replace.parentNode.replaceChild(obj,param.replace);else if(param&&param.after){if(param.after.nextSibling)param.after.parentNode.insertBefore(obj,param.after.nextSibling);else param.after.parentNode.appendChild(obj);}
    else obj.parent.appendChild(obj);if(param&&type!='text'){for(var key in param){if(key=='base'||key=='baseAfter'||key=='before'||key=='replace'||key=='after'||key=='reconstruct'||key=='svg'||key=='push'||key=='style'){if(key=='svg'&&typeof param[key]=='object'){obj[key]=param[key];obj.draw=libegor.svg.draw;obj.onmouseenter=function(){if(this.svg.obj.drag){this.set('opacity',0.5);this.onmouseleave=function(){this.set('opacity',1);}}}}else if(key=='style'){obj.style.cssText=param[key];}}else if(key=='checked'){if(param[key]==true)obj.checked=true;}else if(key=='text'){obj.innerHTML=param[key];}else if(typeof param[key]=='string'||typeof param[key]=='number'||typeof param[key]=='boolean'){obj.setAttribute(key,param[key]);}else if(typeof param[key]=='object'||typeof param[key]=='function'){if(key=='onkeyenter')obj['onkeydown']=function(e){if(this._onkeydown)this._onkeydown();if(e.keyCode==13&&this.onkeyenter)this.onkeyenter();};obj[key]=param[key];}}
        if(param.base){if(typeof param.base=='function'){obj.base=param.base;obj.base();if(obj.construct)obj.construct();}else{for(var key in param.base){if(param.base[key].Class)var Class=param.base[key].Class;else if(param.base[key].class)var Class=param.base[key].class;if(typeof Class=='function'){obj.base=Class;if(param.base[key].param)obj.base(param.base[key].param);else obj.base();}else if(typeof Class=='object')for(var kec in Class)obj[kec]=Class[kec];if(obj.construct)obj.construct();}}
            delete param.base;}}
    if(libegor.isset(id)&&typeof id!='object')obj.parent.el[id]=obj;else if(param&&param.push){var i=0;while(param.push[i])i++;param.push[i]=obj;}
    if(obj.construct)obj.construct();if(obj.draw)obj.draw();return obj;},searchInArray:function(array,param){if(typeof param=='object'){Inner:for(var i in array){for(key in param){if(typeof array[i][key]=='undefined')continue Inner;if(array[i][key]!=param[key])continue Inner;}
    if(arguments[2]){for(key in arguments[2]){if(typeof array[i][key]!='undefined'&&array[i][key]==arguments[2][key])continue Inner;}}
    return array[i];}}else{for(var i in array)if(array[i]==param)return array[i];}
    return 0;},searchArrayInArray:function(array,param){var ret=[];if(typeof param=='object'){Inner:for(var i in array){for(key in param){if(typeof array[i][key]=='undefined')continue Inner;if(array[i][key]!=param[key])continue Inner;}
    if(arguments[2]){for(key in arguments[2]){if(typeof array[i][key]!='undefined'&&array[i][key]==arguments[2][key])continue Inner;}}
    ret.push(array[i]);}}else{for(var i in array)if(array[i]==param)ret.push(array[i]);}
    return ret;}};