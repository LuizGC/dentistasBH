module.exports = function(grunt){

	var globalConfig = {
		dev: '.tmp'
	};

	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	grunt.initConfig({
		globalConfig: globalConfig,

		connect: {
			server: {
				options: {
					open: true,
					port: 3000,
					base: '<%= globalConfig.dev  %>'
				}
			}
		},
		watch: {
			jade: {
				files: ['app/jade/**/*.jade', '!app/jade/include/**/*.jade'],
				tasks: ['jade:dev', 'includeSource:dev'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			less: {
				files: ['app/less/**/*.less'],
				tasks: ['less:dev'],
				options: {
					spawn: false,
					livereload: true,
					event: ['changed']
				}
			},
			js: {
				files: ['app/js/**/*.js'],
				tasks: ['jshint:all', 'uglify:dev'],
				options: {
					spawn: false,
					livereload: true,
					event: ['changed']
				}
			},
			cleanLess: {
				files: ['app/less/**/*.less'],
				tasks: ['clean:css', 'less:dev', 'includeSource:dev'],
				options: {
					spawn: false,
					livereload: true,
					event: ['deleted', 'added']
				}
			},
			cleanJS: {
				files: ['app/js/**/*.js'],
				tasks: ['clean:js', 'jshint:all', 'uglify:dev', 'includeSource:dev'],
				options: {
					spawn: false,
					livereload: true,
					event: ['deleted', 'added']
				}
			}
		},
		uglify: {
			dev: {
				options: {
					beautify: true
				},
				files: [{
					cwd: 'app/js',
					src: '**/*.js',
					dest: "<%= globalConfig.dev %>/js",
					expand: true,
					ext: ".js"
				}]
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'app/js/**/*.js']
		},
		less: {
			dev: {
				files: [{
					cwd: 'app/less',
					src: '**/*.less',
					dest: "<%= globalConfig.dev %>/css",
					expand: true,
					ext: ".css"
				}]
			}
		},
		jade: {
			dev: {
				pretty : true,
				files: [
						{
							cwd: 'app/jade',
							src: 'index.jade',
							dest: "<%= globalConfig.dev %>",
							expand: true,
							ext: ".tpl.html"
						},{
							cwd: 'app/jade/directives',
							src: '**/*.jade',
							dest: "<%= globalConfig.dev %>/directives",
							expand: true,
							ext: ".html"
						},{
							cwd: 'app/jade/views',
							src: '**/*.jade',
							dest: "<%= globalConfig.dev %>/views",
							expand: true,
							ext: ".html"
						}
				]
			}
		},
		includeSource: {
			options: {
				basePath: '.tmp',
				baseUrl: ''
			},
			dev: {
				files: {
					'<%= globalConfig.dev  %>/index.html': '<%= globalConfig.dev  %>/index.tpl.html'
				}
			}
		},
		clean: {
			tmp: ['<%= globalConfig.dev  %>'],
			css: ['<%= globalConfig.dev  %>/css/*.css'],
			js: ['<%= globalConfig.dev  %>/js/*.js']
		}



	});

	grunt.registerTask('dev', ['jshint:all','clean:tmp', 'uglify:dev', 'jade:dev', 'less:dev', 'includeSource:dev', 'connect', 'watch']);
};