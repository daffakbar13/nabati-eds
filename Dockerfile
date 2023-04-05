# Stage 1: install dependencies
FROM node:17-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY vendor ./vendor
RUN yarn install

# Stage 2: build
FROM node:17-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY pages ./pages
COPY public ./public
COPY .env .env.local package.json tsconfig.json next.config.js ./
RUN yarn build

# Stage 3: run
FROM node:17-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/.env.local ./

ENV NODE_ENV production
ENV NEXT_PUBLIC_API_BASE_URL_1 https://dist-system.nabatisnack.co.id:3001/
ENV NEXT_PUBLIC_API_BASE_URL_2 https://dist-system.nabatisnack.co.id:3002/
ENV NEXT_PUBLIC_API_BASE_URL_3 https://dist-system.nabatisnack.co.id:3001/


EXPOSE 3000

CMD ["yarn", "start"]
