# Stage 1: Build the React application
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build artifacts from the previous stage to the default Nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# (Optional but recommended for SPAs like React)
# Copy a custom Nginx configuration to handle client-side routing.
# Create a file named 'nginx.conf' (see below) and copy it.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default port)
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
