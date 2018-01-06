/*
**  ComponentJS-MVC -- Model-View-Controller Component Roles
**  Copyright (c) 2016-2017 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module: true */
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-eslint");

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: "jshint.json"
            },
            "gruntfile": [ "Gruntfile.js" ],
            "componentjs-mvc":  [ "src/**/*.js" ],
        },
        eslint: {
            options: {
                configFile: "eslint.yaml"
            },
            "componentjs-mvc": [ "src/**/*.js" ]
        },
        browserify: {
            "componentjs-mvc": {
                files: {
                    "lib/componentjs-mvc.js": [ "src/**/*.js" ]
                },
                options: {
                    transform: [
                        [ "babelify", {
                            presets: [ "es2015", "es2016", "es2017" ],
                            plugins: [ "transform-object-assign" ]
                        } ],
                        [ "uglifyify", { global: true, sourceMap: false } ]
                    ],
                    plugin: [
                        [ "browserify-derequire" ]
                    ],
                    browserifyOptions: {
                        standalone: "ComponentJSMVC",
                        debug: false
                    }
                }
            }
        },
        clean: {
            clean: [],
            distclean: [ "node_modules" ]
        }
    });
    grunt.registerTask("default", [ "jshint", "eslint", "browserify" ]);
};

