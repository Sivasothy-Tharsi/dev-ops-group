pipeline {
  agent any
  environment {
    VERCEL_TOKEN=credentials('vercel-token')
    VERCEL_SCOPE='darinpope'
    WORK_DIR='je-myapp'
  }
  stages {
    stage('verify Vercel CLI') {
      steps {
        sh 'vercel --version'
      }
    }
    stage('pull') {
      steps {
        sh 'vercel --scope $VERCEL_SCOPE --cwd $WORK_DIR --no-color --token $VERCEL_TOKEN pull --yes'
      }
    }
    stage('build') {
      steps {
        sh 'vercel --scope $VERCEL_SCOPE --cwd $WORK_DIR --no-color --token $VERCEL_TOKEN build --prod --yes'
      }
    }
    stage('deploy function') {
      steps {
        sh 'vercel --scope $VERCEL_SCOPE --cwd $WORK_DIR --no-color --token $VERCEL_TOKEN deploy --prebuilt --prod'
      }
    }
    stage('sleep for a few seconds') {
      steps {
        sleep 5
      }
    }
    stage('verify deployment') {
      steps {
        sh 'curl https://$WORK_DIR.vercel.app/api/hello'
      }
    }
  }
  post { 
    cleanup { 
      cleanWs()
    }
  }
}