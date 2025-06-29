# === Stage 1: Builder ===
FROM node:20.15.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY .eslintrc.json components.json jsconfig.json next.config.mjs postcss.config.mjs tailwind.config.js ./
COPY . .
RUN npm run build

# === Stage 2: Runner ===
FROM node:20.15.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./


EXPOSE 3000
CMD ["npm", "start"]