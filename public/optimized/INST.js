define(["jquery"],function(a){typeof INST=="undefined"&&(INST={}),INST.browser={},a.each([7,8,9],function(b,c){a("html").hasClass("ie"+c)&&(INST.browser["ie"+c]=INST.browser.ie=!0,INST.browser.version=c)}),window.devicePixelRatio&&(INST.browser.webkit=!0,INST.browser[escape(navigator.javaEnabled.toString())=="function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D"?"chrome":"safari"]=!0),INST.browser.ff=a.browser.mozilla;var b=a.map(INST.browser,function(a,b){if(a===!0)return b}).join(" ");return a(function(){a("body").addClass(b)}),INST})