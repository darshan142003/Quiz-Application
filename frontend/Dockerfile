FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve with a simple HTTP server
RUN npm install -g serve
EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
