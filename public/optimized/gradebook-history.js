require(["i18n","jquery","jquery.ajaxJSON","jquery.instructure_date_and_time"],function(a,b){a=a.scoped("gradebook");var c={init:function(){b(".assignment_header").click(function(a){a.preventDefault(),b(this).find(".ui-icon").toggleClass("ui-icon-circle-arrow-n").end().next(".assignment_details").slideToggle("fast")}),b(".revert-grade-link").bind("mouseenter mouseleave",function(){b(this).toggleClass("ui-state-hover")}).click(c.handleGradeSubmit)},handleGradeSubmit:function(c){c.preventDefault();var d=b(this).parents("tr").data("assignment-id"),e=b(this).parents("tr").data("user-id"),f=b(this).find(".grade").text().replace("--",""),g=b(".update_submission_grade_url").attr("href"),h=b(".update_submission_grade_url").attr("title");b(".assignment_"+d+"_user_"+e+"_current_grade").addClass("loading");var i={"submission[assignment_id]":d,"submission[user_id]":e,"submission[grade]":f};b.ajaxJSON(g,h,i,function(c){b.each(c,function(){var c=this.submission;b(".assignment_"+c.assignment_id+"_user_"+c.user_id+"_current_grade").removeClass("loading").attr("title",a.t("graded_by_me","%{graded_time} by me",{graded_time:b.parseFromISO(c.graded_at).datetime_formatted})).text(c.grade||"--")})})}};b(document).ready(c.init)})