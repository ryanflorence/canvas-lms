require(["i18n","jquery","jquery.ajaxJSON","jquery.instructure_forms","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.keycodes","jquery.loadingImg","jquery.templateData"],function(a,b){a=a.scoped("sub_accounts"),b(function(b){b(".add_sub_account_link").click(function(){return b("<li class='sub_account'/>").append(b("#account_blank").clone(!0).attr("id","account_new").show()).appendTo(b(this).parents(".account:first").children(".sub_accounts")).find(".edit_account_link").click(),!1}),b(".account .header").hover(function(){b(this).addClass("header_hover")},function(){b(this).removeClass("header_hover")}),b(".edit_account_link").click(function(){return b(this).parents(".account:first").addClass("editing_account").find(":text:visible:first").focus().select(),!1}),b(".account_name").blur(function(){b(this).parents("form").hasClass("saving")||b(this).parents(".account:first").removeClass("editing_account").attr("id")=="account_new"&&b(this).parents(".sub_account:first").remove()}).keycodes("esc",function(){b(this).triggerHandler("blur")}),b(".edit_sub_account_form").formSubmit({processData:function(a){return a["account[parent_account_id]"]=b(this).parents(".account:first").parents(".account:first").children(".header").getTemplateData({textValues:["id"]}).id,a},beforeSubmit:function(a){b(this).loadingImage({image_size:"small"}).addClass("saving")},success:function(a){var c=a.account;b(this).loadingImage("remove").removeClass("saving"),b(this).parents(".header").fillTemplateData({data:c,hrefValues:["id"]}).fillFormData(c,{object_name:"account"}).parents(".account:first").removeClass("editing_account");var d=b.replaceTags(b("#sub_account_urls .sub_account_url").attr("href"),"id",c.id);b(this).attr({action:d,method:"PUT"}),b(this).parents(".account:first").attr("id","account_"+c.id)}}),b(".cant_delete_account_link").click(function(){return alert(a.t("alerts.subaccount_has_courses","You can't delete a sub-account that has courses in it")),!1}),b(".delete_account_link").click(function(){return b(this).parents(".account:first").children(".sub_account > li").length?alert(a.t("alerts.subaccount_has_subaccounts","You can't delete a sub-account that has sub-accounts")):b(this).parents("li:first").confirmDelete({url:b(this).parents(".header").find("form").attr("action"),message:a.t("confirms.delete_subaccount","Are you sure you want to delete this sub-account?"),success:function(){b(this).slideUp(function(){b(this).remove()})}}),!1}),b(".collapse_sub_accounts_link").click(function(){var a=b(this).parents(".header:first");return a.closest(".account").children("ul").slideUp(),a.find(".expand_sub_accounts_link").show(),a.find(".collapse_sub_accounts_link, .add_sub_account_link").hide(),!1}),b(".expand_sub_accounts_link").click(function(){var c=b(this).parents(".header:first");return c.parent(".account").children("ul").children(".sub_account").length?(c.parent(".account").children("ul").slideDown(),c.find(".expand_sub_accounts_link").hide(),c.find(".collapse_sub_accounts_link, .add_sub_account_link").show()):(c.loadingImage({image_size:"small"}),b.ajaxJSON(b(this).attr("href"),"GET",{},function(d){c.loadingImage("remove").find(".expand_sub_accounts_link").hide(),c.find(".collapse_sub_accounts_link, .add_sub_account_link").show(),c.parent(".account").children("ul").empty().hide();var e=null;for(var f in d)e=d[f];for(var f in e.sub_accounts){var g=null;for(var h in e.sub_accounts[f])typeof e.sub_accounts[f][h]=="object"&&(g=e.sub_accounts[f][h]);g.courses_count=a.t("courses_count",{one:"1 Course",other:"%{count} Courses"},{count:g.course_count}),g.sub_accounts_count=a.t("sub_accounts_count",{one:"1 Sub-Account",other:"%{count} Sub-Accounts"},{count:g.sub_account_count}),b("<li class='sub_account'/>").append(b("#account_blank").clone(!0).attr("id","account_new").show().attr("id","account_"+g.id).fillFormData(g,{object_name:"account"})).fillTemplateData({data:g,hrefValues:["id"]}).appendTo(c.parent(".account").children("ul")).find(".sub_accounts_count").showIf(g.sub_account_count).end().find(".courses_count").showIf(g.course_count).end().find(".collapse_sub_accounts_link").hide().end().find(".expand_sub_accounts_link").showIf(g.sub_account_count>0).end().find(".add_sub_account_link").showIf(g.sub_account_count==0).end().find(".edit_sub_account_form").attr({action:b.replaceTags(b("#sub_account_urls .sub_account_url").attr("href"),"id",g.id),method:"PUT"})}c.parent(".account").children("ul").slideDown()},function(a){})),!1})})})