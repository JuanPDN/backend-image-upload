FROM alpine:latest

LABEL author="Juan Pablo Delgado Nivia"

RUN apk add --no-cache nodejs npm
RUN npm -g install pnpm

WORKDIR /usr/src/app

COPY ./package*.json  /usr/src/app

RUN pnpm install

COPY . /usr/src/app

EXPOSE 3001

ENV DATABASE_URL="file:./dev.db"
RUN apk add --no-cache openssl
RUN npx prisma migrate dev --name init

CMD [ "pnpm", "run", "start" ]