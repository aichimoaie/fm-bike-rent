# Multi-stage build for the SvelteKit (adapter-node) app.
# Build: docker build -t filios-bike .
# Run:   docker run -p 3000:3000 --env-file .env -v filios-data:/app/data filios-bike

FROM node:22-alpine AS builder
WORKDIR /app

# better-sqlite3 needs to compile/fetch its native binding; these are only
# needed at build time (removed from the final runtime image below).
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Prune devDependencies out of node_modules for the runtime image.
RUN npm prune --omit=dev

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# SQLite file lives here; mount a volume at /app/data to persist reservations
# across container restarts/redeploys.
ENV DATABASE_PATH=/app/data/data.sqlite3

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p /app/data

EXPOSE 3000
CMD ["node", "build/index.js"]
