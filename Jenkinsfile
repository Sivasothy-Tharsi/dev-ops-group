pipeline {
    agent any

    stages {
        stage('SCM checkout') {
            steps {
                retry(3) {
                    checkout scmGit(branches: [[name: '*/backend']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Sivasothy-Tharsi/dev-ops-group.git']])
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t group47/backend-app-image .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Stop any running containers with the same name
                    
                    // Run the new container
                    // sh 'docker run -d -p 3002:3001 Group47/server-app-image'

                    // Stop any running containers with the same name
                    sh 'docker stop group47-backend-app-container || true'
                    sh 'docker rm group47-backend-app-container || true'
                    // Run the new container
                    sh 'docker run -d -p 3002:3001 --name group47-backend-app-container group47/backend-app-image'
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
