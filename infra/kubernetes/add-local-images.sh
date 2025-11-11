# Rebuild, save, and deploy
docker build -t bardiyabasafa/carsties-auction-api . && \
docker save bardiyabasafa/carsties-auction-api -o carsties-api.tar && \
docker cp carsties-api.tar desktop-control-plane:/tmp/ && \
docker exec desktop-control-plane ctr -n=k8s.io images import /tmp/carsties-api.tar && \
kubectl rollout restart deployment/carsties-auction-api && \
rm carsties-api.tar