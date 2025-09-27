FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

COPY . .

# Run migrations (if needed)
RUN npx prisma migrate deploy

# Run your build command
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]
