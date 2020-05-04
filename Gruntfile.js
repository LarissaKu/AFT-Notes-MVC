module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['assets/css/']
                },
                files: {
                    './public/main.css': 'assets/css/main.less'
                }
            }
        },
        concat: {
            dist: {
                src: ['assets/js/*.js'],
                dest: 'public/main.js',
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    src: ['public/main.css'],
                    dest: '',
                    ext: '.min.css'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/index.min.html': 'index.html',
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    ['public/main.min.js']: ['public/main.js']
                }
            }
        },
        jsbeautifier : {
            files : ["public/main.min.js"],
            options : {
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'notes-mvc.zip'
                },
                files: [{
                    expand: true,
                    src: ['public/*'],
                    dest: '/'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['**'],
                        dest: '../copyfolder'},
                ]
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify']
            },
            styles: {
                files: ['assets/css/*.less'],
                tasks: ['less', 'cssmin']
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/css/*.less',
                        'assets/js/*.js'
                ]
                },
                options: {
                    watchTask: true,
                    proxy: "localhost:63342/AFT-Notes-MVC/public/" //enter your proxy
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', ['less', 'concat', 'cssmin', 'htmlmin', 'uglify', 'compress', 'copy']);
    grunt.registerTask('beautifyjs', ['jsbeautifier']);
    grunt.registerTask('serve', ['default', 'browserSync', 'watch']);

};