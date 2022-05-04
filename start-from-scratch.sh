#!/bin/sh
echo "This file will stop existing BranchX containers and networks, remove them, build a fresh image and create networks and containers again"
podman stop branchx && podman rm branchx
podman stop branchx-db && podman rm branchx-db
podman build --tag branchx:dev-1 ./middleware/
podman network rm -f branchx-network
podman network create branchx-network
podman run -d  --name branchx-db --network branchx-network mongo  
podman run -d  -p8080:8080 --network branchx-network --name branchx localhost/branchx:dev-1