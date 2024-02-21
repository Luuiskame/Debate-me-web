const { Router } = require("express");
const createUser = require("../controllers/CreateUser");
const createPost = require("../controllers/CreatePost");
const Login = require("../controllers/Login");
const sendMessage = require("../controllers/SendMessage");
const getMessages = require("../controllers/GetMessage");
const isExisting = require("../controllers/isExisting");
const router = Router();

//get related to users

//post related to users
router.post("/login", Login);
router.post("/createuser", createUser);
router.post("/isExisting", isExisting);

//other post
router.post("/home/createpost", createPost);

//messages routes
router.post("/send", sendMessage);

router.get("/get/:senderId/:receiverId", getMessages);

module.exports = router;
