(function(){var a=tinymce.dom.Event,b=tinymce.each,c=tinymce.DOM;tinymce.create("tinymce.plugins.ContextMenu",{init:function(b){function g(b,d){f=0;if(d&&d.button==2){f=d.ctrlKey;return}c._menu&&(c._menu.removeAll(),c._menu.destroy(),a.remove(b.getDoc(),"click",g))}var c=this,d,e,f;c.editor=b,e=b.settings.contextmenu_never_use_native,c.onContextMenu=new tinymce.util.Dispatcher(this),d=b.onContextMenu.add(function(b,d){if((f!==0?f:d.ctrlKey)&&!e)return;a.cancel(d),d.target.nodeName=="IMG"&&b.selection.select(d.target),c._getMenu(b).showMenu(d.clientX||d.pageX,d.clientY||d.pageY),a.add(b.getDoc(),"click",function(a){g(b,a)}),b.nodeChanged()}),b.onRemove.add(function(){c._menu&&c._menu.removeAll()}),b.onMouseDown.add(g),b.onKeyDown.add(g),b.onKeyDown.add(function(b,c){c.shiftKey&&!c.ctrlKey&&!c.altKey&&c.keyCode===121&&(a.cancel(c),d(b,c))})},getInfo:function(){return{longname:"Contextmenu",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/contextmenu",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_getMenu:function(a){var b=this,d=b._menu,e=a.selection,f=e.isCollapsed(),g=e.getNode()||a.getBody(),h,i;d&&(d.removeAll(),d.destroy()),i=c.getPos(a.getContentAreaContainer()),d=a.controlManager.createDropMenu("contextmenu",{offset_x:i.x+a.getParam("contextmenu_offset_x",0),offset_y:i.y+a.getParam("contextmenu_offset_y",0),constrain:1,keyboard_focus:!0}),b._menu=d,d.add({title:"advanced.cut_desc",icon:"cut",cmd:"Cut"}).setDisabled(f),d.add({title:"advanced.copy_desc",icon:"copy",cmd:"Copy"}).setDisabled(f),d.add({title:"advanced.paste_desc",icon:"paste",cmd:"Paste"});if(g.nodeName=="A"&&!a.dom.getAttrib(g,"name")||!f)d.addSeparator(),d.add({title:"advanced.link_desc",icon:"link",cmd:a.plugins.advlink?"mceAdvLink":"mceLink",ui:!0}),d.add({title:"advanced.unlink_desc",icon:"unlink",cmd:"UnLink"});return d.addSeparator(),d.add({title:"advanced.image_desc",icon:"image",cmd:a.plugins.advimage?"mceAdvImage":"mceImage",ui:!0}),d.addSeparator(),h=d.addMenu({title:"contextmenu.align"}),h.add({title:"contextmenu.left",icon:"justifyleft",cmd:"JustifyLeft"}),h.add({title:"contextmenu.center",icon:"justifycenter",cmd:"JustifyCenter"}),h.add({title:"contextmenu.right",icon:"justifyright",cmd:"JustifyRight"}),h.add({title:"contextmenu.full",icon:"justifyfull",cmd:"JustifyFull"}),b.onContextMenu.dispatch(b,d,g,f),d}}),tinymce.PluginManager.add("contextmenu",tinymce.plugins.ContextMenu)})()