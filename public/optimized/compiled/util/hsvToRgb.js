(function(){define("compiled/util/hsvToRgb",function(){var a;return a=function(a,b,c){var d,e,f,g,h,i,j,k,l;b/=100,c/=100,g=Math.floor(a/60%6),e=a/60-g,h=c*(1-b),i=c*(1-e*b),l=c*(1-(1-e)*b),k=[];switch(g){case 0:k=[c,l,h];break;case 1:k=[i,c,h];break;case 2:k=[h,c,l];break;case 3:k=[h,i,c];break;case 4:k=[l,h,c];break;case 5:k=[c,h,i]}return j=Math.min(255,Math.round(k[0]*256)),f=Math.min(255,Math.round(k[1]*256)),d=Math.min(255,Math.round(k[2]*256)),[j,f,d]}})}).call(this)