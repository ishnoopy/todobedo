#!/bin/bash

sudo -i bash <<EOF
echo "***********************************"
echo "Navigate to the docker folder"
echo "***********************************"
cd /root/docker

echo "***********************************"
echo "Stop the application"
echo "***********************************"
docker compose down

echo "***********************************"
echo "Removing todobedo previous docker image"
echo "***********************************"
docker rmi ishnoopy/todobedo:latest -f || true

echo "***********************************"
echo "Start the application"
echo "***********************************"
docker compose up -d

echo "***********************************"
echo "Application (todobedo) is now running!"
echo "***********************************"
EOF