pipeline {
    agent any

    stages {
        stage('SCM checkout') {
            steps {
                retry(3) {
                    checkout scmGit(branches: [[name: '*/frontend']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/SupunTJ/MERN-app-frontend-dockerizing.git']])
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t Group47/frontend-app-image .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Stop any running containers with the same name
                    
                    // Run the new container
                    sh 'docker run -d -p 3003:3000 Group47/frontend-app-image'
                }
            }
        }
        stage('Show Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}