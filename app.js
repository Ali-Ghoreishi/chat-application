const express = require("express");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser')

const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: false }))

//* Load Config
require("dotenv").config({ path: './config/config.env' })

//* CookieParser
app.use(cookieParser())

//* View Engine
app.set('views', 'views')
app.set('view engine', 'ejs')

//* Statics Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/users", require('./routes/users'));



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



//* Setup websocket

const users = {}

io.on("connection", (socket) => {
  // console.log(`User Connected. ${socket.id}`);

  // Listening

  socket.on("login", (data) => {
    console.log(`${data.nickname} Connected.`);
    socket.join(data.roomNumber)
    users[socket.id] = { nickname: data.nickname , roomNumber: data.roomNumber }                      // object users ==>  key = socket.id   ,   value = nickname
    io.emit("online", users)
  });

  socket.on("chat message", (data) => {
    io.to(data.roomNumber).emit("chat message", data);
  });

  socket.on("typing", (data) => {
    socket.to(data.roomNumber).emit("typing", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete users[socket.id]
    io.emit("online", users)
  });

  socket.on("pvChat", (data) => {
    console.log(`Private Chat Data: ${data}`);
    console.log(data.to);
    io.to(data.to).emit("pvChat", data);
  });
});
