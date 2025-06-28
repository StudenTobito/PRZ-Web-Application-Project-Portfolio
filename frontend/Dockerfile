# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install all dependencies including devDependencies for build
ENV NODE_ENV=development
RUN npm ci || npm install

# Copy application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with a lightweight server
FROM node:20-alpine
WORKDIR /app

# Copy only the build output
COPY --from=build /app/dist /app/dist

# Install static server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"] 