;(function ( $, window, document, undefined ) {
    var pluginName = 'wentAway',
    self = this,
    defaults = {
        period: 2 * 60 * 1000
    };
    
    function Plugin( element, options ) {
        self = this;
        self.element = element;
        self.options = $.extend( {}, defaults, options) ;
        self._defaults = defaults;
        self._name = pluginName;
        self.init();
    }
    
    Plugin.prototype.init = function () {
        console.log('init');
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

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                    new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );