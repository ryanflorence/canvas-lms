(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define("compiled/grade_calculator",["INST","jquery","jquery.instructure_misc_helpers"],function(b,c){var d;return d=function(){function b(){}return b.calculate=function(b,d,e){var f;return f={},f.group_sums=c.map(d,a(function(a){return{group:a,current:this.create_group_sum(a,b,!0),"final":this.create_group_sum(a,b,!1)}},this)),f.current=this.calculate_total(f.group_sums,!0,e),f["final"]=this.calculate_total(f.group_sums,!1,e),f},b.create_group_sum=function(a,b,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D;l={submissions:[],score:0,possible:0,submission_count:0},w=a.assignments;for(m=0,q=w.length;m<q;m++){e=w[m],f={score:0,possible:0,percent:0,drop:!1,submitted:!1},k=c.detect(b,function(){return this.assignment_id===e.id}),k==null&&(k={score:null}),k.assignment_group_id=a.id,(x=k.points_possible)==null&&(k.points_possible=e.points_possible),f.submission=k,l.submissions.push(f);if(!d||k.score!=null&&k.score!=="")f.score=this.parse(k.score),f.possible=this.parse(e.points_possible),f.percent=this.parse(f.score/f.possible),f.submitted=k.score!=null&&k.score!=="",f.submitted&&(l.submission_count+=1)}l.submissions.sort(function(a,b){return a.percent-b.percent}),i=c.extend({drop_lowest:0,drop_highest:0,never_drop:[]},a.rules),g=0,y=["low","high"];for(n=0,r=y.length;n<r;n++){h=y[n],z=l.submissions;for(o=0,s=z.length;o<s;o++)f=z[o],!f.drop&&i["drop_"+h+"est"]>0&&c.inArray(f.assignment_id,i.never_drop)===-1&&f.possible>0&&f.submitted&&(f.drop=!0,(A=f.submission)!=null&&(A.drop=!0),i["drop_"+h+"est"]-=1,g+=1)}g>0&&g===l.submission_count&&(l.submissions[l.submissions.length-1].drop=!1,(B=l.submissions[l.submissions.length-1].submission)!=null&&(B.drop=!1),g-=1),l.submission_count-=g,C=l.submissions;for(p=0,t=C.length;p<t;p++)j=C[p],j.drop||(l.score+=j.score);D=l.submissions;for(v=0,u=D.length;v<u;v++)j=D[v],j.drop||(l.possible+=j.possible);return l},b.calculate_total=function(a,b,c){var d,e,f,g,h,i,j,k,l;e=b?"current":"final";if(c==="percent"){h=0,g=0,j=0;for(k=0,l=a.length;k<l;k++)d=a[k],d.group.group_weight>0&&(d[e].submission_count>0&&d[e].possible>0&&(i=d[e].score/d[e].possible,h+=d.group.group_weight*i,g+=d.group.group_weight),j+=d.group.group_weight);return b&&g<100&&(f=j<100?j:100,h=h*f/g),{score:h,possible:100}}return{score:this.sum(function(){var b,c,f;f=[];for(b=0,c=a.length;b<c;b++)d=a[b],f.push(d[e].score);return f}()),possible:this.sum(function(){var b,c,f;f=[];for(b=0,c=a.length;b<c;b++)d=a[b],f.push(d[e].possible);return f}())}},b.sum=function(a){var b,c,d,e;b=0;for(d=0,e=a.length;d<e;d++)c=a[d],b+=c;return b},b.parse=function(a){var b;return b=parseFloat(a),b&&isFinite(b)?b:0},b.letter_grade=function(a,b){var d,e;return b<0&&(b=0),e=c.grep(a,function(c,d){return b>=c[1]*100||d===a.length-1}),d=e[0],d[0]},b}(),window.INST.GradeCalculator=d})}).call(this),require(["INST","i18n","jquery","jquery.ajaxJSON","jquery.instructure_forms","jquery.instructure_misc_helpers","jquery.instructure_misc_plugins","jquery.templateData","media_comments"],function(a,b,c){function d(a,b){if(b.length===0)return;var d=b.getTemplateData({textValues:["assignment_group_id","rules","group_weight"]});d=c.extend(d,b.getFormData());var e=a[d.assignment_group_id]||{};e.group_weight||(e.group_weight=parseFloat(d.group_weight)/100),e.scores=e.scores||[],e.full_points=e.full_points||[],e.count=e.count||0,e.submissions=e.submissions||[],e.sorted_submissions=e.sorted_submissions||[],isNaN(e.score_total)&&(e.score_total=null),isNaN(e.full_total)&&(e.full_total=null);if(e.score_total!==null||e.full_total!==null){e.calculated_score=e.score_total/e.full_total;if(isNaN(e.calculated_score)||!isFinite(e.calculated_score))e.calculated_score=0}else e.score_total=0,e.full_total=0;if(!e.rules){d.rules=d.rules||"";var f={drop_highest:0,drop_lowest:0,never_drop:[]},g=d.rules.split("\n");for(var h in g){var i=g[h].split(":"),j=null;i.length>1&&(j=parseInt(i[1],10)),j&&!isNaN(j)&&isFinite(j)&&(i[0]=="drop_lowest"?f.drop_lowest=j:i[0]=="drop_highest"?f.drop_highest=j:i[0]=="never_drop"&&f.never_drop.push(j))}e.rules=f}return a[d.assignment_group_id]=e,e}function e(){var e=c("#only_consider_graded_assignments").attr("checked"),f=c("#grades_summary .student_assignment"),g={},h=c(".group_total");h.each(function(){d(g,c(this))}),f.removeClass("dropped"),f.each(function(){var a=c(this),b;if(a.hasClass("hard_coded"))return;var f=a.getTemplateData({textValues:["assignment_group_id","score","points_possible","assignment_id"]});if((!f.score||isNaN(parseFloat(f.score)))&&e){c(this).addClass("dropped");return}var h=g[f.assignment_group_id];h||(h=d(g,c("#submission_group-"+f.assignment_group_id)));if(!h)return;var i=parseFloat(f.score);if(!i||isNaN(i)||!isFinite(i))i=0;var j=parseFloat(f.points_possible);if(!j||isNaN(j))j=0;var k=i/j;if(isNaN(k)||!isFinite(k))k=0;f.calculated_score=i,f.calculated_possible=j,f.calculated_percent=k,h.submissions.push(f),g[f.assignment_group_id]=h});for(var i in g){var j=g[i];j.sorted_submissions=j.submissions.sort(function(a,b){var c=[a.calculated_percent],d=[b.calculated_percent];return c>d?1:c==d?0:-1});var k=0,l=0;for(var m=0;m<j.sorted_submissions.length;m++)j.sorted_submissions[m].calculated_drop=!1;for(m=0;m<j.sorted_submissions.length;m++)submission=j.sorted_submissions[m],!submission.calculated_drop&&k<j.rules.drop_lowest&&submission.calculated_possible>0&&c.inArray(submission.assignment_id,j.rules.never_drop)==-1&&(k++,submission.calculated_drop=!0),j.sorted_submissions[m]=submission;for(m=j.sorted_submissions.length-1;m>=0;m--)submission=j.sorted_submissions[m],!submission.calculated_drop&&l<j.rules.drop_highest&&submission.calculated_possible>0&&c.inArray(submission.assignment_id,j.rules.never_drop)==-1&&(l++,submission.calculated_drop=!0),j.sorted_submissions[m]=submission;for(m=0;m<j.sorted_submissions.length;m++)submission=j.sorted_submissions[m],submission.calculated_drop?(c("#submission_"+submission.assignment_id).addClass("dropped"),k++):(c("#submission_"+submission.assignment_id).removeClass("dropped"),j.scores.push(submission.calculated_score),j.full_points.push(submission.calculated_possible),j.count++,j.score_total+=submission.calculated_score,j.full_total+=submission.calculated_possible);g[i]=j}var n=0,o=0,p=0,q=0,r=0;c.each(g,function(a,b){var f=d(g,c("#submission_group-"+a)),h=Math.round(b.calculated_score*1e3)/10;c("#submission_group-"+a).find(".grade").text(h).end().find(".score_teaser").text(b.score_total+" / "+b.full_total),h=b.calculated_score*b.group_weight;if(isNaN(h)||!isFinite(h))h=0;e&&b.count>0&&(q+=b.group_weight),n+=h,r+=b.score_total,p+=b.full_total});var s=parseFloat(c("#total_groups_weight").text());if(isNaN(s)||!isFinite(s)||s===0)o=Math.round(1e3*r/p)/10,c(".student_assignment.final_grade .score_teaser").text(r+" / "+p);else{var t=parseFloat(c("#total_groups_weight").text())/100;if(isNaN(t)||!isFinite(t)||t===0)t=1;if(e&&q<1){var u=t<1?t:1;n=u*n/q}o=n,o=Math.round(o*1e3)/10,c(".student_assignment.final_grade .score_teaser").text(b.t("percent","Percent"))}if(isNaN(o)||!isFinite(o))o=0;c(".student_assignment.final_grade").find(".grade").text(o),window.grading_scheme&&c(".final_letter_grade .grade").text(a.GradeCalculator.letter_grade(grading_scheme,o)),c(".revert_all_scores").showIf(c("#grades_summary .revert_score_link").length>0);var v=(new Date).getTime()}b=b.scoped("gradebook"),c(document).ready(function(){e(),c(".revert_all_scores_link").click(function(a){a.preventDefault(),c("#grades_summary .revert_score_link").each(function(){c(this).trigger("click",!0)}),c("#.show_guess_grades.exists").show(),e()}),c("tr.student_assignment").mouseover(function(){c(this).hasClass("dropped")?c(this).attr("title",b.t("titles.dropped_assignment_no_total","This assignment will not be considered in the total calculation")):c(this).attr("title","")}),c(".toggle_comments_link").click(function(a){a.preventDefault(),c(this).parents("tr.student_assignment").next("tr.comments").toggle()}),c(".toggle_rubric_assessments_link").click(function(a){a.preventDefault(),c(this).parents("tr.student_assignment").next("tr.comments").next("tr.rubric_assessments").toggle()}),c(".student_assignment.editable .assignment_score").click(function(a){if(c("#grades_summary.editable").length===0||c(this).find("#grade_entry").length>0||c(a.target).closest(".revert_score_link").length>0)return;c(this).find(".grade").data("originalValue")||c(this).find(".grade").data("originalValue",c(this).find(".grade").html()),c(this).find(".grade").empty().append(c("#grade_entry")),c(this).find(".score_value").hide();var b=c(this).parents(".student_assignment").find(".score").text();c("#grade_entry").val(b).show().focus().select()}),c("#grade_entry").keydown(function(a){if(a.keyCode==13)c(this).blur();else if(a.keyCode==27){var b=c(this).parents(".student_assignment").addClass("dont_update").find(".original_score").text();c(this).val(b||"").blur()}}),c("#grades_summary .student_assignment").bind("score_change",function(a,d){var f=c(this),g=parseFloat(f.find(".original_score").text());isNaN(g)&&(g=null);var h=f.find("#grade_entry").val()||c(this).find(".score").text();h=parseFloat(h),isNaN(h)&&(h=null),!h&&h!==0&&(h=g);var i=g!=h;h==parseInt(h,10)&&(h+=".0"),f.find(".score").text(h),f.hasClass("dont_update")&&(d=!1,f.removeClass("dont_update"));if(d){i||(h=null);var j=f.getTemplateData({textValues:["assignment_id"]}).assignment_id,k=c.replaceTags(c(".update_submission_url").attr("href"),"assignment_id",j);c.ajaxJSON(k,"PUT",{"submission[student_entered_score]":h},function(a){a={student_entered_score:a.submission.student_entered_score},f.fillTemplateData({data:a})},function(){}),i||(h=g)}c("#grade_entry").hide().appendTo(c("body"));if(i)f.find(".assignment_score").attr("title","").find(".score_teaser").text(b.t("titles.hypothetical_score","This is a What-If score")).end().find(".score_holder").append(c("#revert_score_template").clone(!0).attr("id","").show()).find(".grade").addClass("changed");else{var l=f.data("muted")?b.t("student_mute_notification","Instructor is working on grades"):b.t("click_to_change","Click to test a different score");f.find(".assignment_score").attr("title",b.t("click_to_change","Click to test a different score")).find(".score_teaser").text(l).end().find(".grade").removeClass("changed"),f.find(".revert_score_link").remove()}h===0&&(h="0.0"),f.find(".grade").html(h||f.find(".grade").data("originalValue")),e()}),c("#grade_entry").blur(function(){var a=c(this).parents(".student_assignment");a.find(".score").text(c(this).val()),a.triggerHandler("score_change",!0)}),c("#grades_summary").delegate(".revert_score_link","click",function(a,d){a.preventDefault(),a.stopPropagation();var f=c(this).parents(".student_assignment"),g=f.find(".original_score").text(),h=f.data("muted")?b.t("student_mute_notification","Instructor is working on grades"):b.t("click_to_change","Click to test a different score");f.find(".score").text(g),f.data("muted")?f.find(".grade").html('<img alt="Muted" class="muted_icon" src="/images/sound_mute.png?1318436336">'):f.find(".grade").text(g||"-"),f.find(".assignment_score").attr("title",b.t("click_to_change","Click to test a different score")).find(".score_teaser").text(h).end().find(".grade").removeClass("changed"),f.find(".revert_score_link").remove(),f.find(".score_value").text(g),d||e()}),c("#grades_summary:not(.editable) .assignment_score").css("cursor","default"),c("#grades_summary tr").hover(function(){c(this).find("td.title .context").addClass("context_hover")},function(){c(this).find("td.title .context").removeClass("context_hover")}),c(".show_guess_grades_link").click(function(a){c("#grades_summary .student_entered_score").each(function(){var a=parseFloat(c(this).text(),10);if(!isNaN(a)&&(a||a===0)){var b=c(this).parents(".student_assignment");b.find(".score").text(a),b.find(".score_value").hide(),b.triggerHandler("score_change",!1)}}),c(".show_guess_grades").hide()}),c("#grades_summary .student_entered_score").each(function(){var a=parseFloat(c(this).text(),10);!isNaN(a)&&a&&c(".show_guess_grades").show().addClass("exists")}),c(".comments .play_comment_link").mediaCommentThumbnail("normal"),c(".play_comment_link").live("click",function(a){a.preventDefault();var b=c(this).parents(".comment_media"),d=b.getTemplateData({textValues:["media_comment_id"]}).media_comment_id;d&&(b.children(":not(.media_comment_content)").remove(),b.find(".media_comment_content").mediaComment("show_inline",d,"any"))}),c("#only_consider_graded_assignments").change(function(){e()}).triggerHandler("change"),c("#show_all_details_link").click(function(a){a.preventDefault(),c("tr.comments").show(),c("tr.rubric_assessments").show()}),c.scrollSidebar()})}),define("grade_summary",function(){}),function(){require(["grade_summary","compiled/grade_calculator"])}.call(this),define("compiled/bundles/grade_summary",function(){})