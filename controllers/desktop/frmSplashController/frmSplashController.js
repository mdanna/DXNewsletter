define({ 

	onViewCreated(){
      this.view.postShow = () => {
        voltmx.timer.schedule("splash", () => {
          new voltmx.mvc.Navigation('frmLogin').navigate();
        }, 1, false);
      };
    }

});