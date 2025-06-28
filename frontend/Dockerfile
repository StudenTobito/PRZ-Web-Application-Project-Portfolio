# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
<<<<<<< HEAD
COPY package*.json ./
RUN npm install
=======

# Sadece gerekli dosyaları kopyala
COPY package.json package-lock.json ./

# node_modules ve lockfile sorunlarını önlemek için temiz kurulum
RUN npm ci || npm install

# Uygulama kaynaklarını kopyala
>>>>>>> fc6db08 (Update Dockerfile for robust build)
COPY . .

# Build işlemi
RUN npm run build

# Stage 2: Serve the application with a lightweight server
FROM node:20-alpine
WORKDIR /app

# Sadece build çıktısını kopyala
COPY --from=build /app/dist /app/dist

# Static server kur
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"] 