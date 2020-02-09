import cors from "cors";
import express from "express";
import helmet from "helmet";
import socket from "socket.io";
import userController from "./controller/user.controller";
import { onConnect } from "./services/socket.service";
import userService from "./services/user.service";
import chatService from "./services/chat.service";
import { User } from "@wirc/common";

const PORT = 3000;

// create root account and main chatt

const user = userService.register({
  birthDate: "1970-01-01",
  nickname: "root",
  email: "root@root.io"
});

chatService.newChat("main", (user as User).email);

const server = express();

server
  .use(cors({ credentials: true, origin: "http://localhost:1337" }))
  .use(helmet())
  .use(express.json())
  .use(helmet.noCache())
  .use(helmet.noSniff())
  .use(helmet.xssFilter())
  .use(helmet.frameguard())
  .use(helmet.hidePoweredBy())
  .disable("etag")
  .disable("x-powered-by");

server.use("/user", userController);
const http = server.listen(PORT, () => {
  console.log("start on " + PORT);
});

const io = socket(http, { origins: "*:* http://192.168.0.102:1337" });

io.on("connection", onConnect);
