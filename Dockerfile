# Use official Node.js 20 LTS image as the base
FROM node:20-alpine AS build

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy dependency files and install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the React app with Vite
RUN pnpm run build

# Production stage: use Apache HTTP Server
FROM httpd:alpine

# Change Apache port to 3000
RUN sed -i 's/Listen 80/Listen 3000/' /usr/local/apache2/conf/httpd.conf

# Enable mod_rewrite
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Allow .htaccess overrides in htdocs
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Copy built files to Apache's public directory
COPY --from=build /app/dist /usr/local/apache2/htdocs/
COPY ./.htaccess /usr/local/apache2/htdocs/.htaccess

# Expose port 3000
EXPOSE 3000

# Start the Apache web server
CMD ["httpd-foreground"]