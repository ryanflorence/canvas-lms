(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["jquery","compiled/util/objectCollection","jst/courseList/wrapper","jst/courseList/content","jquery.ajaxJSON"],function(b,c,d,e){var f;return f=function(){function f(a,c,d){this.options=b.extend({},this.options,d),this.appendTarget=b(this.options.appendTarget),this.element=b(a),this.targetList=this.element.find("> ul"),this.wrapper=b(this.options.wrapper({})),this.sourceList=this.wrapper.find("> ul"),this.contentTemplate=this.options.content,this.ghost=b("<ul/>").addClass("customListGhost"),this.requests={add:{},remove:{}},this.doc=b(document.body),this.attach(),this.setItems(c),this.options.autoOpen&&this.open()}return f.prototype.options={animationDuration:200,model:"Course",dataAttribute:"id",wrapper:d,content:e,url:"/favorites",appendTarget:"body",resetCount:12,onToggle:!1},f.prototype.open=function(){return this.wrapper.appendTo(this.appendTarget).show(),setTimeout(a(function(){var a;return this.element.addClass("customListEditing"),typeof (a=this.options).onToggle=="function"?a.onToggle(!0):void 0},this),1)},f.prototype.close=function(){var b;this.wrapper.hide(0,a(function(){return this.teardown()},this)),this.element.removeClass("customListEditing"),typeof (b=this.options).onToggle=="function"&&b.onToggle(!1);if(this.pinned.length===0)return this.resetList()},f.prototype.attach=function(){return this.element.delegate(".customListOpen","click",b.proxy(this,"open")),this.wrapper.delegate(".customListClose","click",b.proxy(this,"close")),this.wrapper.delegate(".customListRestore","click",b.proxy(this,"reset")),this.wrapper.delegate("a","click.customListTeardown",function(a){return a.preventDefault()}),this.wrapper.delegate(".customListItem","click.customListTeardown",b.proxy(this,"sourceClickHandler"))},f.prototype.teardown=function(){return this.wrapper.detach()},f.prototype.add=function(a,b){var c,d,e,f;return e=this.items.findBy("id",a),c=b.clone().hide(),e.element=c,b.addClass("on"),this.pinned.push(e),this.pinned.sortBy("shortName"),d=this.pinned.indexOf(e)+1,f=this.targetList.find("li:nth-child("+d+")"),f.length!==0?c.insertBefore(f):c.appendTo(this.targetList),c.slideDown(this.options.animationDuration),this.animateGhost(b,c),this.onAdd(e)},f.prototype.animateGhost=function(b,c){var d,e,f;return e=b.offset(),f=c.offset(),d=b.clone(),e.position="absolute",this.ghost.append(d),this.ghost.appendTo(this.doc).css(e).animate(f,this.options.animationDuration,a(function(){return this.ghost.detach().empty()},this))},f.prototype.remove=function(b,c){return c.removeClass("on"),this.animating=!0,this.onRemove(b),b.element.slideUp(this.options.animationDuration,a(function(){return b.element.remove(),this.pinned.eraseBy("id",b.id),this.animating=!1},this))},f.prototype.abortAll=function(){var a,b,c,d,e;c=this.requests.add;for(a in c)b=c[a],b.abort();d=this.requests.remove,e=[];for(a in d)b=d[a],e.push(b.abort());return e},f.prototype.reset=function(){var c;return this.abortAll(),c=a(function(){return delete this.requests.reset},this),this.requests.reset=b.ajaxJSON(this.options.url+"/"+this.options.model,"DELETE",{},c,c),this.resetList()},f.prototype.resetList=function(){var a,b;return a=this.items.slice(0,this.options.resetCount),b=this.contentTemplate({items:a}),this.targetList.empty().html(b),this.setPinned()},f.prototype.onAdd=function(c){var d,e,f,g;if(this.requests.remove[c.id]){this.requests.remove[c.id].abort();return}return g=a(function(){var a;return a=[].slice.call(arguments),a.unshift(c.id),this.addSuccess.apply(this,a)},this),e=a(function(){var a;return a=[].slice.call(arguments),a.unshift(c.id),this.addError.apply(this,a)},this),d={favorite:{context_type:this.options.model,context_id:c.id}},f=b.ajaxJSON(this.options.url,"POST",d,g,e),this.requests.add[c.id]=f},f.prototype.onRemove=function(c){var d,e,f,g;if(this.requests.add[c.id]){this.requests.add[c.id].abort();return}return f=a(function(){var a;return a=[].slice.call(arguments),a.unshift(c.id),this.removeSuccess.apply(this,a)},this),d=a(function(){var a;return a=[].slice.call(arguments),a.unshift(c.id),this.removeError.apply(this,a)},this),g=this.options.url+"/"+c.id,e=b.ajaxJSON(g,"DELETE",{context_type:this.options.model},f,d),this.requests.remove[c.id]=e},f.prototype.addSuccess=function(a){return delete this.requests.add[a]},f.prototype.addError=function(a){return delete this.requests.add[a]},f.prototype.removeSuccess=function(a){return delete this.requests.remove[a]},f.prototype.removeError=function(a){return delete this.requests.remove[a]},f.prototype.setItems=function(a){var b;return this.items=c(a),this.items.sortBy("shortName"),b=this.contentTemplate({items:this.items}),this.sourceList.html(b),this.setPinned()},f.prototype.setPinned=function(){var d,e,f,g,h,i;this.pinned=c([]),this.element.find("> ul > li").each(a(function(a,c){var d,e;c=b(c),d=c.data("id"),e=this.items.findBy("id",d);if(!e)return;return e.element=c,this.pinned.push(e)},this)),this.wrapper.find("ul > li").removeClass("on"),h=this.pinned,i=[];for(f=0,g=h.length;f<g;f++)d=h[f],e=this.wrapper.find("ul > li[data-id="+d.id+"]"),i.push(e.addClass("on"));return i},f.prototype.sourceClickHandler=function(a){return this.checkElement(b(a.currentTarget))},f.prototype.checkElement=function(a){var b,c;if(this.animating||this.requests.reset)return;return b=a.data("id"),c=this.pinned.findBy("id",b),c?this.remove(c,a):this.add(b,a)},f}()})}).call(this)