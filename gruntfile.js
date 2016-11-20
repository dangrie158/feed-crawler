
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      babel: {
          options: {
              sourceMap: true
          },
          dist: {
              files: {
                  'dist/crawler.js': 'src/crawler.js',
                  'dist/article.js': 'src/article.js',
                  'dist/util/asyncHelper.js': 'src/util/asyncHelper.js',
                  'dist/util/outputHelper.js': 'src/util/outputHelper.js'
              }
          }
      }
  });

  grunt.registerTask('default', ['babel']);
}
