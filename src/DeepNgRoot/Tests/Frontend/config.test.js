System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime"
    ]
  },
  paths: {
    "​*": "*​.js",
    "github:*": "Frontend/vendor/github/*",
    "npm:*": "Frontend/vendor/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.0",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.4",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "babel": "npm:babel-core@5.8.24",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "core-js": "npm:core-js@0.9.18",
    "es5-shim": "github:es-shims/es5-shim@4.1.6",
    "es6-shim": "github:es-shims/es6-shim@0.27.1",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.0"
    },
    "github:angular/bower-angular-mocks@1.4.4": {
      "angular": "github:angular/bower-angular@1.4.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.24": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
