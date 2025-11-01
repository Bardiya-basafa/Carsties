# Use a specific Node.js version
FROM node:23-alpine AS builder
WORKDIR /app
COPY frontend/web-app/. .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]