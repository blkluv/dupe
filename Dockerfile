FROM node:20-slim

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

COPY server/ ./server/

EXPOSE 5001
CMD ["node", "server/index.js"]