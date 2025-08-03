FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/notification-service/package.json ./
RUN npm install

COPY ./services/notification-service .
RUN npm run build

EXPOSE 3008

CMD ["npm", "start"]
