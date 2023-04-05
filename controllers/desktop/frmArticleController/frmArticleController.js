define({ 

  onViewCreated(){
    articleController.onViewCreated.call(this);
  },

  onNavigate({headerTitle, title, content}){
    articleController.onNavigate.call(this, {headerTitle, title, content});
  }

});