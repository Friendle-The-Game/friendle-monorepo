import express from 'express';
import cors from 'cors';
import { apiRouter } from './apiRouter';
import config from './config';
import handleSocket from './sockets/socketHandler'
import { Server } from "socket.io";

const checkEnvironmentVariables = (variables: Record<string, any>) => {
  const {
      NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USERNAME, NODEMAILER_PASSWORD, REST_API_PORT
  } = variables;
  if (!NODEMAILER_HOST) throw new Error('Environment variable "NODEMAILER_HOST" is missing.');
  if (!NODEMAILER_PORT) throw new Error('Environment variable "NODEMAILER_PORT" is missing.');
  if (!NODEMAILER_USERNAME) throw new Error('Environment variable "NODEMAILER_USERNAME" is missing.');
  if (!NODEMAILER_PASSWORD) throw new Error('Environment variable "NODEMAILER_PASSWORD" is missing.');
  if (!REST_API_PORT) throw new Error('Environment variable "REST_API_PORT" is missing.');
};

checkEnvironmentVariables(process.env);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const server = require('http').createServer(app);
server.listen(config.restApiPort, () =>
  console.log('Server ready at: http://localhost:4000')
);


const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
const onConnection = (socket: any) => {
  handleSocket(io, socket);
}
io.on("connection", onConnection)



/*
const io = require('socket.io')(server);

io.on("connection", onConnection)
*/