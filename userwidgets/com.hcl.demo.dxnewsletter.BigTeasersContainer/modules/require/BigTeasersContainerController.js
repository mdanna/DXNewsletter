define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
      addTeaser(teaser){
        this.view.flxScrollerHorizontal.add(teaser);
      },
      removeAllTeasers(){
        this.view.flxScrollerHorizontal.removeAll();
      },
      layoutTeasers(){
        this.view.flxScrollerHorizontal.forceLayout();
      }
	};
});