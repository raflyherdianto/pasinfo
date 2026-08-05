# =============================================================================
# Stage 1: Module cache
# =============================================================================
FROM golang:1.25-alpine AS deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

# =============================================================================
# Stage 2: Builder
# =============================================================================
FROM deps AS builder

ARG TARGETOS=linux
ARG TARGETARCH=arm64

COPY . .

# Security build flags:
#   -trimpath      : strips local paths from binary (no filesystem leakage)
#   -s -w          : strip debug symbols and DWARF (smaller, harder to reverse)
#   CGO_ENABLED=0  : pure Go static binary (no C cross-compiler required)
RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} \
    go build \
      -trimpath \
      -ldflags="-s -w" \
      -o /app/bin/api ./cmd/api

# Verify the binary was actually built
RUN test -f /app/bin/api || (echo "Build failed" && exit 1)

# =============================================================================
# Stage 3: Production image — minimal Alpine
# =============================================================================
FROM alpine:3.21 AS production

LABEL org.opencontainers.image.title="pasinfo-backend" \
      org.opencontainers.image.description="Pasinfo News Portal — Backend API (Go/Fiber)" \
      org.opencontainers.image.vendor="raflyherdianto" \
      org.opencontainers.image.url="https://api.pasuruaninfo.com"

# ── Runtime packages ──────────────────────────────────────────────────────────
# ca-certificates : TLS certificate validation for outbound HTTPS requests
# tzdata          : Asia/Jakarta timezone support
RUN apk add --no-cache ca-certificates tzdata \
    && update-ca-certificates

# ── Principle of Least Privilege: create a dedicated non-root user ─────────────
RUN addgroup --system --gid 10001 pasinfo \
 && adduser  --system --uid 10001 --ingroup pasinfo --no-create-home --disabled-password pasinfo

WORKDIR /app

# ── Copy binary from builder (owned by the non-root user) ────────────────────
COPY --from=builder --chown=pasinfo:pasinfo /app/bin/api ./api

# ── Upload directory for images (volume-mounted in docker-compose) ────────────
RUN mkdir -p /app/uploads/images \
 && chown -R pasinfo:pasinfo /app/uploads/images \
 && chmod 750 /app/uploads/images

# ── Drop to non-root user ─────────────────────────────────────────────────────
USER pasinfo

# ── Expose API port ───────────────────────────────────────────────────────────
EXPOSE 8080

# ── Health check ──────────────────────────────────────────────────────────────
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget -qO- http://localhost:8080/api/v1/health || exit 1

ENTRYPOINT ["./api"]
