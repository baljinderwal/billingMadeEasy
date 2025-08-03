FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/payment-service/package.json ./
RUN npm install

COPY ./services/payment-service .
RUN npm run build

EXPOSE 3004

CMD ["npm", "start"]
