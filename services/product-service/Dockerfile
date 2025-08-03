FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/product-service/package.json ./
RUN npm install

COPY ./services/product-service .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
