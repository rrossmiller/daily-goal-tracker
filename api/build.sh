#! /bin/bash
clear
# go build -x
#clear
#./tracker-api
env GOOS=linux GOARCH=arm GOARM=7 go build
