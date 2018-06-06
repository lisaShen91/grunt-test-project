module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['build', 'dist'],
		watch: {
			scripts: {
				files: ['src/css/*.styl'],
				tasks: ['stylus:compile']
			}
		},
		copy: {
			main: {
				files: [{
					src: ["src/pages/*.html"],
					dest: "build/",
					expand: true,
					flatten: true
				}, {
					src: 'src/css/index.css',
					dest: 'dist/css/index.css'
				}]
			}
		},
		processhtml: {
			options: {},
			build: {
				files: {
					'build/index_copy.html': 'build/index.html',
					'build/about_copy.html': 'build/about.html'
				}
			}
		},
		concat: {
			all: {
				src: ['src/js/*.js', '!src/js/about.js'],
				dest: 'src/all.js'
			}
		},
		stylus: {
			options: {
				paths: []
			},
			compile: {
				files: {
					'src/css/index.css': ['src/css/*.styl']
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true
			},
			target: {
				files: {
					'dist/js/all.js': ['src/all.js'],
					'dist/js/about.js': ['src/js/about.js'],
					'dist/lib/lib.min.js': ['src/lib/*.js']
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyJS: true
				},
				files: {
					'dist/index.html': 'build/index_copy.html',
					'dist/about.html': 'build/about_copy.html'
				}

			},
			target: {
				files: [{
					expand: true,
					cwd: 'grunt-test',
					src: ['dist/*.html'],
					dest: 'dist'
				}]
			}
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['clean', 'stylus:compile', 'copy:main', 'processhtml', 'concat:all', 'uglify', 'htmlmin:dist']);
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('test', ['clean', 'stylus:compile', 'copy:main', 'processhtml', 'concat:all', 'uglify', 'htmlmin:target']);
};