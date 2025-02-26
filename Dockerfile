# Use an Alpine-based Node.js image
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production

# Install Chromium and its dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set up environment variables for Puppeteer
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Create a non-root user
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nextjs

# Copy files from the build stage
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/public ./public

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]