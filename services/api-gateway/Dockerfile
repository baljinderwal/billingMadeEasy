FROM node:18-alpine

WORKDIR /app

# Copy shared packages first and build them
COPY ./shared ./shared
WORKDIR /app/shared/types
RUN npm install && npm run build
WORKDIR /app/shared/utils  
RUN npm install && npm run build
WORKDIR /app/shared/middleware
RUN npm install && npm run build

# Go back to app directory and copy service files
WORKDIR /app
COPY ./services/api-gateway/package.json ./
RUN npm install

COPY ./services/api-gateway .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
