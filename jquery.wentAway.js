// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global 
    // variable in ECMAScript 3 and is mutable (i.e. it can 
    // be changed by someone else). undefined isn't really 
    // being passed in so we can ensure that its value is 
    // truly undefined. In ES5, undefined can no longer be 
    // modified.
    
    // window and document are passed through as local 
    // variables rather than as globals, because this (slightly) 
    // quickens the resolution process and can be more 
    // efficiently minified (especially when both are 
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'wentAway',
    self = this,
    defaults = {
        period: 2 * 60 * 1000
    };
    
    // The actual plugin constructor
    function Plugin( element, options ) {
        self = this;
        self.element = element;
        // The first object is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        self.options = $.extend( {}, defaults, options) ;
        self._defaults = defaults;
        self._name = pluginName;
        self.init();
    }
    
    // main code here
    Plugin.prototype.init = function () {
        self.active = true;
        self.timer = setTimeout(userInactiveCallback, self.options.period);
        var events = 'mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick';
        $(self.element).on(events, userActiveCallback);
    }; 

    function userActiveCallback(e) {
        if (!self.active) 
            $(self.element).trigger("userIsBack");
        self.active = true;
        if (self.timer) 
            clearTimeout(self.timer);
        self.timer = setTimeout(userInactiveCallback, self.options.period);
    }
    
    function userInactiveCallback() {
        self.active = false;
        $(self.element).trigger("userWentAway");
    }

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                    new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );