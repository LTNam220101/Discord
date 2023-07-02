pipeline {
    agent any
    stages {
        stage('Github'){
            steps{
                git 'https://github.com/LTNam220101/Discord.git'
            }
        }
        // stage('DockerHub'){
        //     steps{
        //         withDockerRegistry(credentialsId: 'dockerhub2', url: 'https://index.docker.io/v1/') {
        //             sh 'docker build -t quangtranvan1501/discord-test .'
        //             sh 'docker push quangtranvan1501/discord-test'
        //         }
        //     }
        // }
        stage('SSH server'){
            steps{
                sshPublisher(publishers: [sshPublisherDesc(configName: 'instance-2', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'cd package.json package-demo.json', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'package.json')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}