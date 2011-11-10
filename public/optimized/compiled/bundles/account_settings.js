require(["i18n","jquery","jquery.ajaxJSON","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.loadingImg","tinymce.editor_box","vendor/date","vendor/jquery.scrollTo","jqueryui/tabs"],function(a,b){a=a.scoped("account_settings"),b(document).ready(function(){b("#account_settings").submit(function(){b(".ip_filter .value").each(function(){b(this).removeAttr("name")}).filter(":not(.blank)").each(function(){var a=b.trim(b(this).parents(".ip_filter").find(".name").val().replace(/\[|\]/g,"_"));a&&b(this).attr("name","account[ip_filters]["+a+"]")})}),b(".datetime_field").datetime_field(),b(".add_notification_link").click(function(a){a.preventDefault(),b("#add_notification_form").slideToggle(function(){b("#add_notification_form textarea:not(.enabled)").addClass("enabled").editorBox()})}),b("#add_notification_form .datetime_field").bind("blur change",function(){var a=Date.parse(b(this).val());a&&(a=a.toString(b.datetime.defaultFormat)),b(this).val(a)}),b("#add_notification_form").submit(function(a){var c=b(this).validateForm({object_name:"account_notification",required:["start_at","end_at","subject","message"],date_fields:["start_at","end_at"]});if(!c)return!1}),b(".delete_notification_link").click(function(c){c.preventDefault();var d=b(this);d.parents("li").confirmDelete({url:d.attr("rel"),message:a.t("confirms.delete_alert","Are you sure you want to delete this alert?"),success:function(){b(this).slideUp(function(){b(this).remove()})}})}),b("#account_settings_tabs").tabs().show(),b(".add_ip_filter_link").click(function(a){a.preventDefault();var c=b(".ip_filter.blank:first").clone(!0).removeClass("blank");b("#ip_filters").append(c.show())}),b(".delete_filter_link").click(function(a){a.preventDefault(),b(this).parents(".ip_filter").remove()}),b(".ip_filter:not(.blank)").length==0&&b(".add_ip_filter_link").click(),b(".ip_help_link").click(function(c){c.preventDefault(),b("#ip_filters_dialog").dialog("close").dialog({autoOpen:!1,title:a.t("titles.what_are_quiz_ip_filters","What are Quiz IP Filters?"),width:400}).dialog("open")});var c=b(".custom_help_link.blank").detach().removeClass("blank"),d=1e3;b(".add_custom_help_link").click(function(a){a.preventDefault();var e=c.clone(!0).appendTo("#custom_help_links").show(),f=d++;b.each(["id","name","for"],function(a,b){e.find("["+b+"]").attr(b,function(a,b){return b.replace(/\d+/,f)})})}),b(".custom_help_link .delete").click(function(a){a.preventDefault(),b(this).parents(".custom_help_link").remove()}),b(".remove_account_user_link").click(function(c){c.preventDefault();var d=b(this).parent("li");d.confirmDelete({message:a.t("confirms.remove_account_admin","Are you sure you want to remove this account admin?"),url:b(this).attr("href"),success:function(){d.slideUp(function(){b(this).remove()})}})}),b("#turnitin, #account_settings_global_includes, #enable_equella").change(function(){var a=b("#"+b(this).attr("id")+"_settings"),c=b(this).attr("checked");a.showIf(c),c||a.find("input,textarea").val("")}).change(),b(".turnitin_account_settings").change(function(){b(".confirm_turnitin_settings_link").text(a.t("links.turnitin.confirm_settings","confirm Turnitin settings"))}),b(".confirm_turnitin_settings_link").click(function(c){c.preventDefault();var d=b(this),e=d.attr("href"),f=b("#account_settings").getFormData({object_name:"account"});e=b.replaceTags(b.replaceTags(e,"account_id",f.turnitin_account_id),"shared_secret",f.turnitin_shared_secret),d.text(a.t("notices.turnitin.checking_settings","checking Turnitin settings...")),b.ajaxJSON(e,"GET",{},function(b){b&&b.success?d.text(a.t("notices.turnitin.setings_confirmed","Turnitin settings confirmed!")):d.text(a.t("notices.turnitin.invalid_settings","invalid Turnitin settings, please check your account id and shared secret from Turnitin"))},function(b){d.text(a.t("notices.turnitin.invalid_settings","invalid Turnitin settings, please check your account id and shared secret from Turnitin"))})}),b(".add_users_link").click(function(a){var c=b("#enroll_users_form");b(this).hide(),a.preventDefault(),c.show(),b("html,body").scrollTo(c),c.find("textarea").focus().select()}),b(".open_report_description_link").click(function(a){a.preventDefault();var c=b(this).parents(".title").find("span.title").text();b(this).parent(".reports").find(".report_description").dialog("close").dialog({title:c,width:800})}),b(".run_report_link").click(function(a){a.preventDefault(),b(this).parent("form").submit()}),b(".run_report_form").formSubmit({resetForm:!0,beforeSubmit:function(a){return b(this).loadingImage(),!0},success:function(a){b(this).loadingImage("remove");var c=b(this).find('input[name="report_type"]').val();b("#"+c).find(".run_report_link").hide().end().find(".configure_report_link").hide().end().find(".running_report_message").show(),b(this).parent(".report_dialog").dialog("close")},error:function(a){b(this).loadingImage("remove"),b(this).parent(".report_dialog").dialog("close")}}),b(".configure_report_link").click(function(c){c.preventDefault(),b(this).parent("td").find(".report_dialog").clone(!0).dialog({width:400,title:a.t("titles.configure_report","Configure Report")})}),b(".service_help_dialog").each(function(a){var c=b(this),d=c.attr("id").replace("_help_dialog","");c.dialog({autoOpen:!1,width:560}),b('<a class="help" href="#">&nbsp;</a>').click(function(a){a.preventDefault(),c.dialog("open")}).appendTo('label[for="account_services_'+d+'"]')})})}),define("account_settings",function(){}),require(["i18n","jquery","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","jquery.templateData"],function(a,b){a=a.scoped("external_tools"),b(document).ready(function(){var c=b("#external_tools_dialog");b(".add_tool_link").click(function(d){d.preventDefault();var e={domain:"",url:"",config_url:"",config_xml:"",description:"",name:"",custom_fields_string:"",privacy:"anonymous",consumer_key:"",shared_secret:""};c.dialog("close").dialog({autoOpen:!1,title:a.t("titles.edit_external_tool","Edit External Tool"),width:600,height:420}).dialog("open"),c.find(".shared_secret_note").hide(),c.find("form").attr("method","POST").attr("action",c.find(".external_tools_url").attr("href")),c.fillFormData(e,{object_name:"external_tool"}),c.find(".config_type_option").show(),b("#external_tool_match_by").val("domain").change(),b("#external_tool_config_type").val("manual").change()}),c.find("form").formSubmit({beforeSubmit:function(c){b(this).find("button").attr("disabled",!0).filter(".save_button").text(a.t("messages.saving_tool_settings","Saving Tool Settings..."))},success:function(d){b(this).find("button").attr("disabled",!1).filter(".save_button").text(a.t("buttons.save_tool_settings","Save Tool Settings")),c.dialog("close");var e=b("#external_tool_"+d.id);e.length==0&&(e=b("#external_tool_blank").clone(!0).removeAttr("id"),b("#external_tools").append(e)),e.fillTemplateData({data:d,dataValues:["id","workflow_state"],hrefValues:["id"],id:"external_tool_"+d.id}),e.toggleClass("has_editor_button",d.has_editor_button).toggleClass("has_resource_selection",d.has_resource_selection).toggleClass("has_course_navigation",d.has_course_navigation).toggleClass("has_user_navigation",d.has_user_navigation).toggleClass("has_account_navigation",d.has_account_navigation),e.find(".tool_url").showIf(d.url).end().find(".tool_domain").showIf(d.domain),e.show()},error:function(c){b(this).find("button").attr("disabled",!1).filter(".save_button").text(a.t("errors.save_tool_settings_failed","Save Tool Settings Failed"))}}),c.find(".cancel_button").click(function(){c.dialog("close")}),b("#external_tools").delegate(".edit_tool_link","click",function(d){d.preventDefault();var e=b(this).parents(".external_tool"),f=e.getTemplateData({textValues:["name","description","domain","url","consumer_key","custom_fields_string"],dataValues:["id","workflow_state"]});f.privacy_level=f.workflow_state,b("#external_tool_match_by").val(f.url?"url":"domain").change(),c.find(".shared_secret_note").show(),c.find("form").attr("method","PUT").attr("action",e.find(".update_tool_url").attr("rel")),c.fillFormData(f,{object_name:"external_tool"}),c.dialog("close").dialog({autoOpen:!1,title:a.t("titles.edit_external_tool","Edit External Tool"),width:600,height:420}).dialog("open"),c.find(".config_type_option").hide(),b("#external_tool_config_type").val("manual").change()}).delegate(".delete_tool_link","click",function(c){c.preventDefault();var d=b(this).parents(".external_tool"),e=d.find(".update_tool_url").attr("rel");d.confirmDelete({url:e,message:a.t("prompts.remove_tool","Are you sure you want to remove this tool?  Any courses using this tool will no longer work."),success:function(){b(this).slideUp(function(){b(this).remove()})}})}),b("#external_tool_match_by").change(function(){b(this).val()=="url"?b(this).parents("form").find(".tool_domain").hide().find(":text").val("").end().end().find(".tool_url").show():b(this).parents("form").find(".tool_url").hide().find(":text").val("").end().end().find(".tool_domain").show()}),b("#external_tool_config_type").change(function(a){b("#external_tool_form .config_type").hide(),b("#external_tool_form .config_type."+b(this).val()).show()})})}),define("external_tools",function(){}),function(){require(["account_settings","external_tools"])}.call(this),define("compiled/bundles/account_settings",function(){})