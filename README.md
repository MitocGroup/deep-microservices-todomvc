deep-microservices-todomvc
==========================

[![Build Status](https://travis-ci.org/MitocGroup/deep-microservices-todomvc.svg?branch=master)](https://travis-ci.org/MitocGroup/deep-microservices-todomvc)
[![Test Coverage](https://codeclimate.com/github/MitocGroup/deep-microservices-todomvc/badges/coverage.svg?maxAge=0)](https://codeclimate.com/github/MitocGroup/deep-microservices-todomvc)

deep-microservices-todomvc is a fully serverless todo-application inspired from [todomvc.com][1].
Frontend part is built on top of [Angular-CLI][2], but backend is cloud-native and is managed by [DEEP Framework][3]. 
This repository is open sourced to show case how developers can build and deploy hassle-free cloud-native
web applications using microservices architecture and serverless computing.

## Pre-requisites

Make sure that you have [proper software][4] installed

## Getting Started

1. Clone repository
2. Go to `src/deep-todomvc` directory
3. Prepare backend by running `npm run prepare-backend`
4. Prepare frontend by running `npm run prepare-frontend`
5. Go back to `src` directory
6. Run Microservice in Development mode

```bash
deepify server ./
```

 * During this step configure your `frontend/backend` parameters, set `runAsApi` to `true` in order to be able to use 
`ng-cli` for frontend development;

 * When this step is finished, 
    * And `runAsApi=false` just open in your browser the link [*http://localhost:8000*][5]
    * And `runAsApi=true` go to `src/deep-todomvc/frontend` and run `npm run start` and go [*http://localhost:4200*][6]
 * Enjoy the deep-microservices-todomvc running locally.

7. Deploy Microservice to Production

After your development work is done just run (from `src` directory):

 * Compile backend: `deepify compile prod`
 * Deploy the application: `deepify deploy`

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

- [Contributing][7]
- [Issue tracker][8]
- [Releases][9]
- [Roadmap][10]

## Sponsors

This repository is being sponsored by:
- [Mitoc Group](https://www.mitocgroup.com)
- [AdTechMedia](https://www.adtechmedia.io)

This code can be used under MIT license:
> See [LICENSE][11] for more details.

[1]: http://todomvc.com
[2]: https://cli.angular.io
[3]: https://github.com/MitocGroup/deep-framework
[4]: https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/docs/pre-requisites.md
[5]: http://localhost:8000
[6]: http://localhost:4200
[7]: https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/docs/CONTRIBUTING.md
[8]: https://github.com/MitocGroup/deep-microservices-todomvc/issues
[9]: https://github.com/MitocGroup/deep-microservices-todomvc/releases
[10]: https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/ROADMAP.md
[11]: https://github.com/MitocGroup/deep-microservices-todomvc/blob/master/docs/LICENSE
