define(["jquery","vendor/jquery.scrollTo","jqueryui/dialog"],function(a){a.widget("instructure.dialog",a.ui.dialog,{options:{modal:!0}}),a.each(["prop","attr"],function(b,c){a[c+"Hooks"].disabled=a.extend(a[c+"Hooks"].disabled,{set:function(b,c,d){return a(b).toggleClass("disabled",!!c),b[c?"setAttribute":"removeAttribute"]("disabled","disabled"),"disabled"in b&&(b.disabled=!!c),c}})});var b=a.parseJSON;a.parseJSON=function(){if(arguments[0])try{var c=arguments[0].replace(/^while\(1\);/,"");arguments[0]=c}catch(d){}return b.apply(a,arguments)},a.ajaxSettings.converters["text json"]=a.parseJSON,a.attrHooks.method=a.extend(a.attrHooks.method,{set:function(b,c){var d=c;c=c.toUpperCase()==="GET"?"GET":"POST";if(c==="POST"){var e=a(b).find("input[name='_method']");e.length||(e=a("<input type='hidden' name='_method'/>").prependTo(b)),e.val(d)}return b.setAttribute("method",c),c}}),a.fn.originalScrollTop=a.fn.scrollTop,a.fn.scrollTop=function(){return this.selector=="html,body"&&arguments.length===0&&console.error("$('html,body').scrollTop() is not cross-browser compatible... use $.windowScrollTop() instead"),a.fn.originalScrollTop.apply(this,arguments)},a.windowScrollTop=function(){return(a.browser.safari?a("body"):a("html")).scrollTop()}})