/*global module:false*/
module.exports = function (grunt) {
	'use strict';

	var templates = grunt.file.readJSON  ('template/tekturk-gm.json');

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
			src: ['Gruntfile.js', '<%= files.js %>']
		},
		jscs: {
			src: ['<%= files.js%>' ],
			options: {
				config: ".jscsrc",
				verbose: true
			}
		},
		jsdoc : {
			src: ['<%= files.js %>'],
			options: {
				destination: 'dist/doc'
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks ('grunt-contrib-concat');
	grunt.loadNpmTasks ('grunt-contrib-uglify');
	grunt.loadNpmTasks ('grunt-contrib-jshint');
	grunt.loadNpmTasks ('grunt-contrib-less');
	grunt.loadNpmTasks ("grunt-jscs");
	grunt.loadNpmTasks ("grunt-jsdoc");

	// Default task.
	grunt.registerTask ('default', ['jshint', 'jscs', 'concat', 'uglify', 'jsdoc']);
};
