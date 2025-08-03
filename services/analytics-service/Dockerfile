FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/analytics-service/package.json ./
RUN npm install

COPY ./services/analytics-service .
RUN npm run build

EXPOSE 3007

CMD ["npm", "start"]
