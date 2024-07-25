# if the data doesn't exist move it to where the tracker-api can read it
if [[ ! -f data.db ]]; then
  mv ~/data.db .
fi

nohup serve dist >ui.log 2>&1 &
echo kill -9 $! >pid.sh

nohup ./tracker-api >api.log 2>&1 &
echo kill -9 $! >>pid.sh

chmod +x pid.sh
