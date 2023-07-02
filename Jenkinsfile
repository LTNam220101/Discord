pipeline {
    agent any
    stages {
        stage('Github'){
            steps{
                git 'https://github.com/LTNam220101/Discord.git'
            }
        }
        stage('DockerHub'){
            steps{
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t quangtranvan1501/discord-test .'
                    sh 'docker push quangtranvan1501/discord-test'
                }
            }
        }
    }
}