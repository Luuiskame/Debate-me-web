const express = require('express')
const socketIO = require('socket.io')
const {Server} = require('socket.io')
const http = require('http')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors= require('cors')
const routes = require('./routes/index.js');


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  "*"); // update to match the domain you will make the request from
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

const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin: "http://localhost:3000",
    methods: [ 'GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
  }
})

io.on("connection", (socket)=>{
  console.log(`user connected: ${socket.id}`)

  socket.on('sendMessage', (data)=>{
    console.log(data)
  })
})

module.exports = {server,io};