# Use an official Node.js image based on Debian
FROM node:22-slim AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your application
RUN npm run build

# Production stage
FROM node:22-slim AS production

# Install Chromium and its dependencies (Debian packages)
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set up environment variables for Puppeteer
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create a non-root user for security
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser && \
    mkdir -p /home/pptruser/Downloads && \
    chown -R pptruser:pptruser /home/pptruser

WORKDIR /app

# Copy files from the build stage
COPY --from=build --chown=pptruser:pptruser /app/.next ./.next
COPY --from=build --chown=pptruser:pptruser /app/node_modules ./node_modules
COPY --from=build --chown=pptruser:pptruser /app/package.json ./package.json
COPY --from=build --chown=pptruser:pptruser /app/public ./public

USER pptruser

EXPOSE 3000
CMD ["npm", "start"]
