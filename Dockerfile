# FROM node:22-alpine

# # Install essential build tools and git
# RUN apk add --no-cache git bash python3 make g++ ca-certificates

# # Set working directory
# WORKDIR /app

# # Copy entrypoint
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# # Expose port 3000
# EXPOSE 3000

# ENTRYPOINT ["/entrypoint.sh"]
# -------------------------
# 1️⃣ Base image for building
# -------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./

# Install dependencies
RUN npm i

# Copy full source
COPY . .

# Build Next.js app
RUN npm run build

# -------------------------
# 2️⃣ Production image
# -------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built app from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
