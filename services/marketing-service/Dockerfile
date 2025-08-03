FROM node:18-alpine

WORKDIR /app

# Copy shared packages first
COPY ./shared ./shared

# Copy package.json and install dependencies
COPY ./services/marketing-service/package.json ./
RUN npm install

COPY ./services/marketing-service .
RUN npm run build

EXPOSE 3006

CMD ["npm", "start"]
