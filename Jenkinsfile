pipeline {
    agent any

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
                withCredentials([string(credentialsId: 'sudo_password', variable: 'SUDO_PASSWORD')]) {
                    script {
                        sh 'echo "$SUDO_PASSWORD" | sudo -S docker build -t group47/frontend-app-image .'
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                withCredentials([string(credentialsId: 'sudo_password', variable: 'SUDO_PASSWORD')]) {
                    script {
                        // Stop any running containers with the same name
                        sh 'sudo docker stop group47-frontend-app-container || true'
                        sh 'sudo docker rm group47-frontend-app-container || true'
                        // Run the new container
                        sh 'echo "$SUDO_PASSWORD" | sudo -S docker run -d -p 3003:3000 --name group47-frontend-app-container group47/frontend-app-image'
                    }
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
