cd ui
echo "UI"  > ../pid.txt
#nohup yarn dev --host 0.0.0.0 &
yarn preview
echo $! >> ../pid.txt

cd ../api
echo "API"  >> ../pid.txt
nohup ./tracker-api &
echo $! >> ../pid.txt
echo 'ps aux | grep 0.0.0.0' >> ../pid.txt
