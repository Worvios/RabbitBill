# Use a Debian-based Node.js image
FROM node:22-bullseye AS build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:22-bullseye AS production

# Install Chromium and its dependencies
RUN apt-get update && \
    apt-get install -y \
    wget \
    gnupg \
    fonts-freefont-ttf \
    libnss3 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libgbm1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up environment variables for Puppeteer
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy files from the build stage
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/public ./public

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]