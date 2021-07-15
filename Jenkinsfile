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
          stage ('Preparing Docker Image for Dev testing Environment') {
            agent {
                label "k8s-slave-cf-api"
            }
            when {
              not {
                anyOf {
                  expression { params.branchName == null }
                  expression { params.branchName == "stage" }
                  expression { params.branchName == "alpha" }
                  expression { params.branchName == "master" }
                }
              }
            }
            environment {
              VERSION = "$BUILD_NUMBER-$virtualClusterName".replaceAll('_','-')
              APP_VERSION = "$GIT_COMMIT"
              VOYAGER_URL = 'http://voyager.production.cure.fit.internal/echidna/deployment'
            }
            steps {
                script{
                  buildExecutable("${APP_NAME}", "stage")
                  sh "echo building ${DOCKER_REGISTRY}/${ORG}/${APP_NAME}:${VERSION}"
                  def URL = "${DOCKER_REGISTRY}/${ORG}/${APP_NAME}:${VERSION}"
                  buildDockerfile("${APP_NAME}", URL, "stage")
                  pushDockerImage(URL)
                  updateArtifact("${DOCKER_REGISTRY}/${ORG}/${APP_NAME}", "${VERSION}", "stage")

                  sh "curl -sf -X POST \"${VOYAGER_URL}/${params.deploymentId}/trigger\" -H 'Content-Type: application/json;charset=UTF-8' --data-raw '{\"appName\": \"${APP_NAME}\", \"repoName\": \"${params.repoName}\", \"virtualClusterName\": \"${params.virtualClusterName}\", \"imageUrl\": \"${DOCKER_REGISTRY}/${ORG}/${APP_NAME}\", \"imageTag\": \"${VERSION}\"}'"
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