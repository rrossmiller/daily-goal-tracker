cd ui
echo "UI" >../pid.txt
yarn &&
  nohup yarn dev --host 0.0.0.0 >../ui.log 2>&1 &
# nohup yarn preview >ui.log 2>&1 &
echo $! >>../pid.txt

cd ../api
go build
echo "API" >>../pid.txt
nohup ./tracker-api > ../api.log 2>&1 &
echo $! >>../pid.txt
# echo 'ps aux | grep 0.0.0.0' >>../pid.txt
