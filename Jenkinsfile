pipeline {
    agent any

    environment {
        SUDO_PASSWORD = credentials('sudo_password')
    }

    stages {
        stage('SCM checkout') {
            steps {
                retry(3) {
                    checkout scmGit(branches: [[name: '*/frontend']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Sivasothy-Tharsi/dev-ops-group']])
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'echo $SUDO_PASSWORD | sudo -S docker build -t Group47/frontend-app-image .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Stop any running containers with the same name
                    sh 'sudo docker stop $(sudo docker ps -q --filter "name=Group47/frontend-app-container") || true'
                    sh 'sudo docker rm $(sudo docker ps -a -q --filter "name=Group47/frontend-app-container") || true'
                    // Run the new container
                    sh 'echo $SUDO_PASSWORD | sudo -S docker run -d -p 3003:3000 --name Group47/frontend-app-container Group47/frontend-app-image'
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
