define({ 

  newsletters: [], 

  onViewCreated(){
    mainController.onViewCreated.call(this);
  },

  reloadData(){
    return mainController.reloadData.call(this);
  },

  loadData(newsletters){
    return mainController.loadData.call(this, newsletters);
  }

});