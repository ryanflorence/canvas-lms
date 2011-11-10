(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["i18n","jquery","jst/CurveGradesDialog","jquery.disableWhileLoading","jquery.instructure_forms","jquery.instructure_jquery_patches","jquery.instructure_misc_plugins","vendor/jquery.ba-tinypubsub"],function(b,c,d){var e;return b=b.scoped("gradebook2"),e=function(){function d(d,e){var f;this.assignment=d,this.gradebook=e,this.curve=a(this.curve,this),f={assignment:this.assignment,action:""+this.gradebook.options.context_url+"/gradebook/update_submission",middleScore:parseInt((this.assignment.points_possible||0)*.6),showOutOf:this.assignment.points_possible>=0},this.$dialog=c(curveGradesDialog(f)),this.$dialog.formSubmit({disableWhileLoading:!0,processData:a(function(a){var c,d,e,f;c=0,d=this.curve();for(e in d)f="submissions[submission_"+e+"]",a[f+"[assignment_id]"]=a.assignment_id,a[f+"[user_id]"]=e,a[f+"[grade]"]=d[e],c++;return c===0?(this.$dialog.errorBox(b.t("errors.none_to_update","None to Update")),!1):a},this),success:a(function(a){var d,e;return this.$dialog.dialog("close"),e=function(){var b,c,e;e=[];for(b=0,c=a.length;b<c;b++)d=a[b],e.push(d.submission);return e}(),c.publish("submissions_updated",[e]),alert(b.t("alerts.scores_updated",{one:"1 Student score updated",other:"%{count} Student scores updated"},{count:a.length}))},this)}).dialog({width:350,modal:!0,resizable:!1,open:this.curve,close:a(function(){return this.$dialog.remove()},this)}).fixDialogButtons(),this.$dialog.find("#middle_score").bind("blur change keyup focus",this.curve),this.$dialog.find("#assign_blanks").change(this.curve)}return d.prototype.curve=function(){var a,b,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B;l=0,t={},h=this.$dialog.getFormData(),z=[],s=0,p=parseInt(c("#middle_score").val(),10),p/=this.assignment.points_possible;if(isNaN(p))return;B=this.gradebook.students;for(l in B)v=B[l],r=v["assignment_"+this.assignment.id].score,r>this.assignment.points_possible&&(r=this.assignment.points_possible),r<0&&(r=0),z[parseInt(r,10)]=z[parseInt(r,10)]||[],z[parseInt(r,10)].push([l,r||0]),s++;d=[.006,.012,.028,.04,.068,.106,.159,.227,.309,.401,.5,.599,.691,.773,.841,.894,.933,.96,.977,.988,1],m=(1-p)/Math.floor(d.length/2),b=[],a=[],l=0;while(l<d.length)a.push(1-m*l),b.push(Math.round((1-m*l)*this.assignment.points_possible)),l++;w=0,j={},g=0,c("#results_list").empty(),c("#results_values").empty(),k=[],l=z.length-1;while(l>=0){y=z[l]||[],r=Math.round(b[g]);for(n in y)x=y[n],j[x[0]]=r,x[1]===0&&(j[x[0]]=0),i=j[x[0]],k[i]=k[i]||[],k[i].push(x[0]);w+=y.length;while(w>d[g]*s)g++;l--}o=0,l=k.length-1;while(l>=0)e=(k[l]||[]).length,e>o&&(o=e),l--;A=15,u=0,l=k.length-1;while(l>=0)y=k[l],q=0,e=0,y||u>this.assignment.points_possible/10?(y&&(q=y.length/o,e=y.length),f=l===0?"#ee8":"#cdf",c("#results_list").prepend("<td style='padding: 1px;'><div title='"+e+" student"+(e===1?"":"s")+" will get "+l+" points' style='border: 1px solid #888; background-color: "+f+"; width: "+A+"px; height: "+100*q+"px; margin-top: "+100*(1-q)+"px;'>&nbsp;</div></td>"),c("#results_values").prepend("<td style='text-align: center;'>"+l+"</td>"),u=0):u++,l--;return c("#results_list").prepend("<td><div style='height: 100px; position: relative; width: 30px; font-size: 0.8em;'><img src='/images/number_of_students.png' alt='# of students'/><div style='position: absolute; top: 0; right: 3px;'>"+o+"</div><div style='position: absolute; bottom: 0; right: 3px;'>0</div></div></td>"),c("#results_values").prepend("<td>&nbsp;</td>"),j},d}()})}).call(this)