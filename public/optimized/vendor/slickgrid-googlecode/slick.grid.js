define(["jquery","jqueryui/sortable","jqueryui/resizable"],function(a,b,c){return function d(b,c,d,e){function M(){e=a.extend({},f,e),b.empty().attr("tabIndex",0).attr("hideFocus",!0).css("overflow","hidden").css("outline",0).css("position","relative").addClass(j),l=a("<div class='grid-header' style='overflow:hidden;position:relative;' />").appendTo(b),m=a("<div style='width:10000px' />").appendTo(l),n=a("<div tabIndex='0' hideFocus style='width:100%;overflow:scroll;outline:0;position:relative;outline:0px;'>").appendTo(b),o=a("<div class='grid-canvas' tabIndex='0' hideFocus />").appendTo(n),n.height(b.innerHeight()-l.outerHeight());for(var c=0;c<d.length;c++){var g=d[c];F[g.id]=c,g.width||(g.width=e.defaultColumnWidth),g.formatter||(g.formatter=V);var h=a("<div class='h c"+c+"' cell="+c+" id='"+g.id+"' />").html(g.name).width(g.width).appendTo(m);g.rerenderOnResize&&h.append(" <img src='images/help.png' align='absmiddle' title='This column has an adaptive formatter.  Resize to a smaller size to see alternative data representation.'>")}m.find(".h").each(function(){var b=parseInt(a(this).attr("cell")),c=d[b];if(c.resizable===!1)return;a(this).resizable({handles:"e",minWidth:c.minWidth?c.minWidth:null,maxWidth:c.maxWidth?c.maxWidth:null,stop:function(b,c){var e=a(this).attr("id"),f=F[e];d[f].width=a(this).width(),a("body").append("<style class='slick-style'> ."+j+" .grid-canvas .c"+f+"{width: "+d[f].width+"px;} </style>"),bd(),d[f].rerenderOnResize&&Z(),bg()}})}),e.enableColumnReorder&&m.sortable({axis:"x",cancel:".ui-resizable-handle",update:function(a,b){console.time("column reorder");var c=m.sortable("toArray"),e={};for(var f=0;f<d.length;f++)e[d[f].id]=d[f];for(var f=0;f<c.length;f++)F[c[f]]=f,d[f]=e[c[f]];Z(),O(),N(),bg(),k.onColumnsReordered&&k.onColumnsReordered(),a.stopPropagation(),console.timeEnd("column reorder")}}),m.bind("click",function(b){if(!a(b.target).hasClass(".h"))return;var c=a(b.target).attr("id");k.onColumnHeaderClick&&k.onColumnHeaderClick(d[F[c]])}),N(),bd(),bg(),e.manualScrolling||n.bind("scroll",bh),o.bind("keydown",bi),o.bind("click",bj),o.bind("dblclick",bk),a.browser.msie&&(n[0].onselectstart=function(){if(event.srcElement.tagName!="INPUT"&&event.srcElement.tagName!="TEXTAREA")return!1})}function N(){for(var b=0;b<d.length;b++)a("body").append("<style class='slick-style'> ."+j+" .grid-canvas .c"+b+" { width:"+d[b].width+"px } </style>")}function O(){a("body").find("style.slick_style").remove()}function P(){u&&bw(),m.sortable("destroy"),m.find(".h").resizable("destroy"),O(),b.empty().removeClass(j)}function Q(a,b,c){m.find(".h[id="+a+"]").removeClass(c).addClass(b)}function R(a){return F[a]}function S(){return D.concat()}function T(b){if(GlobalEditorLock.isEditing()&&!GlobalEditorLock.hasLock(k))throw"Grid : setSelectedRows : cannot set selected rows when somebody else has an edit lock";var c={};for(var d=0;d<b.length;d++)c[b[d]]=!0;for(var d=0;d<D.length;d++){var e=D[d];v[e]&&!c[e]&&a(v[e]).removeClass("selected")}for(var d=0;d<b.length;d++){var e=b[d];v[e]&&!E[e]&&a(v[e]).addClass("selected")}D=b.concat(),E=c}function U(b){if(u&&!bv())return;bm(null),e.enableAddRow!=b.enableAddRow&&_(c.length),e=a.extend(e,b),bg()}function V(a,b,c,d,e){return c==null||c==undefined?"":c}function W(a,b){var e=c[b],f=b<c.length&&!e,h="r"+(f?" loading":"")+(E[b]?" selected":"");a.push("<div class='"+h+"' row='"+b+"' style='top:"+g*b+"px'>");for(var i=0,j=d.length;i<j;i++){var k=d[i],l;!k.active||!e.active,a.push("<div "+(k.unselectable?"":"hideFocus tabIndex=0 ")+"class='c c"+i+(k.cssClass?" "+k.cssClass:"")+(k.active&&e.active?" active-col-and-row":"")+"' cell="+i+">"),e&&b<c.length&&a.push(k.formatter(b,i,e[k.field],k,e)),a.push("</div>")}a.push("</div>")}function X(a){var b=[];return W(b,a),b.join("")}function Y(a,b){console.time("cleanupRows");var c=w,d=o[0];for(var e in v)(e<a||e>b)&&e!=r&&(d.removeChild(v[e]),delete v[e],w--,J++);console.log("removed "+(c-w)+" rows"),console.timeEnd("cleanupRows")}function Z(){console.log("removeAllRows"),o[0].innerHTML="",v={},J+=w,w=0}function _(a){var b=v[a];if(!b)return;if(u&&r==a)throw"Grid : removeRow : Cannot remove a row that is currently in edit mode";B=0,b.parentNode.removeChild(b),b=null,delete v[a],w--,J++}function ba(a){console.time("removeRows");if(!a||!a.length)return;B=0;var b=[];for(var c=0,d=a.length;c<d;c++){if(u&&r==c)throw"Grid : removeRow : Cannot remove a row that is currently in edit mode";var e=v[a[c]];if(!e)continue;b.push(a[c])}if(w>10&&b.length==w)o[0].innerHTML="",v={},J+=w,w=0;else for(var c=0,f=b.length;c<f;c++){var e=v[b[c]];e.parentNode.removeChild(e),delete v[b[c]],w--,J++}console.timeEnd("removeRows")}function bb(b,e){if(!v[b])return;var f=a(v[b]).find(".c[cell="+e+"]");if(f.length===0)return;var g=d[e],h=c[b];u&&r==b&&s==e?u.setValue(h[g.field]):f[0].innerHTML=h?g.formatter(b,e,h[g.field],g,h):""}function bc(b){if(!v[b])return;a(v[b]).find(".c").each(function(a){var e=d[a];b==r&&a==s&&u?u.setValue(c[r][e.field]):c[b]?this.innerHTML=e.formatter(b,a,c[b][e.field],e,c[b]):this.innerHTML=""})}function bd(){q=n.innerWidth(),p=n.innerHeight(),i=x=Math.ceil(p/g),h=Math.max(h,x+2*i);var b=0;for(var f=0;f<d.length;f++)b+=d[f].width+5;o.width(b);var j=o[0],k=e.enableAddRow?c.length:c.length-1;for(var f in v)f>=k&&(j.removeChild(v[f]),delete v[f],w--,J++);var l=Math.max(g*(c.length+x-2),p-a.getScrollbarWidth());n.scrollTop()>l-n.height()+a.getScrollbarWidth()&&n.scrollTop(l-n.height()+a.getScrollbarWidth()),o.height(l)}function be(){return{top:Math.floor(z/g),bottom:Math.floor((z+p)/g)}}function bf(a,b){console.time("renderRows");var c=o[0],d=w,e=[],f=[],g=new Date;for(var h=a;h<=b;h++){if(v[h])continue;w++,f.push(h),W(e,h),I++}var i=document.createElement("div");i.innerHTML=e.join("");for(var h=0,j=i.childNodes.length;h<j;h++)v[f[h]]=c.appendChild(i.firstChild);w-d>5&&(C=(new Date-g)/(w-d)),console.log("rendered "+(w-d)+" rows"),console.timeEnd("renderRows")}function bg(){var a=be(),b=Math.max(0,a.top-(B<0?i:5)),d=Math.min(e.enableAddRow?c.length:c.length-1,a.bottom+(B>0?i:5));w>10&&Math.abs(y-z)>g*h?Z():Y(b,d),bf(b,d),y=z,H=null}function bh(){z=n[0].scrollTop;var a=Math.abs(y-z),b=n[0].scrollLeft;b!=A&&(l[0].scrollLeft=A=b);if(a<5*g)return;y==z?B=0:y<z?B=1:B=-1,H&&window.clearTimeout(H),a<x*g?bg():H=window.setTimeout(bg,50),k.onViewportChanged&&k.onViewportChanged()}function bi(a){switch(a.which){case 27:GlobalEditorLock.isEditing()&&GlobalEditorLock.hasLock(k)&&bw(k),t&&t.focus();break;case 9:a.shiftKey?bt(0,-1,!0):bt(0,1,!0);break;case 37:bt(0,-1);break;case 39:bt(0,1);break;case 38:bt(-1,0);break;case 40:case 13:bt(1,0);break;default:if(k.onKeyDown&&c[r]&&!u&&k.onKeyDown(a,r,s))return a.stopPropagation(),a.preventDefault(),!1;return}return a.stopPropagation(),a.preventDefault(),!1}function bj(b){var f=a(b.target).closest(".c");if(f.length===0)return;if(t==f[0]&&u!=null)return;var g=parseInt(f.parent().attr("row")),h=parseInt(f.attr("cell")),i=null;if(c[g]&&k.onClick&&(!u||(i=bv()))&&k.onClick(b,g,h))return b.stopPropagation(),b.preventDefault(),!1;e.enableCellNavigation&&!d[h].unselectable&&(i==1||i==null&&bv())&&bn(f[0])}function bk(b){var c=a(b.target).closest(".c");if(c.length===0)return;if(t==c[0]&&u!=null)return;e.editOnDoubleClick&&br()}function bl(a,b){var c=Math.floor(b/g),e=0,f=0;for(var h=0;h<d.length&&f<b;h++)f+=d[h].width,e++;return{row:c,cell:e-1}}function bm(b,d){t!=null&&(bq(),a(t).removeClass("selected")),t=b,t!=null?(r=parseInt(a(t).parent().attr("row")),s=parseInt(a(t).attr("cell")),a(t).addClass("selected"),bs(),e.editable&&!e.editOnDoubleClick&&(c[r]||r==c.length)&&(window.clearTimeout(G),d?G=window.setTimeout(br,100):br())):(r=null,s=null)}function bn(a,b){bm(a,b),a?T([r]):T([]),k.onSelectedRowsChanged&&k.onSelectedRowsChanged()}function bo(){if(document.selection&&document.selection.empty)document.selection.empty();else if(window.getSelection){var a=window.getSelection();a&&a.removeAllRanges&&a.removeAllRanges()}}function bp(a,b){return a<c.length&&!c[a]?!1:d[b].cannotTriggerInsert&&a>=c.length?!1:d[b].editor?!0:!1}function bq(){if(!u)return;u.destroy(),a(t).removeClass("editable invalid"),c[r]&&(t.innerHTML=d[s].formatter(r,s,c[r][d[s].field],d[s],c[r])),u=null,a.browser.msie&&bo(),GlobalEditorLock.leaveEditMode(k)}function br(){if(!t)return;if(!e.editable)throw"Grid : makeSelectedCellEditable : should never get called when options.editable is false";window.clearTimeout(G);if(!bp(r,s))return;GlobalEditorLock.enterEditMode(k),a(t).addClass("editable");var b=null;c[r]&&(b=c[r][d[s].field]),t.innerHTML="",u=new d[s].editor(a(t),d[s],b,c[r])}function bs(){if(!t)return;var a=n[0].scrollTop;(r+2)*g>a+p?(n[0].scrollTop=r*g,bh()):r*g<a&&(n[0].scrollTop=(r+2)*g-p,bh())}function bt(b,c,d){if(!t)return;if(!e.enableCellNavigation)return;if(!GlobalEditorLock.commitCurrentEdit())return;var f=v[r+b],g=f?a(f).find(".c[cell="+(s+c)+"][tabIndex=0]"):null;d&&b==0&&!(f&&g&&g.length)&&(!g||!g.length)&&(c>0?(f=v[r+b+1],g=f?a(f).find(".c[cell][tabIndex=0]:first"):null):(f=v[r+b-1],g=f?a(f).find(".c[cell][tabIndex=0]:last"):null)),f&&g&&g.length?(bn(g[0],e.asyncEditorLoading),u||t.focus()):t.focus()}function bu(b,f){if(b>c.length||b<0||f>=d.length||f<0)return;if(!e.enableCellNavigation||d[f].unselectable)return;if(!GlobalEditorLock.commitCurrentEdit())return;v[b]||bf(b,b);var f=a(v[b]).find(".c[cell="+f+"][tabIndex=0]")[0];bn(f),u||t.focus()}function bv(){if(u){if(u.isValueChanged()){var b=u.validate();if(b.valid){var e=u.getValue();return r<c.length?d[s].setValueHandler?d[s].setValueHandler(e,d[s],c[r]):c[r][d[s].field]=e:k.onAddNewRow&&k.onAddNewRow(d[s],e),bq(),!0}return a(t).addClass("invalid"),a(t).stop(!0,!0).effect("highlight",{color:"red"},300),k.onValidationError&&k.onValidationError(t,b,r,s,d[s]),u.focus(),!1}bq()}return!0}function bw(){bq()}var f={enableAddRow:!0,manualScrolling:!1,editable:!0,editOnDoubleClick:!1,enableCellNavigation:!0,defaultColumnWidth:80,enableColumnReorder:!0,asyncEditorLoading:!0},g=24,h=50,i=5,j="slickgrid_"+Math.round(1e6*Math.random()),k=this,l,m,n,o,p,q,r,s,t=null,u=null,v={},w=0,x,y=0,z=0,A=0,B=1,C=10,D=[],E={},F={},G=null,H=null,I=0,J=0,K=document.createDocumentFragment(),L=!1;this.debug=function(){var a="";a+="\ncounter_rows_rendered:  "+I,a+="\ncounter_rows_removed:  "+J,a+="\nrenderedRows:  "+w,a+="\nnumVisibleRows:  "+x,a+="\nCAPACITY:  "+h,a+="\nBUFFER:  "+i,a+="\navgRowRenderTime:  "+C,alert(a)},this.benchmark_render_200=function(){Z(),bf(0,200),Y()},this.stressTest=function(){console.time("benchmark-stress"),bf(0,500),Y(),console.timeEnd("benchmark-stress"),window.setTimeout(k.stressTest,50)},this.benchmarkFn=function(a){var b=new Date,c=new Array(arguments);c.splice(0,1),k[a].call(this,c),alert("Grid : benchmarkFn : "+a+" : "+(new Date-b)+"ms")},M(),a.extend(this,{onColumnHeaderClick:null,onClick:null,onKeyDown:null,onAddNewRow:null,onValidationError:null,onViewportChanged:null,onSelectedRowsChanged:null,onColumnsReordered:null,destroy:P,getColumnIndex:R,updateCell:bb,updateRow:bc,removeRow:_,removeRows:ba,removeAllRows:Z,render:bg,getViewport:be,resizeCanvas:bd,scroll:scroll,getCellFromPoint:bl,gotoCell:bu,editCurrentCell:br,getSelectedRows:S,setSelectedRows:T,setColumnHeaderCssClass:Q,commitCurrentEdit:bv,cancelCurrentEdit:bw})}})