System.config({
  baseURL: "deep-todomvc",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "js/vendor/github/*",
    "npm:*": "js/vendor/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.7",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.18",
    "angular-ui/bootstrap-bower": "github:angular-ui/bootstrap-bower@0.12.1",
    "css": "github:systemjs/plugin-css@0.1.23",
    "todomvc-app-css": "npm:todomvc-app-css@2.0.6",
    "todomvc-common": "npm:todomvc-common@1.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.92",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.92",
    "github:angular-ui/bootstrap-bower@0.12.1": {
      "angular": "github:angular/bower-angular@1.2.29"
    },
    "github:angular-ui/ui-router@0.2.18": {
      "angular": "github:angular/bower-angular@1.5.7"
    }
  }
});
