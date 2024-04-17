const express = require('express');
const socketIO = require('socket.io');
const { Server } = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');

// messages
const {Message, User} = require('./db.js')
const {Sequelize, Op,} = require('sequelize');
const { off } = require('process');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/speakit', routes);
// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  }
});


// Handle socket.io connections
io.on("connection", async (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id}`);
  });

  socket.on("joinRoom", (chatId)=> {
    socket.join(chatId)
    console.log(`user joined to chat ${chatId}`)
  })

  socket.on('sendMessage', async (data) => {
    try {
      const { senderId, receiverId, senderPicture, senderName, senderUsername, content, chatId, offset } = data;
  
      const newMessage = await Message.create({
        senderId,
        receiverId,
        senderPicture,
        senderName,
        senderUsername,
        content,
        chatId,
      });

      const messageInfo = {
        senderId,
        receiverId,
        senderPicture,
        senderName,
        senderUsername,
        content,
        chatId,
        id: newMessage.id
      };

  
      io.to(chatId).emit("receiveMessage", messageInfo);
      console.log(socket.handshake.auth)
    } catch (error) {
      console.error(error);
    }
  });
  
  if (!socket.recovered) {
    
    try {
      console.log(`not recovered: ${socket.recovered}`)
      // const offset = socket.handshake.auth.serverOffset || 0;
      const chatId = socket.handshake.auth.chatId;
      const page = socket.handshake.auth.page
      const limit = socket.handshake.auth.limit
      console.log(socket.handshake.auth)

      const messages = await Message.findAll({
        where: {
          chatId
        },
        order: [['timestamp', 'ASC']],
        limit: parseInt(limit, 30),
        offset: (page -1) * limit
      })
      console.log(messages)

      // with socket.emit the specific socket that triggered the event its the one who get the info
      socket.emit("receiveMessage", messages)
    } catch (error) {
      console.log(error)
    }
      
}
});

module.exports = { server };
