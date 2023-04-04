define({ 
  IMAGE_PREFIX: 'https://rob-328.woodburn.digital',
  labelSkins: ['sknLblRegularViolet140', 'sknLblRegularOrange140', 'sknLblRegularYellow140', 'sknLblRegularBlue140'],
  teaserId: null,

  onViewCreated(){
    this.view.init = () => {
      this.view.headerNewsletter.onClickLeft = () => new voltmx.mvc.Navigation('frmMain').navigate();
      this.view.onBreakpointChange = () => {
        this.navigationContext && (this.view.headerNewsletter.title = `Nr. ${this.navigationContext.issueNumber}`);
      };
    };

    this.view.postShow = () => {
      const newsletter = this.navigationContext;
      if(newsletter){
        this.view.flxScrollerVertical.removeAll();
        voltmx.application.showLoadingScreen('sknLblRegularWhite60', "loading...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, false, true, {});
		VMXFoundry.getIntegrationService('NewsletterOrchestration').invokeOperation('getArticles', {}, {
          newsletterId: newsletter.id
        }, (response) => {
          voltmx.print(response);
          if(response.articles){
            const articlesByCategory = [];
            response.articles.forEach((article) => {
              let articleByCategory = articlesByCategory.find((a) => a.category === article.category);
              if(!articleByCategory){
                articleByCategory = articleByCategory || {
                  category: article.category,
                  articles: []
                };    
                articlesByCategory.push(articleByCategory);
              }
              articleByCategory.articles.push(article);
            });

            articlesByCategory.forEach((articleByCategory, index) => {
              const bigTeasersContainer = new com.hcl.demo.dxnewsletter.BigTeasersContainer({
                id: `bigTeasersContainer${index}${new Date().valueOf()}`,
              }, {}, {});
              bigTeasersContainer.title = articleByCategory.category;
              bigTeasersContainer.skinTitle = this.labelSkins[index % this.labelSkins.length];

              bigTeasersContainer.removeAllTeasers();
              articleByCategory.articles.forEach((article, index) => {
                const teaser = new com.hcl.demo.dxnewsletter.BigTeaser({
                  id: `teaser${index}${new Date().valueOf()}`,
                  right: index === articleByCategory.articles.length - 1 ? `20dp` : '0'
                }, {}, {});
                teaser.image = article.image.startsWith('http') ? article.image : this.IMAGE_PREFIX + article.image;
                teaser.title = article.category;
                teaser.text = article.title;

                teaser.onClickTeaser = () => new voltmx.mvc.Navigation('frmArticle').navigate({
                  headerTitle: `Nr. ${newsletter.issueNumber}`,
                  title: article.title,
                  content: article.content
                });
                bigTeasersContainer.addTeaser(teaser);
              });
              bigTeasersContainer.layoutTeasers();
              this.view.flxScrollerVertical.add(bigTeasersContainer);
            });
          }
          voltmx.application.dismissLoadingScreen();
        }, (error) => {
          voltmx.application.dismissLoadingScreen();
          alert(JSON.stringify(error.message));
          voltmx.print(error);
        });
      }      
    };
  },

});