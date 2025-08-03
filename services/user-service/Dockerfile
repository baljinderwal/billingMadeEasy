FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/user-service/package.json ./
RUN npm install

COPY ./services/user-service .
RUN npm run build

EXPOSE 3005

CMD ["npm", "start"]
