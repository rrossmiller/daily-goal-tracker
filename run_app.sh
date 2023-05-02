cd ui
nohup yarn dev --host 0.0.0.0 &
echo $! > ../pid.txt

cd ../api
nohup ./tracker-api &
echo $! >> ../pid.txt
