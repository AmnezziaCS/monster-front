FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]