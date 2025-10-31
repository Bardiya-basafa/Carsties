# Use Node 23 Alpine as the builder
FROM node:23-alpine AS builder

WORKDIR /app

# Install dependencies separately for efficient Docker caching
COPY frontend/web-app/package*.json ./
RUN npm install --production=false

# Copy the rest of the application
COPY frontend/web-app/ .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:23-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY frontend/web-app/package*.json ./
RUN npm install --omit=dev

# Copy built assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Start Next.js in standalone mode
CMD ["npm", "start"]