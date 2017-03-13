
module.exports = function(grunt) {
    if (process.argv.length < 3) {
        console.log('Usage: grunt projectName');
        process.exit(-1);
    }

    var projectName = process.argv[2];

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        projectName: projectName,
        projectFiles: grunt.file.readJSON(projectName + '/' + projectName + '.files.json'),
        baseFiles: [
            "base/boot.js",
            "base/events.js",
            "base/serialize.js",
            "base/entity.js",
            "base/player.js",
            "base/game.js"
        ],
        constFiles: [
            "consts/code.js"
        ],
        utilFiles: [
            "utils/utils.js"
        ],

        copy: {
        },

        concat: {
            options: {
                banner: '/*! <%= projectName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            project: {
                src: [
                    '<%= baseFiles %>',
                    '<%= constFiles %>',
                    '<%= utilFiles%>',
                    '<%= projectFiles %>'
                ],
                dest: '../client/<%= projectName%>/src/game/<%= pkg.name %>.js'
            },
            build: {
                src: [
                    '<%= baseFiles %>',
                    '<%= utilFiles%>',
                    '<%= projectFiles>'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
            },
            build: {
                src: '<%= baseFiles %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            build: {
                src: '<%= baseFiles %>'
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    if (projectName == "default") {
        grunt.registerTask("default", ['concat', 'uglify']);
    }
    else {
        grunt.registerTask(projectName, ['concat:project']);
    }
};