# Stage 1: Builder stage
FROM node:20-alpine as builder

# Install necessary system dependencies and PNPM
RUN apk add --no-cache libc6-compat && \
  npm install -g pnpm@9.1.1

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies in lock file to ensure consistent installs and version
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Setting up NGINX server and serving the build
FROM nginx:alpine as runner

# Working directory for NGINX
WORKDIR /usr/share/nginx/html

# Remove static assets from default NGINX installation
RUN rm -rf ./*

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]




