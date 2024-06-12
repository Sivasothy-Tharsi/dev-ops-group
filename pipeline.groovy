pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('sivasothy-dockerhub')
        GIT_ACCESS_TOKEN = credentials('sivasothy-github')
    }

    stages {
        stage('Fetch code') {
            steps {
                script {
                    git credentialsId: 'sivasothy-github', url: 'https://github.com/Sivasothy-Tharsi/4232-Tharsi.git'
                }
            }
        }

        stage('Build Docker images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        script {
                            dir('backend') {
                                sh 'docker build -t sivasothytharsi/backend:$BUILD_NUMBER .'
                            }
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        script {
                            dir('frontend') {
                                sh 'docker build -t sivasothytharsi/frontend:$BUILD_NUMBER .'
                            }
                        }
                    }
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            parallel {
                stage('Push Backend Image') {
                    steps {
                        sh 'docker push sivasothytharsi/backend:$BUILD_NUMBER'
                    }
                }
                stage('Push Frontend Image') {
                    steps {
                        sh 'docker push sivasothytharsi/frontend:$BUILD_NUMBER'
                    }
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
