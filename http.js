import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./", "public")));

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

export { serverHttp, io };
