FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./prisma ./
RUN npm i
COPY . .
RUN npm run build
CMD npx prisma migrate deploy && npm run start
