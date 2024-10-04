const { task, option } = require("grunt");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: { //esse comando "development" é o ambiente padrão em que o arquivo é rodado/gerado | Como exemplo, caso o projeto esteja rodando em um ambiente de 'PRODUÇÃO' (EXEMPLO: site Versel)
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' //Indicar o arquivo de entrada e saída.
                }
            },
            production: {
                options: { //comando para comprimir o arquivo LESS.
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' //Indicar o arquivo de entrada e saída.
                }
            } //Desde o comando 'PRODUCTION' até esse ponto se trata da versão de produção minificado, deve ser criado dessa maneira para rodar de forma mais leve os códigos.
        }, //*colocar a "," para separar os plugin instalados.    
        watch: { //Utilizado para náo precisar escrever sempre o comando 'npm run grunt: cada vez que fazemos uma alteração do arquivo.
            less: {
                files: ['src/styles/**/*.less'], //Utilizar '**' quando queremos encontrar uma pasta e utilizamos '*' quando queremos encontrar algum arquivo.
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html' //1 - minificacap
                    //2 - substituicao
                }
            }
        },
        clean: ['prebuild'], //Comando para apagar a pasta temporário 'prebiuld'.
        uglify: { //Comando serve para comprimir o arquivo, a fim de ganhar performance no carregamento da página.
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //Comando para carregar os plugins que instalamos para desenvolver o projeto nesse caso instalamos o LESS.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt.registerTask('default', ['olaGrunt']); //Utilizar esse comando para criar a tarefa 'default'a fim de utilizar apenas o comando "npm rum grunt" para executar todas as tarefas dentro do [].
    grunt.registerTask('default', ['watch']); // ['less', 'sass'] é como se fosse um 'array'.
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}