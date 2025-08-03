FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/order-service/package.json ./
RUN npm install

COPY ./services/order-service .
RUN npm run build

EXPOSE 3003

CMD ["npm", "start"]
