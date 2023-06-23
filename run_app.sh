cd ui
echo "UI"  > ../pid.txt
#nohup yarn dev --host 0.0.0.0 &
echo "*********** build *************"
yarn add -D serve
yarn
yarn build
./node_modules/.bin/serve -l 0.0.0.0 dist &
echo $! >> ../pid.txt

cd ../api
echo "API"  >> ../pid.txt
nohup ./tracker-api &
echo $! >> ../pid.txt
echo 'ps aux | grep 0.0.0.0' >> ../pid.txt
