# =============================================================================
# Stage 1: Dependency install
# =============================================================================
FROM node:24-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# =============================================================================
# Stage 2: Builder
# =============================================================================
FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build production bundle
# VITE_* env vars are baked in at build time — set them in .env on VM
RUN npm run build

# =============================================================================
# Stage 3: Production — NGINX (fully rootless unprivileged image)
# =============================================================================
FROM nginxinc/nginx-unprivileged:1.27-alpine AS production

LABEL org.opencontainers.image.title="pasinfo-frontend" \
      org.opencontainers.image.description="Pasinfo News Portal — Frontend (Vue 3 / Vite)" \
      org.opencontainers.image.vendor="raflyherdianto" \
      org.opencontainers.image.url="https://pasuruaninfo.com"

USER root

# Remove default config and content (runs as root user)
RUN rm -rf /usr/share/nginx/html/* \
 && rm -f /etc/nginx/conf.d/default.conf

# Copy Vite build output and change owner to nginx
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Copy hardened NGINX config and change owner to nginx
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080 || exit 1
