import express from "express";
import ConnectDB from "./config/ConnectDB";
import initRoutes from './routers/Router';
import configViewEngine from './config/ConfigView';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import session from "./config/Session";
import passport from "passport";
import configSocketIo from './config/Socket';
import http from 'http';
import cookieParser from 'cookie-parser'
import socketIO from 'socket.io';
import initSockets from './socket/index';

var app = express();

const server = http.createServer(app);
const io = socketIO(server);

ConnectDB();

session.config(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);

configSocketIo(io, cookieParser, session);
initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(process.env.APP_PORT);
})
