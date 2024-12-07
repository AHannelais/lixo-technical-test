# Use Node.js LTS as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /api
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and other files
COPY prisma ./prisma

# Run Prisma generate to create the client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Set the command to start the application
CMD ["npm", "run", "start"]
