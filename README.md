# Friendle

## How to run locally

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
