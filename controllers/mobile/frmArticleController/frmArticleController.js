define({ 

  onViewCreated(){
    this.view.init = () => {
     this.view.headerArticle.onClickLeft = () => new voltmx.mvc.Navigation('frmNewsletter').navigate();
    
     this.view.lblTitle.doLayout = () => {
       const contentContainerHeight = this.view.flxContentContainer.frame.height;
       const lblTitleHeight = this.view.lblTitle.frame.height;
       this.view.flxContent.top = `${lblTitleHeight + 30}dp`;
       this.view.flxContent.height = `${contentContainerHeight - lblTitleHeight - 50}dp`;
     };
    };
  },

  onNavigate({headerTitle, title, content}){
    this.view.headerArticle.title = headerTitle;
    this.view.lblTitle.text = title;
    const rtContent = content.replaceAll(/<p.*?>/g, "<p>");
    voltmx.print(rtContent);
    this.view.rtContent.text = rtContent;
    this.view.flxContent.forceLayout();
  }

});