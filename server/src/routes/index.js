const { Router } = require("express");
const createUser = require("../controllers/CreateUser");
const createPost = require("../controllers/CreatePost");
const Login = require("../controllers/Login");
const sendMessage = require('../controllers/SendMessage');
const getMessages = require("../controllers/GetMessage");
const getUserChats = require("../controllers/getChats");
const startChat = require("../controllers/StartChat");

const router = Router();

//get related to users
router.post("/login", Login);

//post related to users
router.post("/createuser", createUser);

//other post
router.post("/home/createpost", createPost);

//messages routes
router.post('/chats/send', sendMessage)
router.post('/chats/startchat', startChat)

router.get('/chats/get/:senderId/:receiverId', getMessages)
router.get('/chats/get/:userId', getUserChats)


module.exports = router;
