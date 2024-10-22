# Stage 1: Build the React application
FROM node:14 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps --unsafe-perm=true --no-audit

# Copy the rest of the application source code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx

# Copy built files from the builder stage to Nginx's web directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration if needed
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

