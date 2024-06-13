pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('sivasothy-dockerhub')
        GIT_ACCESS_TOKEN = credentials('dev-github')
    }

    stages {
        stage('Fetch code') {
            steps {
                script {
                    git credentialsId: 'dev-github', url: 'https://github.com/Sivasothy-Tharsi/dev-ops-group.git'
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
                // Stop and remove existing containers if any
                sh '''
                    docker rm -f backend || true
                    docker rm -f frontend || true
                '''
                // Run backend container
                sh '''
                    docker run -d --name backend -p 5000:5000 sivasothytharsi/backend:$BUILD_NUMBER
                '''
                // Run frontend container
                sh '''
                    docker run -d --name frontend -p 3000:3000 sivasothytharsi/frontend:$BUILD_NUMBER
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
