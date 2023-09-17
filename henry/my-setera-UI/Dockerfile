FROM node:16.17-alpine3.16
WORKDIR /app

ENV DEV="development"
ENV QA="qa"
ENV UAT="uat"
ENV PROD="production"

COPY package*.json ./
COPY ./ ./
COPY .env* ./
RUN npm install
EXPOSE 3000
CMD ["sh", "-c", "npm run start"]