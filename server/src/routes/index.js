const { Router } = require("express");
const createUser = require("../controllers/CreateUser");
const createPost = require("../controllers/CreatePost");
const Login = require("../controllers/Login");
const sendMessage = require("../controllers/SendMessage");
const getMessages = require("../controllers/GetMessage");
const getUserChats = require("../controllers/getChats");
const startChat = require("../controllers/StartChat");
const getUser = require("../controllers/getUser")
const getUserByUsername = require("../controllers/getUserByUsername")
const verifyIfUserIsFollowing = require("../controllers/verifyIfUserIsFollowing")
const unfollowUser = require('../controllers/unfollowUser')

const isExisting = require("../controllers/isExisting");
const router = Router();

//get related to users
router.get("/getuser/:userId", getUser)
//! we are using the getuser route since putting another / wold make the petition to the previously one
//the query goes like this: http://localhost:3001/speakit/getuser?username=user1
router.get("/getuser", getUserByUsername)


//post related to users
router.post("/login", Login);
router.post("/createuser", createUser);
router.post("/isExisting", isExisting);

//other post
router.post("/home/createpost", createPost);

//messages routes
router.post("/chats/send", sendMessage);
router.post("/chats/startchat", startChat);

router.get("/chats/messages/get/:chatId", getMessages);
router.get("/chats/get/:userId", getUserChats);

router.post("/send", sendMessage);

router.get("/get/:senderId/:receiverId", getMessages);


// verify if user is a follwer
router.post("/checkFollowStatus", verifyIfUserIsFollowing)
router.post("/unfollowUser", unfollowUser)

module.exports = router;
