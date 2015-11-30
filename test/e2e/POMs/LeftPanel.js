'use strict';

var LeftPanel = function() {

  //Url link for testing
  this.url = 'http://todo.deep.mg';
  this.headerTittle = element(by.xpath("html/body/div[1]/section/header/h1"));
  this.deepFrameworkTitle = element(by.xpath("html/body/aside/header/h3"));
  this.example = element(by.xpath("html/body/aside/header/span/h5"));
  this.sourceLink = element(by.xpath("html/body/aside/header/span/a"));
  this.deepFrameworkLink = element(by.xpath("html/body/aside/blockquote/p/a[1]"));
  this.platformAsAService = element(by.xpath("html/body/aside/blockquote/p/a[2]"));
  this.microservicesArchitecture = element(by.xpath("html/body/aside/blockquote/p/a[3]"));
  this.serverLessApproach = element(by.xpath("html/body/aside/blockquote/p/a[4]"));
  this.leftTextBlock = element(by.xpath("html/body/aside/blockquote/p"));
  this.deepFrameworkSecondlLink = element(by.xpath("html/body/aside/blockquote/footer/a"));
  this.officialResources = element(by.xpath("html/body/aside/h4[1]"));
  this.documentationLink = element(by.xpath("html/body/aside/ul[1]/li[1]/a"));
  this.apiReferenceLink = element(by.xpath("html/body/aside/ul[1]/li[2]/a"));
  this.quickStartLink = element(by.xpath("html/body/aside/ul[1]/li[3]/a"));
  this.applicationsBuiltWithDeepFrameworkLink = element(by.xpath("html/body/aside/ul[1]/li[4]/a"));
  this.community = element(by.xpath("html/body/aside/h4[2]"));
  this.bugTrackerOnGitHub = element(by.xpath("html/body/aside/ul[2]/li/a"));
  this.leftBlockFooterText = element(by.xpath("html/body/aside/footer/em"));
  this.leftBlockFooterLink = element(by.xpath("html/body/aside/footer/em/a"));
  this.doubleClickFooterText = element(by.xpath("html/body/div[1]/footer/p[1]"));
  this.mitocGroupFooterText = element(by.xpath("html/body/div[1]/footer/p[2]"));
  this.mitocGroupFooterLink = element(by.xpath("html/body/div[1]/footer/p[2]/a"));
  this.toDoMvcFooterText = element(by.xpath("html/body/div[1]/footer/p[3]"));
  this.toDoMvcFooterLink = element(by.xpath("html/body/div[1]/footer/p[3]/a"));

  this.checkHeaderTittle = function() {
    expect(this.headerTittle.isDisplayed()).toEqual(true);
    expect(this.headerTittle.getText()).toEqual('todos');
  };

  this.checkDeepFrameworkTitle = function() {
    expect(this.deepFrameworkTitle.isDisplayed()).toEqual(true);
    expect(this.deepFrameworkTitle.getText()).toEqual('DEEP Framework');
  };

  this.checkExample = function() {
    expect(this.example.isDisplayed()).toEqual(true);
    expect(this.example.getText()).toEqual('Example');
  };

  this.checkSourceLink = function() {
    expect(this.sourceLink.isDisplayed()).toEqual(true);
    expect(this.sourceLink.getText()).toEqual('Source');
  };

  this.checkDeepFrameworkLink = function() {
    expect(this.deepFrameworkLink.isDisplayed()).toEqual(true);
    expect(this.deepFrameworkLink.getText()).toEqual('DEEP Framework');
  };

  this.checkPlatformAsAServiceLink = function() {
    expect(this.platformAsAService.isDisplayed()).toEqual(true);
    expect(this.platformAsAService.getText()).toEqual('Platform-as-a-Service');
  };

  this.checkMicroServicesArchitectureLink = function() {
    expect(this.microservicesArchitecture.isDisplayed()).toEqual(true);
    expect(this.microservicesArchitecture.getText()).toEqual('microservices architecture');
  };

  this.checkServerLessApproachLink = function() {
    expect(this.serverLessApproach.isDisplayed()).toEqual(true);
    expect(this.serverLessApproach.getText()).toEqual('serverless approach');
  };

  this.checkLeftTextBlock = function() {
    expect(this.leftTextBlock.isDisplayed()).toEqual(true);
    expect(this.leftTextBlock.getText()).toEqual('DEEP Framework is a serverless web framework, ' +
      'core component of the Platform-as-a-Service that abstracts web apps and web services ' +
      'from specific cloud providers. ' +
      'This framework enables developers build cloud-native applications ' +
      'orplatforms using microservices architecture in a completely serverless approach.');
  };

  this.checkDeepFrameworkSecondLink = function() {
    expect(this.deepFrameworkSecondlLink.isDisplayed()).toEqual(true);
    expect(this.deepFrameworkSecondlLink.getText()).toEqual('DEEP Framework');
  };

  this.checkOfficialResourcesTitle = function() {
    expect(this.officialResources.isDisplayed()).toEqual(true);
    expect(this.officialResources.getText()).toEqual('Official Resources');
  };

  this.checkDocumentationLink = function() {
    expect(this.documentationLink.isDisplayed()).toEqual(true);
    expect(this.documentationLink.getText()).toEqual('Documentation');
  };

  this.checkApiReferenceLink = function() {
    expect(this.apiReferenceLink.isDisplayed()).toEqual(true);
    expect(this.apiReferenceLink.getText()).toEqual('API Reference');
  };

  this.checkQuickStartLink = function() {
    expect(this.quickStartLink.isDisplayed()).toEqual(true);
    expect(this.quickStartLink.getText()).toEqual('Quick Start');
  };

  this.checkApplicationsBuiltWithDeepFrameworkLink = function() {
    expect(this.applicationsBuiltWithDeepFrameworkLink.isDisplayed()).toEqual(true);
    expect(this.applicationsBuiltWithDeepFrameworkLink.getText()).toEqual('Applications built with DEEP Framework');
  };

  this.checkCommunity = function() {
    expect(this.community.isDisplayed()).toEqual(true);
    expect(this.community.getText()).toEqual('Community');
  };

  this.checkBugtrackerOnGitHub = function() {
    expect(this.bugTrackerOnGitHub.isDisplayed()).toEqual(true);
    expect(this.bugTrackerOnGitHub.getText()).toEqual('Bugtracker on GitHub');
  };

  this.checkLeftBlockFooterText = function() {
    expect(this.leftBlockFooterText.isDisplayed()).toEqual(true);
    expect(this.leftBlockFooterText.getText()).toEqual('If you have other helpful links to share, ' +
      'or find any of the links above no longer work, please let us know.');
  };

  this.checkLeftBlockFooterLink = function() {
    expect(this.leftBlockFooterLink.isDisplayed()).toEqual(true);
    expect(this.leftBlockFooterLink.getText()).toEqual('let us know');
  };

  this.checkDoubleClickFooterText = function() {
    expect(this.doubleClickFooterText.isDisplayed()).toEqual(true);
    expect(this.doubleClickFooterText.getText()).toEqual('Double-click to edit a todo');
  };

  this.checkMitocGroupFooterText = function() {
    expect(this.mitocGroupFooterText.isDisplayed()).toEqual(true);
    expect(this.mitocGroupFooterText.getText()).toEqual('Written by Mitoc Group');
  };

  this.checkMitocGroupFooterLink = function() {
    expect(this.mitocGroupFooterLink.isDisplayed()).toEqual(true);
    expect(this.mitocGroupFooterLink.getText()).toEqual('Mitoc Group');
  };

  this.checkToDoMvcFooterText = function() {
    expect(this.toDoMvcFooterText.isDisplayed()).toEqual(true);
    expect(this.toDoMvcFooterText.getText()).toEqual('Part of TodoMVC');
  };

  this.checkToDoMvcFooterLink = function() {
    expect(this.toDoMvcFooterLink.isDisplayed()).toEqual(true);
    expect(this.toDoMvcFooterLink.getText()).toEqual('TodoMVC');
  };

  this.validateControls = function() {
    this.checkHeaderTittle();
    this.checkDeepFrameworkTitle();
    this.checkExample();
    this.checkSourceLink();
    this.checkDeepFrameworkLink();
    this.checkPlatformAsAServiceLink();
    this.checkMicroServicesArchitectureLink();
    this.checkServerLessApproachLink();
    this.checkLeftTextBlock();
    this.checkDeepFrameworkSecondLink();
    this.checkOfficialResourcesTitle();
    this.checkApiReferenceLink();
    this.checkDocumentationLink();
    this.checkQuickStartLink();
    this.checkApplicationsBuiltWithDeepFrameworkLink();
    this.checkCommunity();
    this.checkBugtrackerOnGitHub();
    this.checkLeftBlockFooterText();
    this.checkLeftBlockFooterLink();
    this.checkDoubleClickFooterText();
    this.checkMitocGroupFooterText();
    this.checkMitocGroupFooterLink();
    this.checkToDoMvcFooterText();
    this.checkToDoMvcFooterLink();
  }
};

module.exports = new LeftPanel();
