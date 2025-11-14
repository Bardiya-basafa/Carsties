# Rebuild, save, and deploy
docker cp ~/k8s desktop-control-plane:/opt/ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-auction-api.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-bids-api.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-identity-server.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-search-api.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-notification-hub.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-gateway.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-webapp.tar && \ 
# kubectl rollout restart deployment/carsties-auction-api && \
# rm carsties-api.tar