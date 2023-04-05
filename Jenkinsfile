pipeline{
    environment {
        servicename = 'eds-web'
        url = 'https://harbor.nabatisnack.co.id'
        urlnonprotocol = 'harbor.nabatisnack.co.id'
        credentialId = 'harborregistry'
        projectdocker= 'eds'
    }
    agent any
    // agent { node { label 'agent1' } }
    // tools {
    //     go 'go-1.18'
    // }
    // options {
    //     retry(3)
    // }
    stages {
        // stage('Test') {
        //     steps {
        //         script {
        //                 sh 'go test ./... -coverprofile=coverage.out'
        //         }
        //     }
        // }
        // tag belum trigger build 
        stage('ini tag') {
            when { 
                tag 'v*';
            }
            steps {
                script {
                    sh 'ini PR'
                }
            }
        }
        stage('ini PR') {
            when { 
                branch 'PR-*';
            }
            steps {
                script {
                    sh 'ini PR'
                }
            }
        }
        stage('Build Image Branch Develop') {
            when { 
                branch "develop"
            }
            steps {
                echo 'Build Image Prod'
                sh 'docker build . -t ${servicename}:${BRANCH_NAME}-${BUILD_NUMBER}'
                sh 'echo ini build image prod'
            }
        }
        stage('Docker Login tag push Branch Develop') {
            when { 
                branch 'develop';
            }
            steps {
                script {
                    echo 'Push docker image ke docker registry Harbor'
                    docker.withRegistry(url, credentialId) {
                        sh 'docker tag ${servicename}:${BRANCH_NAME}-${BUILD_NUMBER} ${urlnonprotocol}/${projectdocker}/${servicename}:${BRANCH_NAME}-${BUILD_NUMBER}'
                        sh 'docker push ${urlnonprotocol}/${projectdocker}/${servicename}:${BRANCH_NAME}-${BUILD_NUMBER}'
                        sh 'echo ini docker login tag push Beta'
                    }
                }
            }
        }
		stage('Set Image VM branch Develop') {
            when { 
                branch "develop"
            }
            steps {
                script {
                    sshagent (credentials: ['ssheds']) {
					sh 'ssh -t -o StrictHostKeyChecking=no -l cicd 10.1.201.58 -p 22 "pwd; ls -la; sudo docker ps -a; sudo docker rm ${servicename} -f; sudo docker pull ${urlnonprotocol}/${projectdocker}/${servicename}:${BRANCH_NAME}-${BUILD_NUMBER}; sudo docker run -d --name ${servicename} --network=local-eds -v /home/admin/.config/eds-web/.env:/app/.env -p 80:3000/tcp ${urlnonprotocol}/${projectdocker}/${servicename}:${BRANCH_NAME}-${BUILD_NUMBER}"'
					}
                }
            }
        }
    }
}