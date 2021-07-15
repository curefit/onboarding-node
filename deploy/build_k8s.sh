#!/usr/bin/env bash
# Build the client and server, place the deployable package to build_dir_path
# ./build.sh build_dir_path environment

set -x
set -e

name="voyager"
BUILD_DIR_PATH=$1
ENV=$2
echo "Current Build Directory ${BUILD_DIR_PATH}"

if [[ -z ${BUILD_DIR_PATH} ]]
then
    echo "Build Directory Path is Mandatory"
    exit 1
fi

if [[ -z ${ENV} ]]
then
    echo "Environment is necessary for build"
    exit 1
fi

echo "Building Server"
cd server
rm -rf node_modules || true
rm -rf public || true
rm -rf dist || true
yarn install
npm run build
echo "Server Built Successfully"
cd ..

mkdir -p ${BUILD_DIR_PATH}/deploy

cd ..

mkdir -p ${BUILD_DIR_PATH}/${name}
cp -r ${name}/server/node_modules ${BUILD_DIR_PATH}/${name}
cp -r ${name}/server/dist ${BUILD_DIR_PATH}/${name}
cp -r ${name}/server/*.json ${BUILD_DIR_PATH}/${name}

set +x
set +e