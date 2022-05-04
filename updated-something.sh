#!/bin/sh
echo "This file will stop existing BranchX Middleware, build a fresh image and run container again"
podman stop branchx && podman rm branchx
podman build --tag branchx:dev-1 ./middleware/
podman run -d  -p8080:8080 --network branchx-network --name branchx localhost/branchx:dev-1