define(["jquery","str/htmlEscape","jquery.instructure_misc_helpers"],function(a,b){a.fn.fillTemplateData=function(c){if(this.length&&c){c.iterator&&this.find("*").andSelf().each(function(){var b=a(this);a.each(["name","id","class"],function(a,d){b.attr(d)&&b.attr(d,b.attr(d).replace(/-iterator-/,c.iterator))})}),c.id&&this.attr("id",c.id);var d=!1;if(c.data)for(var e in c.data){if(c.except&&a.inArray(e,c.except)!=-1)continue;c.data[e]&&c.dataValues&&a.inArray(e,c.dataValues)!=-1&&this.data(e,c.data[e].toString());var f=this.find("."+e),g=c.avoid||"";f.each(function(){var f=a(this);if(f.length>0&&f.closest(g).length===0){if(typeof c.data[e]=="undefined"||c.data[e]===null)c.data[e]="";if(c.htmlValues&&a.inArray(e,c.htmlValues)!=-1)f.html(c.data[e].toString()),f.hasClass("user_content")&&(d=!0,f.removeClass("enhanced"),f.data("unenhanced_content_html",c.data[e].toString()));else if(f[0].tagName.toUpperCase()=="INPUT")f.val(c.data[e]);else try{var h=c.data[e].toString();f.html(b(h))}catch(i){}}})}c.hrefValues&&c.data&&this.find("a,span[rel]").each(function(){var b=a(this),d,e,f;for(var g in c.hrefValues){var h=c.hrefValues[g];if(d=b.attr("href")){var i=a.replaceTags(d,h,encodeURIComponent(c.data[h])),j=b.text()==b.html()?b.text():null;d!=i&&(b.attr("href",i),j&&b.text(j))}(e=b.attr("rel"))&&b.attr("rel",a.replaceTags(e,h,c.data[h])),(f=b.attr("name"))&&b.attr("name",a.replaceTags(f,h,c.data[h]))}}),d&&a(document).triggerHandler("user_content_change")}return this},a.fn.fillTemplateData.defaults={htmlValues:null,hrefValues:null},a.fn.getTemplateData=function(b){if(!this.length||!b)return{};var c={},d,e;if(b.textValues)for(d in b.textValues){var f=this.find("."+b.textValues[d].replace(/\[/g,"\\[").replace(/\]/g,"\\]")+":first");e=a.trim(f.text()),f.html()=="&nbsp;"&&(e=""),e.length==1&&e.charCodeAt(0)==160&&(e=""),c[b.textValues[d]]=e}if(b.dataValues)for(d in b.dataValues){var e=this.data(b.dataValues[d]);e&&(c[b.dataValues[d]]=e)}if(b.htmlValues)for(d in b.htmlValues){var g=this.find("."+b.htmlValues[d].replace(/\[/g,"\\[").replace(/\]/g,"\\]")+":first");e=null,g.hasClass("user_content")&&g.data("unenhanced_content_html")?e=g.data("unenhanced_content_html"):e=a.trim(g.html()),c[b.htmlValues[d]]=e}return c},a.fn.getTemplateValue=function(b,c){var d=a.extend({},c,{textValues:[b]});return this.getTemplateData(d)[b]}})