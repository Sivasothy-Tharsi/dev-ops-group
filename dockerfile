# Use the official Node.js image based on Alpine
FROM node:18-alpine AS backend

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm latest version
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 3001

# Command to run the backend application
CMD ["npm", "start"]
