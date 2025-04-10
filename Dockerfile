# Use an official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Pass build arguments as environment variables
ARG REACT_APP_BACKEND_APP_HOST
ARG REACT_APP_BACKEND_APP_PORT
ARG REACT_APP_BACKEND_APP_BASE_URL
ENV REACT_APP_BACKEND_APP_HOST=$REACT_APP_BACKEND_APP_HOST
ENV REACT_APP_BACKEND_APP_PORT=$REACT_APP_BACKEND_APP_PORT
ENV REACT_APP_BACKEND_APP_BASE_URL=$REACT_APP_BACKEND_APP_BASE_URL

# Build the React application
RUN npm run build

# Use an official Nginx image to serve the built application
FROM nginx:1.27.4-alpine-slim

# Copy the built React application to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
