#! /bin/zsh

if [[ $# != 1 ]]; then
  echo "the first (and only) arg is the host to copy the bin to"
  exit 1
fi
clear

echo "build api"
cd api
docker build -t cross -f cross.Dockerfile . && # bulid dockerfile
  docker rm -f cross && #prepare env and run image
  docker run --name cross cross &&
  docker cp cross:/dgt/api/app . && # retrieve bin
  mv app tracker-api && # rename
  scp tracker-api $1:Documents && # copy bin to pi
  scp data.db $1: && # copy data to pi
  rm tracker-api

echo "build ui"
cd ../ui
yarn build &&
  scp -r dist $1:Documents

cd ..
scp run_on_server.sh $1:Documents
