const loginController = {
  onViewCreated(){
    this.view.init = () => {
      this.view.flxLoginButton.onClick = () => {
        new voltmx.mvc.Navigation('frmMain').navigate(true);
      };
    };
  }
};