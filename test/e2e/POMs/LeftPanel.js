/* global element */
/* global by */

'use strict';

var config = require('../protractor.config.js');

//Declare variable TodoAppPageElements which contains all selectors
var LeftPanel = function() {

  var _this = this;

  //Url link for testing
  this.url = config.config.testUrl;

  //Header title placed in center of the page
  this.headerTitle = element(by.xpath('html/body/deep-gtm/deep-config/div[1]/div/section/header/h1'));

  //'Deep Framework' title placed in left panel
  this.deepFrameworkTitle = element(by.xpath('html/body/aside/header/h3'));

  //Example text placed in the left panel
  this.example = element(by.xpath('html/body/aside/header/span/h5'));

  //Source link to the deep microservices todoapp repository in Github placed in the left panel
  this.sourceLink = element(by.xpath('html/body/aside/header/span/a'));

  //'Deep Framework' link to the deep-framework repository in Github
  this.deepFrameworkLink = element(by.xpath('html/body/aside/blockquote/p/a[1]'));

  //'Platform-as-a-Service' link to Readme.md file in deep-framework repository in Github
  // on Appendix A: Serverless Architecture
  this.platformAsAService = element(by.xpath('html/body/aside/blockquote/p/a[2]'));

  //'Microservices architecture' link to the Wikipedia article about Microservices
  this.microservicesArchitecture = element(by.xpath('html/body/aside/blockquote/p/a[3]'));

  //'Serverless Approach' Link to Readme.md file in deep-framework repository in github
  // on Appendix A: Serverless Architecture
  this.serverLessApproach = element(by.xpath('html/body/aside/blockquote/p/a[4]'));

  //Text block from the left side
  this.leftTextBlock = element(by.xpath('html/body/aside/blockquote/p'));

  //'Deep Framework' link to the deep-framework repository in Github placed under the text block
  this.deepFrameworkSecondlLink = element(by.xpath('html/body/aside/blockquote/footer/a'));

  //'Official Resources' text place in left panel
  this.officialResources = element(by.xpath('html/body/aside/h4[1]'));

  //'Documentation' link to docs file in deep-framework repository in Github
  this.documentationLink = element(by.xpath('html/body/aside/ul[1]/li[1]/a'));

  //'API Reference' link to docs file in docs.deep.mg
  this.apiReferenceLink = element(by.xpath('html/body/aside/ul[1]/li[2]/a'));

  //'Quick Start' link to deep-microservices-todo-app repository in Github
  this.quickStartLink = element(by.xpath('html/body/aside/ul[1]/li[3]/a'));

  //'Application build with Deep Framework' link to deep-microservices-helloworld repository in Github
  this.applicationsBuiltWithDeepFrameworkLink = element(by.xpath('html/body/aside/ul[1]/li[4]/a'));

  //'Community' text placed in left panel
  this.community = element(by.xpath('html/body/aside/h4[2]'));

  //'Bugtracker in Github' link to issues in deep-framework repository
  this.bugTrackerOnGitHub = element(by.xpath('html/body/aside/ul[2]/li/a'));

  //Text placed in footer of the left panel
  this.leftBlockFooterText = element(by.xpath('html/body/aside/footer/em'));

  //'Let us know' link to issues in todomvc repository in Github
  this.leftBlockFooterLink = element(by.xpath('html/body/aside/footer/em/a'));

  //'Double-click to edit a todo' text placed in footer
  this.doubleClickFooterText = element(by.xpath('html/body/deep-gtm/deep-config/div[1]/div/footer/p[1]'));

  //'Written by Mitoc Group' text placed in the footer
  this.mitocGroupFooterText = element(by.xpath('html/body/deep-gtm/deep-config/div[1]/div/footer/p[2]'));

  //'Mitoc Group' link to www.mitocgroup.com website
  this.mitocGroupFooterLink = element(by.xpath('html/body/deep-gtm/deep-config/div[1]/div/footer/p[2]/a'));

  //'Part of TodoMVC' text placed in footer
  this.todoMvcFooterText = element(by.xpath('html/body/deep-gtm/deep-config/div[1]/div/footer/p[3]'));

  //Function for validating all controls
  this.validateControls = function() {
    expect(_this.headerTitle.isDisplayed()).toEqual(true);
    expect(_this.headerTitle.getText()).toEqual('todos');
    expect(_this.deepFrameworkTitle.isDisplayed()).toEqual(true);
    expect(_this.deepFrameworkTitle.getText()).toEqual('DEEP Framework');
    expect(_this.example.isDisplayed()).toEqual(true);
    expect(_this.example.getText()).toEqual('Example');
    expect(_this.sourceLink.isDisplayed()).toEqual(true);
    expect(_this.sourceLink.getText()).toEqual('Source');
    expect(_this.deepFrameworkLink.isDisplayed()).toEqual(true);
    expect(_this.deepFrameworkLink.getText()).toEqual('DEEP Framework');
    expect(_this.platformAsAService.isDisplayed()).toEqual(true);
    expect(_this.platformAsAService.getText()).toEqual('Platform-as-a-Service');
    expect(_this.microservicesArchitecture.isDisplayed()).toEqual(true);
    expect(_this.microservicesArchitecture.getText()).toEqual('microservices architecture');
    expect(_this.serverLessApproach.isDisplayed()).toEqual(true);
    expect(_this.serverLessApproach.getText()).toEqual('serverless approach');
    expect(_this.leftTextBlock.isDisplayed()).toEqual(true);
    expect(_this.leftTextBlock.getText()).toEqual('DEEP Framework is a serverless web framework, ' +
        'core component of the Platform-as-a-Service that abstracts web apps and web services ' +
        'from specific cloud providers. ' +
        'This framework enables developers build cloud-native applications ' +
        'orplatforms using microservices architecture in a completely serverless approach.');
    expect(_this.deepFrameworkSecondlLink.isDisplayed()).toEqual(true);
    expect(_this.deepFrameworkSecondlLink.getText()).toEqual('DEEP Framework');
    expect(_this.officialResources.isDisplayed()).toEqual(true);
    expect(_this.officialResources.getText()).toEqual('Official Resources');
    expect(_this.documentationLink.isDisplayed()).toEqual(true);
    expect(_this.documentationLink.getText()).toEqual('Documentation');
    expect(_this.apiReferenceLink.isDisplayed()).toEqual(true);
    expect(_this.apiReferenceLink.getText()).toEqual('API Reference');
    expect(_this.quickStartLink.isDisplayed()).toEqual(true);
    expect(_this.quickStartLink.getText()).toEqual('Quick Start');
    expect(_this.applicationsBuiltWithDeepFrameworkLink.isDisplayed()).toEqual(true);
    expect(_this.applicationsBuiltWithDeepFrameworkLink.getText()).toEqual('Applications built with DEEP Framework');
    expect(_this.community.isDisplayed()).toEqual(true);
    expect(_this.community.getText()).toEqual('Community');
    expect(_this.bugTrackerOnGitHub.isDisplayed()).toEqual(true);
    expect(_this.bugTrackerOnGitHub.getText()).toEqual('Bugtracker on GitHub');
    expect(_this.leftBlockFooterText.isDisplayed()).toEqual(true);
    expect(_this.leftBlockFooterText.getText()).toEqual('If you have other helpful links to share, ' +
        'or find any of the links above no longer work, please let us know.');
    expect(_this.leftBlockFooterLink.isDisplayed()).toEqual(true);
    expect(_this.leftBlockFooterLink.getText()).toEqual('let us know');
    expect(_this.doubleClickFooterText.isDisplayed()).toEqual(true);
    expect(_this.doubleClickFooterText.getText()).toEqual('Double-click to edit a todo');
    expect(_this.mitocGroupFooterText.isDisplayed()).toEqual(true);
    expect(_this.mitocGroupFooterText.getText()).toEqual('Written by Mitoc Group');
    expect(_this.mitocGroupFooterLink.isDisplayed()).toEqual(true);
    expect(_this.mitocGroupFooterLink.getText()).toEqual('Mitoc Group');
    expect(_this.todoMvcFooterText.isDisplayed()).toEqual(true);
    expect(_this.todoMvcFooterText.getText()).toEqual('Part of TodoMVC');
  }.bind(_this);
};

//Exporting TodoAppPageElements function
module.exports = new LeftPanel();
