!function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["calendar/_timeBlock"]=a(function(a,b,c,d,e){c=c||a.helpers;var f=this;return'<tr>\n  <td class="date-column"><input name="date" class="date_field" value=""/></td>\n  <td class="start-time-column"><input name="start_time" class="time_field start_time" value=""/></td>\n  <td class="separator-column">-</td>\n  <td class="end-time-column"><input name="end_time" class="time_field end_time" value=""/></td>\n  <td class="delete-column">\n    <a href="#" class="delete-block-link"><img src="/images/delete_circle.png" /></a>\n  </td>\n</tr>\n'}),Handlebars.registerPartial("calendar/timeBlock",b["calendar/_timeBlock"]),define("jst/calendar/_timeBlock",["compiled/handlebars_helpers"],function(a){return b["calendar/_timeBlock"]})}()