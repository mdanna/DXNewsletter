define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'newsletterId', () => {
                return this._newsletterId;
            });
            defineSetter(this, 'newsletterId', value => {
                this._newsletterId = value;
            });
        }
	};
});