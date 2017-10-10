deep-microservices-todomvc
==========================

[![Build Status](https://travis-ci.org/MitocGroup/deep-microservices-todomvc.svg?branch=master)](https://travis-ci.org/MitocGroup/deep-microservices-todomvc)
[![Test Coverage](https://codeclimate.com/github/MitocGroup/deep-microservices-todomvc/badges/coverage.svg?maxAge=0)](https://codeclimate.com/github/MitocGroup/deep-microservices-todomvc)

deep-microservices-todomvc is a sample microservice inspired from [todomvc.com](http://todomvc.com).
It is built on top of [DEEP Framework](https://github.com/MitocGroup/deep-framework) and reuses
[TodoMVC AngularJS Example](https://github.com/tastejs/todomvc/tree/master/examples/angularjs). This
repository is open sourced to show case how developers can build and deploy hassle-free cloud-native
web applications using microservices architecture and serverless computing.


## Getting Started

1. Clone repository
2. Go to `src/deep-todomvc` directory
3. Prepare backend by running `npm run prepare-backend -- dev|prod`
4. Prepare frontend by running `npm run prepare-frontend`
5. Go back to `src` directory
6. Run Microservice in Development mode

```bash
deepify server ./
```

 * During this step configure your `frontend/backend` parameters, set `runAsApi` to `true` in order to be able to use 
`ng-cli` for frontend development;

 * When this step is finished, 
    * And `runAsApi=false` just open in your browser the link *http://localhost:8000*
    * And `runAsApi=true` go to `src/deep-todomvc/frontend` and run `npm run start` and go *http://localhost:4200*
 * Enjoy the deep-microservices-todomvc running locally.

7. Deploy Microservice to Production

After your development work is done just run (from `src` directory):

```bash
deepify deploy
```

> Amazon CloudFront distribution takes up to 20 minutes to provision, therefore don’t worry
if it returns an HTTP error in the first couple of minutes.

8. Remove Microservice from Production

In case if you want to undeploy this AWSome ;) application, just run (from `src` directory):

```bash
deepify undeploy 
```

> Amazon CloudFront distribution takes up to 20 minutes to unprovision. That's why `deepify`
command checks every 30 seconds if it's disabled and when successful, removes it from your account.


## Developer Resources

Having questions related to deep-microservices-todomvc?

- Ask questions: https://stackoverflow.com/questions/tagged/deep-framework
- Chat with us: https://mitocgroup.slack.com/messages/general
- Send an email: feedback@mitocgroup.com

Interested in contributing to deep-microservices-todomvc?

- Contributing: https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/CONTRIBUTING.md
- Issue tracker: https://github.com/MitocGroup/deep-microservices-todomvc/issues
- Releases: https://github.com/MitocGroup/deep-microservices-todomvc/releases
- Roadmap: https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/ROADMAP.md

Looking for web applications that use (or are similar to) deep-microservices-todomvc?

- Hello World: https://hello.deep.mg | https://github.com/MitocGroup/deep-microservices-helloworld
- AdTechMedia: https://www.adtechmedia.io | https://github.com/AdTechMedia/adtechmedia-website


## Sponsors

This repository is being sponsored by:
- [Mitoc Group](https://www.mitocgroup.com)
- [AdTechMedia](https://www.adtechmedia.io)

This code can be used under MIT license:
> See [LICENSE](https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/LICENSE) for more details.
