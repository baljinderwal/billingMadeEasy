FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/cart-service/package.json ./
RUN npm install

COPY ./services/cart-service .
RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]
