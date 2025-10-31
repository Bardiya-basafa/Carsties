# === Build Stage ===
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (with build tools for native packages)

COPY frontend/web-app/package*.json ./
RUN npm ci

COPY frontend/web-app/. .
RUN npm run build

# === Run Stage ===
FROM node:20-alpine AS runner

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=production

# Copy only the standalone output and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

# Start the server (Next provides server.js in standalone mode)
CMD ["node", "server.js"]
