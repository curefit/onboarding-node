pipeline {
  agent {
    label "k8s-slave"
    }
  environment {
    ORG = 'curefit'
    APP_NAME = 'voyager'
    NPM_TOKEN = credentials('npm-token')
    GITHUB_NPM_TOKEN = credentials('github-npm-token')
    }
  stages {
    stage('Prepare Docker Image for Stage Environment') {
      when { branch 'order-service' }
      environment {
        PREVIEW_VERSION = "$BUILD_NUMBER-$BRANCH_NAME".replaceAll('_','-')
        }
      steps {
          script{
            def URL = "${DOCKER_REGISTRY}/${ORG}/${APP_NAME}:${PREVIEW_VERSION}"
            buildDockerfile("${APP_NAME}", URL, "stage")
            pushDockerImage(URL)
            updateArtifact("${DOCKER_REGISTRY}/${ORG}/${APP_NAME}", "${PREVIEW_VERSION}", "stage")
          }
        }
      };
    stage('Prepare Docker Image for Alpha Environment') {
          when { branch 'stage' }
          environment {
            VERSION = "$BUILD_NUMBER-$BRANCH_NAME".replaceAll('_','-')
            }
          steps {
              script{
                def URL = "${DOCKER_REGISTRY}/${ORG}/${APP_NAME}:${VERSION}"
                buildDockerfile("${APP_NAME}", URL, "stage")
                pushDockerImage(URL)
                updateArtifact("${DOCKER_REGISTRY}/${ORG}/${APP_NAME}", "${VERSION}", "stage")
              }
            }
          };
    stage('Prepare Docker Image for Alpha Environment') {
          when { branch 'alpha' }
          environment {
            VERSION = "$BUILD_NUMBER-$BRANCH_NAME".replaceAll('_','-')
            }
          steps {
              script{
                def URL = "${DOCKER_REGISTRY}/${ORG}/${APP_NAME}:${VERSION}"
                buildDockerfile("${APP_NAME}", URL, "alpha")
                pushDockerImage(URL)
                updateArtifact("${DOCKER_REGISTRY}/${ORG}/${APP_NAME}", "${VERSION}", "alpha")
              }
            }
          };
    stage('Prepare Docker Image for Production Environment') {
      when{ branch 'master'; }
      environment {
        RELEASE_VERSION = "$BUILD_NUMBER"
        }
      steps {
          script{
            def URL = "${DOCKER_REGISTRY}/${ORG}/${APP_NAME}:${RELEASE_VERSION}"
            buildDockerfile("${APP_NAME}", URL, "prod")
            pushDockerImage(URL)
            updateArtifact("${DOCKER_REGISTRY}/${ORG}/${APP_NAME}", "${RELEASE_VERSION}", "prod")
            }
        }
      };
    }
  post {
    success {
      cleanWs()
      }
    }
  }

void buildDockerfile(appName, tag, env){
  sh "sudo docker build -t ${tag} --build-arg NPM_TOKEN=${NPM_TOKEN} --build-arg GITHUB_NPM_TOKEN=${GITHUB_NPM_TOKEN} --build-arg ENVIRONMENT=${env} --build-arg APP_NAME=${appName} --network host ."
}

void pushDockerImage(tag){
   sh "sudo docker push ${tag}"
}

void updateArtifact(repo, tag, env) {
    sh """
    touch build.properties
    echo repo=${repo} >> build.properties
    echo tag=${tag} >> build.properties
    echo env=${env} >> build.properties
    """
    archiveArtifacts 'build.properties'
}