define(["jquery"],function(a){a.store=function(){var a={},b=window,c=b.document,d="localStorage",e="globalStorage",f,g=/(\s|\/)/g;a.set=function(a,b){},a.get=function(a){},a.remove=function(a){},a.clear=function(){},a.transact=function(b,c){var d=a.get(b);typeof d=="undefined"&&(d={}),c(d),a.set(b,d)},a.serialize=function(a){return JSON.stringify(a)},a.deserialize=function(a){return typeof a!="string"?undefined:JSON.parse(a)};if(d in b&&b[d])f=b[d],a.set=function(b,c){f.setItem(b,a.serialize(c))},a.get=function(b){return a.deserialize(f.getItem(b))},a.remove=function(a){f.removeItem(a)},a.clear=function(){f.clear()};else if(e in b&&b[e])f=b[e][b.location.hostname],a.set=function(b,c){f[b]=a.serialize(c)},a.get=function(b){return a.deserialize(f[b]&&f[b].value)},a.remove=function(a){delete f[a]},a.clear=function(){for(var a in f)delete f[a]};else if(c.documentElement.addBehavior){var f=c.createElement("div");function h(b){return function(){var e=Array.prototype.slice.call(arguments,0);e.unshift(f),e[1]&&e[1].match&&e[1].match(g)&&(e[1]=e[1].replace(g,"")),c.body.appendChild(f),f.addBehavior("#default#userData"),f.load(d);var h=b.apply(a,e);return c.body.removeChild(f),h}}a.set=h(function(b,c,e){b.setAttribute(c,a.serialize(e)),b.save(d)}),a.get=h(function(b,c){return a.deserialize(b.getAttribute(c))}),a.remove=h(function(a,b){a.removeAttribute(b),a.save(d)}),a.clear=h(function(a){var b=a.XMLDocument.documentElement.attributes;a.load(d);for(var c=0,e;e=b[c];c++)a.removeAttribute(e.name);a.save(d)})}return a}()})