# Use Node.js LTS as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app with environment variables
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ARG VITE_PORT
ENV VITE_PORT=$VITE_PORT

# Build the React Vite application
RUN npm run build

# Use a lightweight server for production (e.g., serve)
RUN npm install -g serve

# Expose the application port
EXPOSE 3000

# Command to serve the build folder on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]