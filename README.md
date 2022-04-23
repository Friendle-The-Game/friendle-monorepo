# Friendle

## About

Friendle is a game that features multiplayer wordle-like puzzles.

## How to run locally

### Environment variables

You'll have to add all required environment variables to /server/.env and /client/.env(.local). Required environment variables are listed in
/server/.env.example and /client/.env.example. If you need help with setting up any of the environemnt variables, please contact [@Ammko128](https://github.com/Ammko128) or [@JasminDudic1](https://github.com/JasminDudic1).

### Dependencies

Run this from root if you haven't installed the dependencies already:

`cd server && npm install`

`cd client && npm install`

### Migrations

Run this from root if you haven't run the migrations already:

`cd server && npx prisma migrate dev && npx prisma generate`

### Starting the application

Run this from root in two separate terminals:

`cd server && npm run dev`

`cd client && npm run start`

## How to run in staging env

Install docker and docker-compose on the machine and then run

`docker-compose up --build`

You can add a optional parameter `-d` for running containers in background.

## How to run in production env

TODO