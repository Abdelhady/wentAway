/*!
 * jQuery wentAway plugin boilerplate
 * Original author: @abdelhady
 * Current Version: V1.0
 * Licensed under the MIT license
 */
;(function(c,e,g,a){var d="wentAway",j=this,b={period:5*60*1000,wentAwayCallback:null,isBackCallback:null};function h(l,k){j=this;j.element=l;j.options=c.extend({},b,k);j._defaults=b;j._name=d;j.init()}h.prototype.init=function(){j.active=true;j.timer=setTimeout(f,j.options.period);var k="mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick";c(j.element).on(k,i)};function i(k){if(!j.active){if(c.isFunction(j.options.isBackCallback)){j.options.isBackCallback.call(j)}c(j.element).trigger("userIsBack")}j.active=true;if(j.timer){clearTimeout(j.timer)}j.timer=setTimeout(f,j.options.period)}function f(){j.active=false;if(c.isFunction(j.options.wentAwayCallback)){j.options.wentAwayCallback.call(j)}c(j.element).trigger("userWentAway")}c.fn[d]=function(k){return this.each(function(){if(!c.data(this,"plugin_"+d)){c.data(this,"plugin_"+d,new h(this,k))}})}})(jQuery,window,document);