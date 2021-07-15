FROM node:12.14.1-stretch-slim as intermediate

ARG NPM_TOKEN

ARG GITHUB_NPM_TOKEN

ARG APP_NAME

ARG ENVIRONMENT

ADD . /${APP_NAME}

RUN apt-get update && apt-get install bzip2 libpng-dev -y

RUN echo ${NPM_TOKEN} > /root/.npmrc
RUN echo ${GITHUB_NPM_TOKEN} >> /root/.npmrc
RUN echo '@curefit:registry=https://npm.pkg.github.com/' >> /root/.npmrc
RUN echo 'registry=https://registry.npmjs.org/' >> /root/.npmrc
RUN echo 'unsafe-perm=true' >> /root/.npmrc

RUN mkdir -p /${APP_NAME}-deploy/

WORKDIR /${APP_NAME}

RUN deploy/build_k8s.sh /${APP_NAME}-deploy ${ENVIRONMENT}



FROM node:12.14.1-stretch

ARG APP_NAME

ENV destination='/home/ubuntu/deployment'

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=intermediate /${APP_NAME}-deploy/  ${destination}

WORKDIR ${destination}/${APP_NAME}

RUN apt-get update && apt-get install procps curl -y && npm config set unsafe-perm true && npm install -g typescript && mkdir -p /logs/${APP_NAME}

CMD ["node", "dist/index.js"]
