FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/vendor-service/package.json ./
RUN npm install

COPY ./services/vendor-service .
RUN npm run build

EXPOSE 3009

CMD ["npm", "start"]
