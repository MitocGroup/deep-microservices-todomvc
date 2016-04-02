deep-microservices-todo-app
===========================

[![Build Status](https://travis-ci.org/MitocGroup/deep-microservices-todo-app.svg?branch=master)](https://travis-ci.org/MitocGroup/deep-microservices-todo-app)
[![Codacy Badge](https://api.codacy.com/project/badge/coverage/d3dd5bd83d75491dbd3bd1f935d8a7fb)](https://www.codacy.com/app/MitocGroup/deep-microservices-todo-app)

deep-microservices-todo-app is a sample microservice inspired from [todomvc.com](http://todomvc.com).
It is built on top of [DEEP Framework](https://github.com/MitocGroup/deep-framework) and reuses
[TodoMVC AngularJS Example](https://github.com/tastejs/todomvc/tree/master/examples/angularjs). This
repository is open sourced to show case how developers can build and deploy hassle-free cloud-native
web applications using microservices architecture and serverless computing.


## Getting Started

### Step 1. Pre-requisites

- [x] [Create an Amazon Web Services account](https://www.youtube.com/watch?v=WviHsoz8yHk)
- [x] [Configure AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
- [x] [Get Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [x] [JDK 8 and JRE 8 Installation Start Here](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)
- [x] [Install nvm](https://github.com/creationix/nvm#install-script) and [use node v4.3+](https://github.com/creationix/nvm#usage)
- [ ] Install DEEP CLI, also known as `deepify`:

```bash
npm install deepify -g
```

> If you want to use `deepify` on Windows, please follow the steps from
[Windows Configuration](https://github.com/MitocGroup/deep-framework/blob/master/docs/windows.md)
before running `npm install deepify -g` and make sure all `npm` and `deepify` commands are executed
inside Git Bash.

### Step 2. Install Microservice(s) Locally

```bash
deepify install github://MitocGroup/deep-microservices-todo-app ~/deep-microservices-todo-app
```

> Path parameter in all `deepify` commands is optional and if not specified, assumes current
working directory. Therefore you can skip `~/deep-microservices-todo-app` by executing
`mkdir ~/deep-microservices-todo-app && cd ~/deep-microservices-todo-app` before `deepify install`.

### Step 3. Run Microservice(s) in Development

```bash
deepify server ~/deep-microservices-todo-app -o
```

> When this step is finished, you can open in your browser the link *http://localhost:8000*
and enjoy the deep-microservices-todo-app running locally.

### Step 4. Run Microservice(s) in Production

```bash
deepify deploy ~/deep-microservices-todo-app
```

> Amazon CloudFront distribution takes up to 20 minutes to provision, therefore don’t worry
if it returns an HTTP error in the first couple of minutes.

### Step 5. Remove Microservice(s) from Production

```bash
deepify undeploy ~/deep-microservices-todo-app
```

> Amazon CloudFront distribution takes up to 20 minutes to unprovision. That's why `deepify`
command checks every 30 seconds if it's disabled and when successful, removes it from your account.


## Developer Resources

Having questions related to deep-microservices-todo-app?

- Ask questions: https://stackoverflow.com/questions/tagged/deep-framework
- Chat with us: https://gitter.im/MitocGroup/deep-framework
- Send an email: feedback@deep.mg

Interested in contributing to deep-microservices-todo-app?

- Contributing: https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/CONTRIBUTING.md
- Issue tracker: https://github.com/MitocGroup/deep-microservices-todo-app/issues
- Releases: https://github.com/MitocGroup/deep-microservices-todo-app/releases
- Roadmap: https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/ROADMAP.md

Looking for web applications that use (or are similar to) deep-microservices-todo-app?

- Hello World: https://hello.deep.mg | https://github.com/MitocGroup/deep-microservices-helloworld
- Todo App: https://todo.deep.mg | https://github.com/MitocGroup/deep-microservices-todo-app
- Enterprise Software Marketplace: https://www.deep.mg

## Sponsors

This repository is being sponsored by:
- [Mitoc Group](https://www.mitocgroup.com)
- [DEEP Marketplace](https://www.deep.mg)

This code can be used under MIT license:
> See [LICENSE](https://github.com/MitocGroup/deep-microservices-todo-app/blob/master/LICENSE) for more details.
