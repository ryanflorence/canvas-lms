require(["require","jquery","jquery.instructure_jquery_patches","mathquill"],function(a,b){function c(a){var d="",e;for(var f=0;a[f];f++)e=a[f],e.nodeType===3||e.nodeType===4?d+=e.nodeValue:e.nodeName=="IMG"&&e.className=="equation_image"?d+=b(e).attr("alt"):e.nodeType!==8&&(d+=c(e.childNodes));return d}b("<link/>",{rel:"stylesheet",type:"text/css",href:location.protocol+"//"+location.host+"/stylesheets/static/mathquill.css"}).appendTo("head"),b("<span class='mathquill-embedded-latex' style='position: absolute; z-index: -1; top: 0; left: 0; width: 0; height: 0; overflow: hidden;'>a</span>").appendTo("body").mathquill(),tinymce.create("tinymce.plugins.InstructureEquation",{init:function(a,d){a.addCommand("instructureEquation",function(){var d=b("<span>"+a.selection.getContent()+"</span>"),e=c(d).replace(/^\s+|\s+$/g,"");e||(e="1 + 1");var f=b("#"+a.id),g=b("#instructure_equation_prompt");if(g.length==0){var g=b(document.createElement("div"));g.append("Use the equation editor below (or type/paste in your equation in LaTeX format). <form id='instructure_equation_prompt_form' style='margin-top: 5px;'><span class='mathquill-editor' style='width: auto; font-size: 1.5em'></span><div class='actions' style='padding-top: 10px'><button type='submit' class='button' style='float: right'>Insert Equation</button></div></form>"),g.find("#instructure_equation_prompt_form").submit(function(a){var c=g.data("editor");a.preventDefault(),a.stopPropagation();var d=b(this).find(".mathquill-editor").mathquill("latex"),e="/equation_images/"+encodeURIComponent(escape(d)),f=b(document.createElement("div")),h=b(document.createElement("img"));h.attr("src",e).attr("alt",d).attr("title",d).attr("class","equation_image"),f.append(h),g.data("restore_caret")(),c.editorBox("insert_code",f.html()),g.dialog("close")}),g.attr("id","instructure_equation_prompt"),b("body").append(g)}var h=a.selection.getBookmark();g.data("restore_caret",function(){a.selection.moveToBookmark(h)}),g.data("editor",f),g.dialog("close").dialog({autoOpen:!1,width:690,minWidth:690,minHeight:300,resizable:!0,height:"auto",title:"Embed Math Equation"}).dialog("open"),g.find(".mathquill-editor").mathquill("revert").addClass("mathquill-editor").mathquill("editor").mathquill("write",e).focus()}),a.addButton("instructure_equation",{title:"Insert Math Equation",cmd:"instructureEquation",image:d+"/img/button.gif"}),a.onNodeChange.add(function(a,b,c){c.nodeName=="IMG"&&c.className=="equation_image"?b.setActive("instructure_equation",!0):b.setActive("instructure_equation",!1)})},getInfo:function(){return{longname:"InstructureEquation",author:"Brian Whitmer",authorurl:"http://www.instructure.com",infourl:"http://www.instructure.com",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}),tinymce.PluginManager.add("instructure_equation",tinymce.plugins.InstructureEquation)})