cd ui
echo "UI"  > ../pid.txt
nohup yarn dev --host 0.0.0.0 &
echo $! >> ../pid.txt

cd ../api
echo "API"  >> ../pid.txt
nohup ./tracker-api &
echo $! >> ../pid.txt
