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
                script {
                    sh 'docker build -t group47/frontend-app-image .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Stop any running containers with the same name
                    sh 'docker stop group47-frontend-app-container || true'
                    sh 'docker rm group47-frontend-app-container || true'
                    // Run the new container
                    sh 'docker run -d -p 3003:3000 --name group47-frontend-app-container group47/frontend-app-image'
                }
            }
        }
        stage('Show Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub_password', variable: 'Dockerhub')]) {
                    script {
                        bat "docker login -u umeshgayashan -p %Dockerhub%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push umeshgayashan/frontend-app-image'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
