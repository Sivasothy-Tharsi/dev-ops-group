# Fetching the latest node image on alpine linux
FROM node:18-alpine AS development

# Setting up the work directory
WORKDIR /react-app

# Copying package.json and package-lock.json
COPY package*.json ./

# Install npm latest version
RUN npm install -g npm@latest

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Exposing port
EXPOSE 5000

# Starting our application
CMD ["npm", "start"]