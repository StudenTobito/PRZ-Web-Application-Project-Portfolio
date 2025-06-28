# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies for build tools
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force
ENV NODE_ENV=development
RUN npm install

# Ensure vite is available globally
RUN npm install -g vite

# Copy application source code
COPY . .

# Clear any potential cache issues and build using npx
RUN npm cache clean --force
RUN npx vite build

# Stage 2: Serve the application with a lightweight server
FROM node:20-alpine
WORKDIR /app

# Copy only the build output
COPY --from=build /app/dist /app/dist

# Install static server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"] 
