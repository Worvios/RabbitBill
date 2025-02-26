# Use an official Node.js image based on Debian
FROM node:22-slim AS build

# Set the working directory
WORKDIR /app

# Install necessary dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your application
RUN npm run build

# Production stage
FROM node:22-slim AS production

# Install necessary packages, including Chromium and its dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create a non-root user
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser && \
    mkdir -p /home/pptruser/Downloads && \
    chown -R pptruser:pptruser /home/pptruser

# Set the working directory
WORKDIR /app

# Copy built files and dependencies from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

# Change to the non-root user
USER pptruser

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
