/*global module:false*/
module.exports = function (grunt) {
	'use strict';

	var templates = grunt.file.readJSON  ('template/tekturk-us.json');

	// Project configuration.
	grunt.initConfig ({
		// Metadata.
		pkg: grunt.file.readJSON  ('package.json'),
		banner:
			'// ==UserScript==\n'+
			'// @name        <%= pkg.title || pkg.name %>\n' +
			'// @namespace   localhost\n' +
			'// @description Test\n' +
			'// @include     https://www.mturk.com/*\n' +
			'// @version     <%= pkg.version %>\n' +
			'// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js\n' +
			'// @require     https://cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.js\n' +
			'// @author      Robert E. Adams\n' +
			'// @copright    Copyright (c) 2015 Robert E. Adams\n' + 
			'// @license     MIT\n' +
			'// ==/UserScript==\n\n',
		files: {
			js: 'lib/**/*.js',
			jsTest: 'test/**/*.js',
			test: 'test/**/*.html'
		},
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				process: {
					data: templates
				}
			},
			files: {
				src: '<%= files.js %>',
				dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			files: {
				src: 'dist/<%= pkg.name %>.<%= pkg.version %>.js',
				dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.min.js'
			}
		},
		jshint: {
			options: {
				jshintrc: true
			},
			src: ['Gruntfile.js', '<%= files.js %>', '<%= files.jsTest %>']
		},
		jscs: {
			src: ['<%= files.js%>', '<%= files.jsTest %>' ],
			options: {
				config: '.jscsrc',
				verbose: true
			}
		},
		jsdoc : {
			src: ['<%= files.js %>'],
			options: {
				destination: 'dist/doc'
			}
		},
		qunit: {
			options: {
				coverage: {
					src: ['<%= files.js %>'],
					instrumentedFiles: 'temp/',
					lcovReport: 'dist'
				}
			},
			all: ['<%= files.test %>']
		},
		codacy: {
			options: {
				token: 'ae396700daf243c3804179d24c20f6a4'
			},
			src: 'dist/lcov.info'
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks ('grunt-contrib-concat');
	grunt.loadNpmTasks ('grunt-contrib-uglify');
	grunt.loadNpmTasks ('grunt-contrib-jshint');
	grunt.loadNpmTasks ('grunt-qunit-istanbul');
	grunt.loadNpmTasks ('grunt-codacy');
	grunt.loadNpmTasks ('grunt-jscs');
	grunt.loadNpmTasks ('grunt-jsdoc');

	// Default task.
	grunt.registerTask ('default', ['jshint', 'jscs', 'qunit', 'codacy', 'concat', 'uglify', 'jsdoc']);
};
