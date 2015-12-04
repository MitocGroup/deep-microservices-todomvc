/* global browser */
/* global protractor */
/* global element */
/* global by */

'use strict';

//Declare variable ToDoAppPageElements which contains all selectors
var ToDoAppPageElements = function () {


    //Url link for testing
    this.url = 'http://todo.deep.mg/#/';


    //Header title placed in center of the page
    this.headerTitle = element(by.xpath('html/body/div[1]/div/section/header/h1'));


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
    this.doubleClickFooterText = element(by.xpath('html/body/div[1]/div/footer/p[1]'));


    //'Written by Mitoc Group' text placed in the footer
    this.mitocGroupFooterText = element(by.xpath('html/body/div[1]/div/footer/p[2]'));


    //'Mitoc Group' link to www.mitocgroup.com website
    this.mitocGroupFooterLink = element(by.xpath('html/body/div[1]/div/footer/p[2]/a'));


    //'Part of TodoMVC' text placed in footer
    this.toDoMvcFooterText = element(by.xpath('html/body/div[1]/div/footer/p[3]'));


    //'TodoMVC' link to www.todomvc.com website
    this.toDoMvcFooterLink = element(by.xpath('html/body/div[1]/div/footer/p[3]/a'));


    this.checkHeaderTitle = function () {
        expect(this.headerTitle.isDisplayed()).toEqual(true);
        expect(this.headerTitle.getText()).toEqual('todos');
    };

    this.checkDeepFrameworkTitle = function () {
        expect(this.deepFrameworkTitle.isDisplayed()).toEqual(true);
        expect(this.deepFrameworkTitle.getText()).toEqual('DEEP Framework');
    };

    this.checkExample = function () {
        expect(this.example.isDisplayed()).toEqual(true);
        expect(this.example.getText()).toEqual('Example');
    };

    this.checkSourceLink = function () {
        expect(this.sourceLink.isDisplayed()).toEqual(true);
        expect(this.sourceLink.getText()).toEqual('Source');
    };

    this.checkDeepFrameworkLink = function () {
        expect(this.deepFrameworkLink.isDisplayed()).toEqual(true);
        expect(this.deepFrameworkLink.getText()).toEqual('DEEP Framework');
    };

    this.checkPlatformAsAServiceLink = function () {
        expect(this.platformAsAService.isDisplayed()).toEqual(true);
        expect(this.platformAsAService.getText()).toEqual('Platform-as-a-Service');
    };

    this.checkMicroServicesArchitectureLink = function () {
        expect(this.microservicesArchitecture.isDisplayed()).toEqual(true);
        expect(this.microservicesArchitecture.getText()).toEqual('microservices architecture');
    };

    this.checkServerLessApproachLink = function () {
        expect(this.serverLessApproach.isDisplayed()).toEqual(true);
        expect(this.serverLessApproach.getText()).toEqual('serverless approach');
    };

    this.checkLeftTextBlock = function () {
        expect(this.leftTextBlock.isDisplayed()).toEqual(true);
        expect(this.leftTextBlock.getText()).toEqual('DEEP Framework is a serverless web framework, ' +
            'core component of the Platform-as-a-Service that abstracts web apps and web services ' +
            'from specific cloud providers. ' +
            'This framework enables developers build cloud-native applications ' +
            'orplatforms using microservices architecture in a completely serverless approach.');
    };

    this.checkDeepFrameworkSecondLink = function () {
        expect(this.deepFrameworkSecondlLink.isDisplayed()).toEqual(true);
        expect(this.deepFrameworkSecondlLink.getText()).toEqual('DEEP Framework');
    };

    this.checkOfficialResourcesTitle = function () {
        expect(this.officialResources.isDisplayed()).toEqual(true);
        expect(this.officialResources.getText()).toEqual('Official Resources');
    };

    this.checkDocumentationLink = function () {
        expect(this.documentationLink.isDisplayed()).toEqual(true);
        expect(this.documentationLink.getText()).toEqual('Documentation');
    };

    this.checkApiReferenceLink = function () {
        expect(this.apiReferenceLink.isDisplayed()).toEqual(true);
        expect(this.apiReferenceLink.getText()).toEqual('API Reference');
    };

    this.checkQuickStartLink = function () {
        expect(this.quickStartLink.isDisplayed()).toEqual(true);
        expect(this.quickStartLink.getText()).toEqual('Quick Start');
    };

    this.checkApplicationsBuiltWithDeepFrameworkLink = function () {
        expect(this.applicationsBuiltWithDeepFrameworkLink.isDisplayed()).toEqual(true);
        expect(this.applicationsBuiltWithDeepFrameworkLink.getText()).toEqual('Applications built with DEEP Framework');
    };

    this.checkCommunity = function () {
        expect(this.community.isDisplayed()).toEqual(true);
        expect(this.community.getText()).toEqual('Community');
    };

    this.checkBugtrackerOnGitHub = function () {
        expect(this.bugTrackerOnGitHub.isDisplayed()).toEqual(true);
        expect(this.bugTrackerOnGitHub.getText()).toEqual('Bugtracker on GitHub');
    };

    this.checkLeftBlockFooterText = function () {
        expect(this.leftBlockFooterText.isDisplayed()).toEqual(true);
        expect(this.leftBlockFooterText.getText()).toEqual('If you have other helpful links to share, ' +
            'or find any of the links above no longer work, please let us know.');
    };

    this.checkLeftBlockFooterLink = function () {
        expect(this.leftBlockFooterLink.isDisplayed()).toEqual(true);
        expect(this.leftBlockFooterLink.getText()).toEqual('let us know');
    };

    this.checkDoubleClickFooterText = function () {
        expect(this.doubleClickFooterText.isDisplayed()).toEqual(true);
        expect(this.doubleClickFooterText.getText()).toEqual('Double-click to edit a todo');
    };

    this.checkMitocGroupFooterText = function () {
        expect(this.mitocGroupFooterText.isDisplayed()).toEqual(true);
        expect(this.mitocGroupFooterText.getText()).toEqual('Written by Mitoc Group');
    };

    this.checkMitocGroupFooterLink = function () {
        expect(this.mitocGroupFooterLink.isDisplayed()).toEqual(true);
        expect(this.mitocGroupFooterLink.getText()).toEqual('Mitoc Group');
    };

    this.checkToDoMvcFooterText = function () {
        expect(this.toDoMvcFooterText.isDisplayed()).toEqual(true);
        expect(this.toDoMvcFooterText.getText()).toEqual('Part of TodoMVC');
    };

    this.checkToDoMvcFooterLink = function () {
        expect(this.toDoMvcFooterLink.isDisplayed()).toEqual(true);
        expect(this.toDoMvcFooterLink.getText()).toEqual('TodoMVC');
    };


    //Function for validating all controls
    this.validateControls = function () {
        this.checkHeaderTitle();
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


//Exporting ToDoAppPageElements function
module.exports = new ToDoAppPageElements();


