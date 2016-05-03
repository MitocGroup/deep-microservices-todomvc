
System.config({
  defaultJSExtensions: true,
  transpiler: 'babel',
  babelOptions: {
    'optional': [
      'runtime'
    ]
  },
  paths: {
    '​*': '*​.js',
    'github:*': 'Frontend/vendor/github/*',
    'npm:*': 'Frontend/vendor/npm/*'
  },

  map: {
  }
});