tinyMCEPopup.requireLangPack();var PasteTextDialog={init:function(){this.resize()},insert:function(){var a=tinyMCEPopup.dom.encode(document.getElementById("content").value),b;document.getElementById("linebreaks").checked&&(b=a.split(/\r?\n/),b.length>1&&(a="",tinymce.each(b,function(b){a+="<p>"+b+"</p>"}))),tinyMCEPopup.editor.execCommand("mceInsertClipboardContent",!1,{content:a}),tinyMCEPopup.close()},resize:function(){var a=tinyMCEPopup.dom.getViewPort(window),b;b=document.getElementById("content"),b.style.width=a.w-20+"px",b.style.height=a.h-90+"px"}};tinyMCEPopup.onInit.add(PasteTextDialog.init,PasteTextDialog)