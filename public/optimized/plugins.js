require(["i18n","jquery","jquery.instructure_misc_plugins"],function(a,b){a=a.scoped("plugins"),b("form.edit_plugin_setting").live("submit",function(){b(this).find("button").attr("disabled",!0).filter(".save_button").text(a.t("buttons.saving","Saving..."))}),b(document).ready(function(){b(".disabled_checkbox").change(function(){b("#settings .plugin_settings").showIf(!b(this).attr("checked"))}).change()})})