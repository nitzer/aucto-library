# backend/Dockerfile-dev
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# to leverage Docker cache for dependencies
COPY package*.json ./

# Install all dependencies (including devDependencies needed for 'start:dev')
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your NestJS application listens on (e.g., 3000)
EXPOSE 3000

# Command to run the NestJS application in development (watch mode)
# This command will be overridden by docker-compose.yml for convenience
CMD ["npm", "run", "start:dev"]