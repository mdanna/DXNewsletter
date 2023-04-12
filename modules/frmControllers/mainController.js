const mainController = {
  onViewCreated(){
    this.view.init = () => {
      this.view.headerMain.onClickLeft = () => this.view.hamburgerMenu.toggle(true);

      this.view.headerMain.onClickRight = () => {
        this.view.flxSearchWrapper.isVisible = true;
        this.view.flxNewsletters.top = '70dp';
        this.view.flxContent.forceLayout();
      };

      this.view.lblIconClose.onTouchEnd = () => {
        this.view.flxSearchWrapper.isVisible = false;
        this.view.flxNewsletters.top = '20dp';
        this.view.flxContent.forceLayout();
        this.view.txtSearch.text = '';
        this.loadData(this.newsletters);
      };

      this.view.txtSearch.onTextChange = () => {
        const searchText  = this.view.txtSearch.text;
        if(searchText){
          this.loadData(this.newsletters.filter((teaser) => teaser.name.includes(searchText)));
        } else {
          this.loadData(this.newsletters);
        }
      };

      this.view.hamburgerMenu.onItemSelected = (item) => {
        item === 'logout' && (new voltmx.mvc.Navigation('frmLogin').navigate());
      };
    };

    this.view.preShow = () => {
      this.reloadData().then((newsletters) => {
        this.newsletters = [...newsletters];
        this.loadData(this.newsletters);
      });
    };
  },

  reloadData(){
    const promise = new Promise((resolve, reject) => {
      voltmx.application.showLoadingScreen('sknLblRegularWhite60', "loading...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, false, true, {});
      VMXFoundry.getIntegrationService('NewsletterOrchestration').invokeOperation('getNewsletters', {}, {}, (response) => {
        resolve(response.newsletters);
        voltmx.application.dismissLoadingScreen();
      }, (error) => {
        voltmx.application.dismissLoadingScreen();
        reject(error);
      });
    });
    return promise;
  },

  loadData(newsletters){
    this.view.flxNewsletters.removeAll();
    newsletters.forEach((newsletter, index) => {
      if(newsletter.thumbnail){
        const flex = new voltmx.ui.FlexContainer({
          id: `flex${index}${new Date().valueOf()}`,
          height: `130dp`,
          responsiveConfig: {
            "span": {
              "640": 12,
              "1024": 6,
              "1366": 4
            }
          },
        }, {}, {});
        const teaser = new com.hcl.demo.dxnewsletter.SmallTeaser({
          id: `teaser${index}${new Date().valueOf()}`,
          width: '95%',
          height: '120dp',
          centerX: '50%',
          centerY: '50%'
        }, {}, {});
        
        let dateString = newsletter.date;
        if(dateString){
          const dateStringArray = dateString.split(' ');
          const timeString = dateStringArray[dateStringArray.length - 1];
          dateString = dateString.replaceAll(` ${timeString}`, '');
          const date = new Date(dateString);
          const year = date.getFullYear();
          let month = '' + (date.getMonth() + 1);
          month = month.length === 1 ? `0${month}` : month;
          let day = '' + date.getDate();
          day = day.length === 1 ? `0${day}` : day;
          teaser.newsletterDate = `${year}.${month}.${day}`;
        } else {
          teaser.newsletterDate = '';
        }
        teaser.newsletterId = newsletter.id;
        teaser.newsletterImage = newsletter.thumbnail;
        teaser.newsletterText = newsletter.name;
        teaser.newsletterNumber = `Nr. ${newsletter.issueNumber || ''}`;
        teaser.onClickTeaser = () => new voltmx.mvc.Navigation('frmNewsletter').navigate(newsletter);
        flex.add(teaser);
        this.view.flxNewsletters.add(flex);
      }
    });
    this.view.flxNewsletters.forceLayout();
  }
  
};