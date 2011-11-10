require(["INST","i18n","jquery","jquery.ajaxJSON","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.keycodes","jquery.loadingImg","jquery.templateData","vendor/date","vendor/jquery.scrollTo","jqueryui/sortable"],function(a,b,c){return b=b.scoped("context_modules"),window.modules=function(){return{updateTaggedItems:function(){},currentIndent:function(a){var b=a.attr("class").split(/\s/),c=0;for(idx=0;idx<b.length;idx++)if(b[idx].match(/^indent_/)){var d=parseInt(b[idx].substring(7),10);isNaN(d)||(c=d)}return c},refreshProgressions:function(a){c("#context_modules .context_module:visible").each(function(){var a=c(this),b=a.find(".header").getTemplateData({textValues:["id"]}),d={progression_complete_count:0,progression_started_count:0};c("#progression_list .progression_"+b).each(function(){var a=c(this).getTemplateData({textValues:["workflow_state"]}).workflow_state;a=="completed"?d.progression_complete_count++:(a=="unlocked"||a=="started")&&d.progression_started_count++}),a.find(".progression_details_link").showIf(d.progression_complete_count||d.progression_started_count),a.find(".footer").fillTemplateData({data:d}).find(".progression_details_link").showIf(d.progression_complete_count||d.progression_started_count).end().find(".progression_complete").showIf(d.progression_complete_count>0).end().find(".progression_started").showIf(d.progression_started_count>0)}),c(".context_module .progression_complete").showIf(c(".context_module .prerequisites_footer:visible,.context_module_item .criterion img.not_blank").length>0),a&&(c(".loading_module_progressions_link").remove(),c(".module_progressions_link").showIf(c(".editable_context_module").length>0||c(".context_module .progression_complete:visible").length>0||c(".context_module_item.completed_item").length>0))},updateProgressions:function(a,b){var d=c(".progression_list_url").attr("href");a&&(d=d+"?user_id="+a),c(".context_module_item.progression_requirement:visible").length>0&&c(".loading_module_progressions_link").show().attr("disabled",!0),c.ajaxJSON(d,"GET",{},function(d){c(".loading_module_progressions_link").remove(),a?c("#progression_list .student_"+a+" .progressions").empty():c("#progression_list .student .progressions").empty();var e=c("#identity .user_id").text(),f=c("#progression_list_blank"),g=c("#current_user_progression_list"),h=c("#progression_list"),i={},j=!1,k=[];for(var l in d)k.push(d[l]);var m=function(){c("#context_modules").hasClass("editable")||c("#context_modules .context_module").each(function(){modules.updateProgressionState(c(this))}),modules.refreshProgressions(j&&!a),b&&b()},n=0,o=function(){var a=k.shift();if(!a){m();return}var b=a.context_module_progression;b.workflow_state=="locked"&&(j=!0);if(b.user_id==e){var d=g.find(".progression_"+b.context_module_id);d.length===0&&g.length>0&&(d=g.find(".progression_blank").clone(!0),d.removeClass("progression_blank").addClass("progression_"+b.context_module_id),g.append(d)),d.length>0&&(b.requirements_met=c.map(b.requirements_met||[],function(a){return a.id}).join(","),d.fillTemplateData({data:b}))}var l=f.clone(!0).removeAttr("id");l.fillTemplateData({data:b}),l.addClass("progression_"+b.context_module_id),l.data("progression",b);var p=i[b.user_id];p||(p=h.find(".student_"+b.user_id+" .progressions"),i[b.user_id]=p),p.append(l);if(b.workflow_state=="unlocked"||b.workflow_state=="started")i[b.user_id].found||(i[b.user_id].found=!0,p.parents(".student").fillTemplateData({data:{current_module:c("#context_module_"+b.context_module_id+" .header .name").text()}}));n++,n<50?o():(n=0,setTimeout(o,150))};o()},function(){b&&b()})},updateAssignmentData:function(){c.ajaxJSON(c(".assignment_info_url").attr("href"),"GET",{},function(a){c.each(a,function(a,d){var e={};d["points_possible"]!=null&&(e.points_possible_display=b.t("points_possible_short","%{points} pts",{points:"<span class='points_possible_block'>"+d.points_possible+"</span>"})),d["due_date"]!=null&&(e.due_date_display=c.parseFromISO(d.due_date).date_formatted),c("#context_module_item_"+a).fillTemplateData({data:e,htmlValues:["points_possible_display"]})})},function(){})},editModule:function(a){var d=c("#add_context_module_form");d.data("current_module",a);var e=a.getTemplateData({textValues:["name","unlock_at","require_sequential_progress"]});d.fillFormData(e,{object_name:"context_module"});var f=!1;a.attr("id")=="context_module_new"?(f=!0,d.attr("action",d.find(".add_context_module_url").attr("href")),d.find(".completion_entry").hide(),d.attr("method","POST"),d.find(".submit_button").text(b.t("buttons.add","Add Module"))):(d.attr("action",a.find(".edit_module_link").attr("href")),d.find(".completion_entry").show(),d.attr("method","PUT"),d.find(".submit_button").text(b.t("buttons.update","Update Module"))),d.find("#unlock_module_at").attr("checked",e.unlock_at).triggerHandler("change"),d.find("#require_sequential_progress").attr("checked",e.require_sequential_progress=="true"||e.require_sequential_progress=="1"),d.find(".prerequisites_entry").showIf(c("#context_modules .context_module").length>1);var g=[];a.find(".prerequisites .criterion").each(function(){g.push(c(this).getTemplateData({textValues:["id","name","type"]}))}),d.find(".prerequisites_list .criteria_list").empty();for(var h in g){var i=g[h];d.find(".add_prerequisite_link:first").click(),i.type=="context_module"&&d.find(".prerequisites_list .criteria_list .criterion:last select").val(i.id)}d.find(".completion_criteria_list .criteria_list").empty(),a.find(".content .context_module_item .criterion.defined").each(function(){var a=c(this).parents(".context_module_item").getTemplateData({textValues:["id","criterion_type","min_score"]});d.find(".add_completion_criterion_link").click(),d.find(".completion_criteria_list .criteria_list .criterion:last").find(".id").val(a.id||"").change().end().find(".type").val(a.criterion_type||"").change().end().find(".min_score").val(a.min_score||"")});var j=c("#context_modules .context_module").length==1,k=a.find(".content .context_module_item").length===0;d.find(".prerequisites_list .no_prerequisites_message").showIf(g.length===0).end().find(".prerequisites_list .criteria_list").showIf(g.length!=0).end().find(".add_prerequisite_link").showIf(!j).end().find(".completion_criteria_list .no_items_message").showIf(k).end().find(".completion_criteria_list .no_criteria_message").showIf(!k&&a.find(".content .context_module_item .criterion.defined").length===0).end().find(".completion_criteria_list .criteria_list").showIf(!k).end().find(".add_completion_criterion_link").showIf(!k),a.fadeIn("fast",function(){}),a.addClass("dont_remove"),d.find(".module_name").toggleClass("lonely_entry",f),d.dialog("close").dialog({autoOpen:!1,modal:!0,width:600,close:function(){modules.hideEditModule(!0)}}).dialog("option",{title:f?b.t("titles.add","Add Module"):b.t("titles.edit","Edit Module Settings"),width:f?"auto":600}).dialog("open"),a.removeClass("dont_remove"),d.find(":text:visible:first").focus().select()},hideEditModule:function(a){var b=c("#add_context_module_form").data("current_module");a&&b&&b.attr("id")=="context_module_new"&&!b.hasClass("dont_remove")&&b.remove(),c("#add_context_module_form:visible").dialog("close")},addItemToModule:function(a,b){if(!b)return c("<div/>");b.id=b.id||"new",b.type=b.type||b["item[type]"]||c.underscore(b.content_type),b.title=b.title||b["item[title]"],b.new_tab=b.new_tab?"1":"0",b.id!="new"&&c("#context_module_item_"+b.id).remove();var d=c("#context_module_item_blank").clone(!0).removeAttr("id");d.addClass(b.type+"_"+b.id),d.addClass(b.type),d.fillTemplateData({data:b,id:"context_module_item_"+b.id,hrefValues:["id","context_module_id"]});for(var e=0;e<10;e++)d.removeClass("indent_"+e);d.addClass("indent_"+(b.indent||0));var f=null;return a.find(".context_module_items").children().each(function(){var a=parseInt(c(this).getTemplateData({textValues:["position"]}).position,10);(b.position||b.position===0)&&(a||a===0)&&f==null&&a-b.position>=0&&(f=c(this))}),f?f.before(d.show()):a.find(".context_module_items").append(d.show()),d},refreshModuleList:function(){c("#module_list").find(".context_module_option").remove(),c("#context_modules .context_module").each(function(){var a=c(this).find(".header").getTemplateData({textValues:["name","id"]}),b=c(document.createElement("option"));b.val(a.id),b.text("the module, "+a.name).addClass("context_module_"+a.id).addClass("context_module_option"),c("#module_list").append(b)})},filterPrerequisites:function(a,b){var d=modules.prerequisites(),e=a.attr("id").substring("context_module_".length),f=[];for(var g in b)c.inArray(b[g],d[e])==-1&&f.push(b[g]);return f},prerequisites:function(){var a={to_visit:{},visited:{}};c("#context_modules .context_module").each(function(){var b=c(this).attr("id").substring("context_module_".length);a[b]=[],c(this).find(".prerequisites .criterion").each(function(){var d=c(this).getTemplateData({textValues:["id"]}).id;c(this).hasClass("context_module_criterion")&&(a[b].push(d),a.to_visit[b+"_"+d]=!0)})});for(var b in a.to_visit)if(a.to_visit.hasOwnProperty(b)){var d=b.split("_");if(a.visited[b])continue;a.visited[b]=!0;for(var e in a[d[1]])a[d[0]].push(a[d[1]][e]),a.to_visit[d[0]+"_"+a[d[1]][e]]=!0}return delete a.to_visit,delete a.visited,a},updateProgressionState:function(a){var b=a.attr("id").substring(15),d=c("#current_user_progression_list .progression_"+b),e=d.getTemplateData({textValues:["context_module_id","workflow_state","requirements_met","collapsed","current_position"]}),a=c("#context_module_"+e.context_module_id);a.toggleClass("completed",e.workflow_state=="completed");var f=e.workflow_state;if(f=="unlocked"||f=="started")f="in progress";f=="completed"&&!a.find(".progression_requirement").length&&(f=""),a.fillTemplateData({data:{progression_state:f}}),a.toggleClass("locked_module",e.workflow_state=="locked"&&!a.hasClass("editable_context_module")),a.find(".context_module_item").each(function(){var a=parseInt(c(this).getTemplateData({textValues:["position"]}).position,10);e.current_position&&a&&e.current_position<a&&c(this).addClass("after_current_position")});if(e.requirements_met){var g=e.requirements_met.split(",");for(var h in g){var i=g[h];a.find("#context_module_item_"+i).addClass("completed_item")}}e.collapsed=="true"&&a.addClass("collapsed_module")},sortable_module_options:{connectWith:".context_module_items",handle:".move_item_link",helper:"clone",placeholder:"context_module_placeholder",forcePlaceholderSize:!0,axis:"y",containment:"#context_modules",update:function(a,d){var e=d.item.parents(".context_module"),f=e.find(".reorder_items_url").attr("href");e.find(".content").loadingImage();var g=[];e.find(".context_module_items .context_module_item").each(function(){g.push(c(this).getTemplateData({textValues:["id"]}).id)}),c.ajaxJSON(f,"POST",{order:g.join(",")},function(a){e.find(".content").loadingImage("remove");if(a&&a.context_module&&a.context_module.content_tags)for(var b in a.context_module.content_tags){var c=a.context_module.content_tags[b].content_tag;e.find("#context_module_item_"+c.id).fillTemplateData({data:{position:c.position}})}},function(a){e.find(".content").loadingImage("remove"),e.find(".content").errorBox(b.t("errors.reorder","Reorder failed, please try again."))})}}}}(),c(document).ready(function(){c(".datetime_field").datetime_field(),c(".context_module").live("mouseover",function(){c(".context_module_hover").removeClass("context_module_hover"),c(this).addClass("context_module_hover")}),c(".context_module_item").live("mouseover",function(){c(".context_module_item_hover").removeClass("context_module_item_hover"),c(this).addClass("context_module_item_hover")});var a=null,d=function(a){a.hasClass("context_module")?(c(".context_module_hover").removeClass("context_module_hover"),c(".context_module_item_hover").removeClass("context_module_item_hover"),a.addClass("context_module_hover")):a.hasClass("context_module_item")&&(c(".context_module_item_hover").removeClass("context_module_item_hover"),c(".context_module_hover").removeClass("context_module_hover"),a.addClass("context_module_item_hover"),a.parents(".context_module").addClass("context_module_hover")),a.find(":tabbable:first").focus()};c(document).keycodes("j k",function(b){a=c(".context_module_hover:visible,.context_module_item_hover:visible").filter(":last");if(a.length===0){a=c(".context_module:visible:first"),d(a);return}var e="prev",f=null;b.keyString=="j"?a.hasClass("context_module")?(f=a.find(".context_module_item:visible:first"),f.length===0&&(f=a.next(".context_module"))):a.hasClass("context_module_item")&&(f=a.next(".context_module_item:visible"),f.length===0&&(f=a.parents(".context_module").next(".context_module"))):b.keyString=="k"&&(a.hasClass("context_module")?(f=a.prev(".context_module").find(".context_module_item:visible:last"),f.length===0&&(f=a.prev(".context_module"))):a.hasClass("context_module_item")&&(f=a.prev(".context_module_item:visible"),f.length===0&&(f=a.parents(".context_module")))),f&&f.length>0&&(a=f),d(a)}).keycodes("e d i o",function(b){if(!a||a.length===0)return;b.keyString=="e"?a.find(".edit_link:first:visible").click():b.keyString=="d"?a.find(".delete_link:first:visible").click():b.keyString=="i"?a.find(".indent_item_link:first:visible").click():b.keyString=="o"&&a.find(".outdent_item_link:first:visible").click()}).keycodes("n",function(a){a.keyString=="n"&&c(".add_module_list:visible:first").click()}),c(".context_module:first .content:visible").length==0&&c("html,body").scrollTo(c(".context_module .content:visible").filter(":first").parents(".context_module")),c("#context_modules").hasClass("editable")&&setTimeout(modules.initModuleManagement,1e3),modules.updateProgressions(),modules.refreshProgressions(),modules.updateAssignmentData(),c(".context_module").find(".expand_module_link,.collapse_module_link").bind("click",function(a,b){a.preventDefault();var d=null;b&&c.isFunction(b)&&(d=b,b=null);var e=c(this).hasClass("collapse_module_link")?"1":"0",f=c(this).parents(".context_module"),g=f.find(".content .context_module_items").children().length===0,h=function(a){var b=function(){f.find(".collapse_module_link").showIf(f.find(".content:visible").length>0),f.find(".expand_module_link").showIf(f.find(".content:visible").length===0),f.find(".content:visible").length>0?(f.find(".footer .manage_module").css("display",""),f.toggleClass("collapsed_module",!1)):(f.find(".footer .manage_module").css("display",""),f.toggleClass("collapsed_module",!0)),d&&c.isFunction(d)&&d()};a?(f.find(".content").show(),b()):f.find(".content").slideToggle(b)};(g||b)&&f.loadingImage();var i=c(this).attr("href");b&&(i=f.find(".edit_module_link").attr("href")),c.ajaxJSON(i,b?"GET":"POST",{collapse:e},function(a){if(b){f.loadingImage("remove");var d=a,e=function(){var a=d.shift();a?(modules.addItemToModule(f,a.content_tag),e()):(f.find(".context_module_items").sortable("refresh"),h(!0),modules.updateProgressionState(f),c("#context_modules").triggerHandler("slow_load"))};e()}else if(g){f.loadingImage("remove");for(var i in a)modules.addItemToModule(f,a[i].content_tag);f.find(".context_module_items").sortable("refresh"),h(),modules.updateProgressionState(f)}},function(a){f.loadingImage("remove")}),(e=="1"||!g)&&h()}),c(".refresh_progressions_link").click(function(a){a.preventDefault(),c(this).addClass("refreshing");var b=c(this),d=c("#student_progression_dialog").find(".student.selected_side_tab:first").getTemplateData({textValues:["id"]}).id;d&&modules.updateProgressions(d,function(){b.removeClass("refreshing"),b.blur(),c("#student_progression_dialog").find(".student.selected_side_tab:first").click()})}),c("#student_progression_dialog").delegate(".student","click",function(a){c("#student_progression_dialog").find(".selected_side_tab").removeClass("selected_side_tab"),c(this).addClass("selected_side_tab"),a.preventDefault();var d=c(this).getTemplateData({textValues:["id"]}).id,e=c("#progression_list .student_"+d+":first");c("#context_modules .context_module:visible").each(function(){var a=c(this),d=a.find(".header").getTemplateData({textValues:["id","name"]}),f=c("#student_progression_dialog .module_"+d.id);d.progress=e.find(".progression_"+d.id+":first").getTemplateData({textValues:["workflow_state"]}).workflow_state,d.progress=d.progress||"no information";var g="nothing";d.progress=="unlocked"?(g="in_progress",d.progress="in progress"):d.progress=="started"?(g="in_progress",d.progress="in progress"):d.progress=="completed"?g="completed":d.progress=="locked"&&(g="locked"),f.find(".still_need_completing").empty();if(d.progress=="in progress"){var h=c("#context_module_"+d.id+" .context_module_item.progression_requirement"),i=e.find(".progression_"+d.id).data("progression"),j=[];h.each(function(){var a=c(this),b={id:a.attr("id").substring(20)};a.hasClass("must_view_requirement")?b.type="must_view":a.hasClass("min_score_requirement")?b.type="min_score":a.hasClass("max_score_requirement")?b.type="max_score":a.hasClass("must_contribute_requirement")?b.type="must_contribute":a.hasClass("must_submit_requirement")&&(b.type="must_submit");var d=!1;if(i&&i.requirements_met)for(var e=0;e<i.requirements_met.length;e++){var f=i.requirements_met[e];f.id==b.id&&f.type==b.type&&(d=!0)}d||j.push(a.find(".title:first").text())}),f.find(".still_need_completing").append("<b>"+b.t("still_needs_completing","Still Needs to Complete")+"</b><br/>").append(j.join("<br/>"))}f.removeClass("locked").removeClass("in_progress").removeClass("completed").addClass(g),d.progressString=d.progress,f.fillTemplateData({data:d})})}),c(".module_progressions_link").click(function(a){a.preventDefault();var d=c("#student_progression_dialog"),e=d.find(".student_list");e.find(".student:not(.blank)").remove(),d.find(".side_tabs_content tbody .module:not(.blank)").remove();var f=c("#context_modules .context_module:visible"),g=[];f.each(function(){var a=c(this),b=a.attr("id").substring(15);g.push(b)}),c("#progression_list .student").each(function(){var a=d.find(".student.blank:first").clone(!0).removeClass("blank"),f=c(this),g=f.getTemplateData({textValues:["name","id","current_module"]});g.current_module=g.current_module||b.t("none_in_progress","none in progress"),a.find("a").attr("href","#"+g.id),a.fillTemplateData({data:g}),e.append(a.show())}),f.each(function(){var a=c(this),b=a.find(".header").getTemplateData({textValues:["id","name"]}),e=d.find(".module.blank:first").clone(!0).removeClass("blank");e.addClass("module_"+b.id),e.fillTemplateData({data:b}),d.find(".side_tabs_content tbody").append(e.show())}),c("#student_progression_dialog").dialog("close").dialog({autoOpen:!1,width:800,open:function(){c(this).find(".student:not(.blank):first .name").click()}}).dialog("open")}),c(".context_module .progression_details_link").click(function(a){a.preventDefault();var d=c(this).parents(".context_module").find(".header").getTemplateData({textValues:["id","name"]});d.module_name=d.name;var e=c("#module_progression_dialog");e.fillTemplateData({data:d}),e.find("ul").empty(),e.find(".progression_list").hide(),c("#progression_list .student").each(function(){var a=c(this).find(".progressions .progression_"+d.id),b=a.getTemplateData({textValues:["context_module_id","workflow_state"]});b.workflow_state=b.workflow_state||"locked",b.name=c(this).getTemplateData({textValues:["name"]}).name,e.find("."+b.workflow_state+"_list").show().find("ul").show().append(c("<li />").text(b.name))}),c("#module_progression_dialog").dialog("close").dialog({autoOpen:!1,title:b.t("titles.student_progress","Student Progress for Module"),width:500}).dialog("open")}),c(document).fragmentChange(function(a,b){var d=c(b.replace(/module/,"context_module"));d.hasClass("collapsed_module")&&d.find(".expand_module_link").triggerHandler("click")})}),modules.initModuleManagement=function(){c("#unlock_module_at").change(function(){c(".unlock_module_at_details").showIf(c(this).attr("checked")),c(this).attr("checked")||c("#context_module_unlock_at").val("").triggerHandler("change")}).triggerHandler("change"),c(".context_module").bind("update",function(a,b){b.context_module.unlock_at=c.parseFromISO(b.context_module.unlock_at).datetime_formatted;var d=c("#context_module_"+b.context_module.id);d.find(".header").fillTemplateData({data:b.context_module,hrefValues:["id"]}),d.find(".footer").fillTemplateData({data:b.context_module,hrefValues:["id"]}),d.find(".unlock_details").showIf(b.context_module.unlock_at&&Date.parse(b.context_module.unlock_at)>new Date),d.find(".footer .prerequisites").empty();for(var e in b.context_module.prerequisites){var f=b.context_module.prerequisites[e],g=c("#display_criterion_blank").clone(!0).removeAttr("id");g.fillTemplateData({data:f}),d.find(".footer .prerequisites").append(g.show())}d.find(".context_module_items .context_module_item").removeClass("progression_requirement").removeClass("min_score_requirement").removeClass("max_score_requirement").removeClass("must_view_requirement").removeClass("must_submit_requirement").removeClass("must_contribute_requirement");for(var e in b.context_module.completion_requirements){var h=b.context_module.completion_requirements[e];h.criterion_type=h.type;var i=d.find("#context_module_item_"+h.id);i.find(".criterion").fillTemplateData({data:h}),i.find(".completion_requirement").fillTemplateData({data:h}),i.find(".criterion").addClass("defined"),i.addClass(h.type+"_requirement").addClass("progression_requirement")}d.find(".footer.prerequisites_footer").showIf(b.context_module.prerequisites&&b.context_module.prerequisites.length>0),modules.refreshModuleList()}),c("#add_context_module_form").formSubmit({object_name:"context_module",processData:function(a){var b=[];return c(this).find(".prerequisites_list .criteria_list .criterion").each(function(){var a=c(this).find(".option select").val();a&&b.push("module_"+a)}),a["context_module[prerequisites]"]=b.join(","),a["context_module[completion_requirements][none]"]="none",c(this).find(".completion_criteria_list .criteria_list .criterion").each(function(){var b=c(this).find(".id").val();a["context_module[completion_requirements]["+b+"][type]"]=c(this).find(".type").val(),a["context_module[completion_requirements]["+b+"][min_score]"]=c(this).find(".min_score").val()}),a},beforeSubmit:function(a){var b=c(this).data("current_module");return b.loadingImage(),b.find(".header").fillTemplateData({data:a}),b.addClass("dont_remove"),modules.hideEditModule(),b.removeClass("dont_remove"),b},success:function(a,b){b.loadingImage("remove"),b.attr("id","context_module_"+a.context_module.id),c("#no_context_modules_message").slideUp(),b.triggerHandler("update",a)},error:function(a,b){b.loadingImage("remove")}}),c("#add_context_module_form .add_prerequisite_link").click(function(a){a.preventDefault();var b=c(this).parents("#add_context_module_form"),d=b.data("current_module"),e=c("#module_list").clone(!0).removeAttr("id"),f=b.find("#criterion_blank").clone(!0).removeAttr("id");e.find("."+d.attr("id")).remove();var g=[];c("#context_modules .context_module").each(function(){(c(this)[0]==d[0]||g.length>0)&&g.push(c(this).getTemplateData({textValues:["id"]}).id)});for(var h in g)e.find(".context_module_"+g[h]).attr("disabled",!0);f.find(".option").empty().append(e.show()),b.find(".prerequisites_list .criteria_list").append(f).show(),f.slideDown(),b.find(".no_prerequisites_message").hide(),e.focus()}),c("#add_context_module_form .add_completion_criterion_link").click(function(a){a.preventDefault();var d=c(this).parents("#add_context_module_form"),e=d.data("current_module"),f=c("#completion_criterion_option").clone(!0).removeAttr("id"),g=f.find("select.id"),h=d.find("#criterion_blank").clone(!0).removeAttr("id");h.find(".prereq_desc").remove();var i=modules.prerequisites(),j={};e.find(".content .context_module_item").not(".context_module_sub_header").each(function(){var a=c(this).getTemplateData({textValues:["id","title","type"]});a.type=="assignment"?displayType=b.t("optgroup.assignments","Assignments"):a.type=="attachment"?displayType=b.t("optgroup.files","Files"):a.type=="quiz"?displayType=b.t("optgroup.quizzes","Quizzes"):a.type=="external_url"?displayType=b.t("optgroup.external_urls","External URLs"):a.type=="context_external_tool"?displayType=b.t("optgroup.external_tools","External Tools"):a.type=="discussion_topic"?displayType=b.t("optgroup.discussion_topics","Discussions"):a.type=="wiki_page"&&(displayType=b.t("optgroup.wiki_pages","Wiki Pages"));var d=j[displayType];d||(d=j[displayType]=c(document.createElement("optgroup")),d.attr("label",displayType),g.append(d));var e=a.title,f=c(document.createElement("option"));f.val(a.id).text(e),d.append(f)}),h.find(".option").empty().append(f),f.slideDown(),d.find(".completion_criteria_list .criteria_list").append(h).show(),h.slideDown(),d.find(".no_criteria_message").hide(),g.change().focus()}),c("#completion_criterion_option .id").change(function(){var a=c(this).parents(".completion_criterion_option"),b=c("#context_module_item_"+c(this).val()).getTemplateData({textValues:["type"]});a.find(".type option").hide().attr("disabled",!0).end().find(".type option.any").show().attr("disabled",!1).end().find(".type option."+b.type).show().attr("disabled",!1),a.find(".type").val(a.find(".type option."+b.criterion_type+":first").val()),a.find(".type").change()}),c("#completion_criterion_option .type").change(function(){var a=c(this).parents(".completion_criterion_option");a.find(".min_score_box").showIf(c(this).val()=="min_score");var b=a.find(".id").val(),d=c.trim(c("#context_module_item_"+b+" .points_possible").text())||c.trim(c("#context_module_item_"+b+" .points_possible_block").text());d.length>0?(a.find(".points_possible").text(d),a.find(".points_possible_parent").show()):a.find(".points_possible_parent").hide()}),c("#add_context_module_form .delete_criterion_link").click(function(a){a.preventDefault(),c(this).parents(".criterion").slideUp(function(){c(this).remove()})}),c(".delete_module_link").live("click",function(a){a.preventDefault(),c(this).parents(".context_module").confirmDelete({url:c(this).attr("href"),message:b.t("confirm.delete","Are you sure you want to delete this module?"),success:function(a){var b=a.context_module.id;c(".context_module .prerequisites .criterion").each(function(){var a=c(this).getTemplateData({textValues:["id","type"]});a.type=="context_module"&&a.id==b&&c(this).remove()}),c(this).slideUp(function(){c(this).remove(),modules.updateTaggedItems()})}})}),c(".outdent_item_link,.indent_item_link").live("click",function(a){a.preventDefault();var b=c(this).hasClass("indent_item_link"),d=c(this).parents(".context_module_item"),e=modules.currentIndent(d);e=Math.max(Math.min(e+(b?1:-1),5),0),d.loadingImage({image_size:"small"}),c.ajaxJSON(c(this).attr("href"),"PUT",{"content_tag[indent]":e},function(a){d.loadingImage("remove");var b=c("#context_module_"+a.content_tag.context_module_id);modules.addItemToModule(b,a.content_tag),b.find(".context_module_items").sortable("refresh")},function(a){})}),c(".edit_item_link").live("click",function(a){a.preventDefault();var d=c(this).parents(".context_module_item"),e=d.getTemplateData({textValues:["title","url","indent","new_tab"]});e.indent=modules.currentIndent(d),c("#edit_item_form").find(".external_url").showIf(d.hasClass("external_url")||d.hasClass("context_external_tool")),c("#edit_item_form").find(".external_tool").showIf(d.hasClass("context_external_tool")),c("#edit_item_form").attr("action",c(this).attr("href")),c("#edit_item_form").fillFormData(e,{object_name:"content_tag"}),c("#edit_item_form").dialog("close").dialog({autoOpen:!1,title:b.t("titles.edit_item","Edit Item Details")}).dialog("open")}),c("#edit_item_form .cancel_button").click(function(a){c("#edit_item_form").dialog("close")}),c("#edit_item_form").formSubmit({beforeSubmit:function(a){c(this).loadingImage()},success:function(a){c(this).loadingImage("remove");var b=c("#context_module_"+a.content_tag.context_module_id),d=modules.addItemToModule(b,a.content_tag);b.find(".context_module_items").sortable("refresh"),c(this).dialog("close")},error:function(a){c(this).loadingImage("remove"),c(this).formErrors(a)}}),c(".delete_item_link").live("click",function(a){a.preventDefault(),c(this).parents(".context_module_item").confirmDelete({url:c(this).attr("href"),message:b.t("confirm.delete_item","Are you sure you want to remove this item from the module?"),success:function(a){c(this).slideUp(function(){c(this).remove(),modules.updateTaggedItems()})}})}),c(".edit_module_link").live("click",function(a){a.preventDefault(),modules.editModule(c(this).parents(".context_module"))}),c(".add_module_link").live("click",function(a){a.preventDefault();var b=c("#context_module_blank").clone(!0).attr("id","context_module_new");c("#context_modules").append(b),b.find(".context_module_items").sortable(modules.sortable_module_options),c("#context_modules").sortable("refresh"),c("#context_modules .context_module .context_module_items").each(function(){c(this).sortable("refresh"),c(this).sortable("option","connectWith",".context_module_items")}),modules.editModule(b)}),c(".add_module_item_link").live("click",function(d){d.preventDefault();var e=c(this).closest(".context_module");if(e.hasClass("collapsed_module")){e.find(".expand_module_link").triggerHandler("click",function(){e.find(".add_module_item_link").click()});return}if(a&&a.selectContentDialog){var f=c(this).parents(".context_module").find(".header").getTemplateData({textValues:["name","id"]}),g={for_modules:!0};g.select_button_text=b.t("buttons.add_item","Add Item"),g.holder_name=f.name,g.dialog_title=b.t("titles.add_item","Add Item to %{module}",{module:f.name}),g.submit=function(a){var b=c("#context_module_"+f.id),d=modules.addItemToModule(b,a);b.find(".context_module_items").sortable("refresh");var e=b.find(".add_module_item_link").attr("rel");d.loadingImage({image_size:"small"}),c.ajaxJSON(e,"POST",a,function(c){d.loadingImage("remove"),d.remove(),c.content_tag.type=a["item[type]"],modules.addItemToModule(b,c.content_tag),b.find(".context_module_items").sortable("refresh"),modules.updateAssignmentData()})},a.selectContentDialog(g)}}),c("#add_module_prerequisite_dialog .cancel_button").click(function(){c("#add_module_prerequisite_dialog").dialog("close")}),c(".delete_prerequisite_link").live("click",function(a){a.preventDefault();var b=c(this).parents(".criterion"),d=[];c(this).parents(".context_module .prerequisites .criterion").each(function(){if(c(this)[0]!=b[0]){var a=c(this).getTemplateData({textValues:["id","type"]}),e=a.type=="context_module"?"module":a.type;d.push(e+"_"+a.id)}});var e=c(this).parents(".context_module").find(".edit_module_link").attr("href"),f={"context_module[prerequisites]":d.join(",")};b.dim(),c.ajaxJSON(e,"PUT",f,function(a){c("#context_module_"+a.context_module.id).triggerHandler("update",a)})}),c("#add_module_prerequisite_dialog .submit_button").click(function(){var a=c("#add_module_prerequisite_dialog .prerequisite_module_select select").val();if(!a)return;c("#add_module_prerequisite_dialog").loadingImage();var b=[];b.push("module_"+a);var d=c("#context_module_"+c("#add_module_prerequisite_dialog").getTemplateData({textValues:["context_module_id"]}).context_module_id);d.find(".prerequisites .criterion").each(function(){b.push("module_"+c(this).getTemplateData({textValues:["id","name","type"]}).id)});var e=d.find(".edit_module_link").attr("href"),f={"context_module[prerequisites]":b.join(",")};c.ajaxJSON(e,"PUT",f,function(a){c("#add_module_prerequisite_dialog").loadingImage("remove"),c("#add_module_prerequisite_dialog").dialog("close"),c("#context_module_"+a.context_module.id).triggerHandler("update",a)},function(a){c("#add_module_prerequisite_dialog").loadingImage("remove"),c("#add_module_prerequisite_dialog").formErrors(a)})}),c(".context_module .add_prerequisite_link").live("click",function(a){a.preventDefault();var d=c(this).parents(".context_module").find(".header").getTemplateData({textValues:["name","id"]});c("#add_module_prerequisite_dialog").fillTemplateData({data:{module_name:d.name,context_module_id:d.id}});var e=c(this).parents(".context_module"),f=c("#module_list").clone(!0).removeAttr("id");f.find("."+e.attr("id")).remove();var g=[];c("#context_modules .context_module").each(function(){(c(this)[0]==e[0]||g.length>0)&&g.push(c(this).getTemplateData({textValues:["id"]}).id)});for(var h in g)f.find(".context_module_"+g[h]).attr("disabled",!0);c("#add_module_prerequisite_dialog").find(".prerequisite_module_select").empty().append(f.show()),c("#add_module_prerequisite_dialog").dialog("close").dialog({autoOpen:!0,title:b.t("titles.add_prerequisite","Add Prerequisite to %{module}",{module:d.name}),width:400}).dialog("open")}),c("#add_context_module_form .cancel_button").click(function(a){modules.hideEditModule(!0)}),setTimeout(function(){var a=[];c("#context_modules .context_module_items").each(function(){a.push(c(this))});var b=function(){if(a.length>0){var c=a.shift();c.sortable(modules.sortable_module_options),setTimeout(b,10)}};b(),c("#context_modules").sortable({handle:".reorder_module_link",helper:"clone",containment:"#context_modules_sortable_container",axis:"y",update:function(a,b){var d=[];c("#context_modules .context_module").each(function(){d.push(c(this).attr("id").substring("context_module_".length))});var e=c(".reorder_modules_url").attr("href");c("#context_modules").loadingImage(),c.ajaxJSON(e,"POST",{order:d.join(",")},function(a){c("#context_modules").loadingImage("remove");for(var b in a){var d=a[b];c("#context_module_"+d.context_module.id).triggerHandler("update",d)}},function(a){c("#context_modules").loadingImage("remove")})}}),modules.refreshModuleList(),modules.refreshed=!0},1e3)},modules})