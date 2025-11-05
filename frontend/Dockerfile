FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./

RUN npm ci
COPY . .
RUN npm run build
