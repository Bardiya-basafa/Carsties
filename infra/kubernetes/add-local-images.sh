# Rebuild, save, and deploy
# Saving stage 
docker save bardiyabasafa/carsties-auction-api -o ~/k8s/carsties-auction-api.tar && \
docker save bardiyabasafa/carsties-identity-server -o ~/k8s/carsties-identity-server.tar && \
docker save bardiyabasafa/carsties-search-api -o ~/k8s/carsties-search-api.tar && \
docker save bardiyabasafa/carsties-bids-api -o ~/k8s/carsties-bids-api.tar && \ 
docker save bardiyabasafa/carsties-notification-hub -o ~/k8s/carsties-notification-hub.tar && \ 
docker save bardiyabasafa/carsties-gateway -o ~/k8s/carsties-gateway.tar && \ 
docker save bardiyabasafa/carsties-webapp -o ~/k8s/carsties-webapp.tar && \ 
docker save postgres:16.11-alpine3.22 -o ~/k8s/postgres.tar && \ 
docker save redis -o ~/k8s/redis.tar && \ 
docker save mongo -o ~/k8s/mongo.tar && \ 
docker save rabbitmq -o ~/k8s/rabbitmq.tar && \ 
docker save nginx:trixie-perl -o ~/k8s/nginx.tar && \ 

# Importing images
docker cp ~/k8s desktop-control-plane:/opt/ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-auction-api.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-bids-api.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-identity-server.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-search-api.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-notification-hub.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-gateway.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/carsties-webapp.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/postgres.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/redis.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/mongo.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/rabbitmq.tar && \ 
docker exec desktop-control-plane ctr -n=k8s.io images import /opt/k8s/nginx.tar && \ 
