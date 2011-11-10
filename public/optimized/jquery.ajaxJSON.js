define(["jquery","jquery.instructure_forms"],function($){$.originalGetJSON=$.getJSON,$.getJSON=function(a,b,c){var d=$.originalGetJSON(a,b,c);return $.ajaxJSON.storeRequest(d,a,"GET",b),d};var assert_option=function(a,b){if(!a[b])throw b+" option is required"};$.ajaxJSONPreparedFiles=function(a){assert_option(a,"context_code");var b=[],c=this,d=a.files||a.file_elements||[];for(var e=0;e<d.length;e++){var f=d[e];f.name=(f.value||f.name).split(/(\/|\\)/).pop(),b.push(f)}var g=[],h=function(){var b=a.data;if(a.handle_files){var c=g;a.single_file&&(c=g[0]),b=a.handle_files.call(this,c,b)}a.url&&a.success&&b!==!1&&$.ajaxJSON(a.url,a.method,b,a.success,a.error)},i=function(b,d){$.ajaxJSON(a.uploadDataUrl||"/files/pending","POST",b,function(b){try{if(b&&b.upload_url){var e=b.upload_params,f=$(d).attr("name");$(d).attr("name",b.file_param),$.ajaxJSONFiles(b.upload_url,"POST",e,$(d),function(a){g.push(a),$(d).attr("name",f),j.call(c)},function(b){$(d).attr("name",f),(a.upload_error||a.error).call(c,b)},{onlyGivenParameters:b.remote_url})}else(a.upload_error||a.error).call(c,b)}catch(h){var i=h}},function(){return(a.upload_error||a.error).apply(this,arguments)})},j=function(){var d=b.shift();d?i.call(c,$.extend({"attachment[folder_id]":a.folder_id,"attachment[intent]":a.intent,"attachment[asset_string]":a.asset_string,"attachment[filename]":d.name,"attachment[context_code]":a.context_code},a.formData||{}),d):h.call(c)};j.call(c)},$.ajaxJSONFiles=function(a,b,c,d,e,f,g){var h=$(document.createElement("form"));h.attr("action",a).attr("method",b),c.authenticity_token||(c.authenticity_token=$("#ajax_authenticity_token").text());var i={};d.each(function(){i[$(this).attr("name")]=!0});for(var j in c)if(!i[j]){var k=$(document.createElement("input"));k.attr("type","hidden").attr("name",j).attr("value",c[j]),h.append(k)}d.each(function(){var a=$(this).clone(!0);$(this).after(a),h.append($(this)),$(this).removeAttr("id")}),$("body").append(h.hide()),h.formSubmit({fileUpload:!0,success:e,onlyGivenParameters:g?g.onlyGivenParameters:!1,error:f}),function(){h.submit()}.call(h)},$.ajaxJSON=function(url,submit_type,data,success,error,options){data=data||{};if(!url&&error){error(null,null,"URL required for requests",null);return}url=url||".",submit_type!="GET"&&(data._method=submit_type,submit_type="POST",data.authenticity_token||(data.authenticity_token=$("#ajax_authenticity_token").text())),$("#page_view_id").length>0&&!data.page_view_id&&(!options||!options.skipPageViewLog)&&(data.page_view_id=$("#page_view_id").text());var ajaxError=function(xhr,textStatus,errorThrown){var data=xhr;if(xhr.responseText){var text=xhr.responseText.replace(/(<([^>]+)>)/ig,"");data={message:text};try{data=eval("("+xhr.responseText+")")}catch(e){}}options&&options.skipDefaultError&&$.ajaxJSON.ignoredXHRs.push(xhr),error&&$.isFunction(error)?error(data,xhr,textStatus,errorThrown):$.ajaxJSON.unhandledXHRs.push(xhr)},params={url:url,dataType:"json",type:submit_type,success:function(a){a=a||{};var b=null;xhr&&xhr.getResponseHeader&&(b=xhr.getResponseHeader("X-Canvas-Page-View-Id"))&&setTimeout(function(){$(document).triggerHandler("page_view_id_received",b)},50),!a.length&&a.errors?(ajaxError(a.errors,null,""),!options||!options.skipDefaultError?$.fn.defaultAjaxError.func.call($.fn.defaultAjaxError.object,null,a,"0",a.errors):$.ajaxJSON.ignoredXHRs.push(xhr)):success&&$.isFunction(success)&&success(a,xhr)},error:function(){ajaxError.apply(this,arguments)},data:data};options&&options.timeout&&(params.timeout=options.timeout);var xhr=$.ajax(params);return $.ajaxJSON.storeRequest(xhr,url,submit_type,data),xhr},$.ajaxJSON.unhandledXHRs=[],$.ajaxJSON.ignoredXHRs=[],$.ajaxJSON.passedRequests=[],$.ajaxJSON.storeRequest=function(a,b,c,d){$.ajaxJSON.passedRequests.push({xhr:a,url:b,submit_type:c,data:d})},$.ajaxJSON.findRequest=function(a){var b=$.ajaxJSON.passedRequests;for(var c in b)if(b[c]&&b[c].xhr==a)return b[c];return null}})