require(["i18n","jquery","wikiSidebar","jquery.instructure_date_and_time","jquery.instructure_forms","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.loadingImg","jquery.templateData","tinymce.editor_box","vendor/date"],function(a,b,c){a=a.scoped("calendar_events");var d=a.t("no_content","No Content");b(function(a){function g(d){b.show(),e.hide().find("textarea").editorBox("destroy"),c&&(c.hide(),a("#sidebar_content").show()),d&&e.hasClass("new_event")&&(window.location.href=a(".calendar_url").attr("href"))}function h(){b.hide();var f=b.getTemplateData({textValues:["start_at_date_string","start_at_time_string","end_at_time_string","title","all_day","all_day_date"]});f.description==d&&(f.description=""),f.start_date=f.start_at_date_string,f.start_date=a("#full_calendar_event .start_at_date_string").attr("title"),f.start_time=f.start_at_time_string,f.end_time=f.end_at_time_string,f.all_day=="true"&&(f.all_day_date&&(f.start_date=f.all_day_date),f.start_time="",f.end_time=""),e.fillFormData(f,{object_name:"calendar_event"}).show().find("textarea").editorBox(),c&&(c.attachToEditor(e.find("textarea:first")),c.show(),a("#sidebar_content").hide())}var b=a("#full_calendar_event"),e=a("#edit_calendar_event_form"),f=a("#full_calendar_event_holder");c&&c.init(),a(".date_field").date_field(),a(".time_field").time_field(),a(".delete_event_link").click(function(b){b.preventDefault(),a("#full_calendar_event_holder").confirmDelete({message:"Are you sure you want to delete this event?",url:a(this).attr("href"),success:function(){a(this).fadeOut("slow"),window.location.href=a(".calendar_url").attr("href")}})}),a(".switch_full_calendar_event_view").click(function(){return a("#calendar_event_description").editorBox("toggle"),!1}),a(".edit_calendar_event_link").click(function(){return h(),!1}),e.find(".cancel_button").click(function(){return g(!0),!1}),e.formSubmit({object_name:"calendar_event",processData:function(b){return b["calendar_event[start_at]"]=a.datetime.process(b.start_date+" "+b.start_time),b["calendar_event[end_at]"]=a.datetime.process(b.start_date+" "+b.end_time),b["calendar_event[description]"]=a(this).find("textarea").editorBox("get_code"),f.fillTemplateData({data:b,except:["description"]}),b},beforeSubmit:function(a){g(),f.loadingImage()},success:function(b){var c=b.calendar_event,d=a.parseFromISO(c.start_at),e=a.parseFromISO(c.end_at),g=Date.parse(c.all_day_date);c.start_at_date_string=d.date_formatted,c.start_at_time_string=d.time_formatted,c.end_at_time_string=e.time_formatted,c.all_day_date=g||"",f.find(".from_string,.to_string,.end_at_time_string").showIf(c.end_at&&c.end_at!=c.start_at),f.find(".at_string").showIf(!c.end_at||c.end_at==c.start_at),f.find(".not_all_day").showIf(!c.all_day),f.loadingImage("remove").fillTemplateData({data:c,htmlValues:["description"]}),f.find(".start_at_date_string").attr("title",c.start_at_date_string),a(this).find("textarea").editorBox("set_code",c.description);var h=null,i=null;c.start_at&&(i=c.start_at.substring(0,4),h=c.start_at.substring(5,7));var j=a(".base_calendar_url").attr("href"),k=j.split(/#/),l=k[1],m=k[0],n={};try{n=a.parseJSON(l)||{}}catch(o){n={}}h&&i&&(n.month=h,n.year=i),a(".calendar_url").attr("href",m+"#"+a.encodeToHex(JSON.stringify(n))),f.hasClass("editing")&&(window.location.href=a(".calendar_url").attr("href"))},error:function(b){f.loadingImage("remove"),a(".edit_calendar_event_link:first").click(),e.formErrors(b)}}),setTimeout(function(){f.hasClass("editing")&&a(".edit_calendar_event_link:first").click()},500),a(document).fragmentChange(function(b,c){c=="#edit"&&a(".edit_calendar_event_link:first").click()}),a.scrollSidebar()})}),define("calendar_event",function(){}),function(){require(["calendar_event"])}.call(this),define("compiled/bundles/calendar_event",function(){})