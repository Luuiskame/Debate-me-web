require("dotenv").config();
const pg = require("pg");
const { Sequelize } = require("sequelize");

//models
const userModel = require("./models/User");
const postModel = require("./models/Post");
const commentModel = require("./models/Comment");
const likeModel = require("./models/Like");
const followersModel = require("./models/Followers");
const MessageModel = require('./models/Message')
const ChatModel = require('./models/Chat')

const { DB_USER, DB_PASSWORD, DB_HOST, POSTGRES_URL } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/speakit`, { logging: false, native: false });

//executing models

userModel(sequelize);
postModel(sequelize);
commentModel(sequelize);
likeModel(sequelize);
followersModel(sequelize);
MessageModel(sequelize)
ChatModel(sequelize)

// models and relations
const { User, Post, Comment, Like, Followers, Message, Chat } = sequelize.models;

// relations between users and their posts
User.hasMany(Post)
Post.belongsTo(User)

// relation between posts and their comments
Post.hasMany(Comment)
Comment.belongsTo(Post)

//relations between Posts and Likes
Post.hasMany(Like)
Like.belongsTo(Post)

//Relations between Users and Followers
User.belongsToMany(User, {as: 'Followers', through: 'userFollowers',foreignKey:'userId'})
User.belongsToMany(User, {as: 'Following', through: 'userFollowing', foreignKey: 'followerId'})

// relations between users and their messages
User.hasMany(Message, {foreignKey: 'senderId'})
User.hasMany(Message, {foreignKey: 'receiverId'})

// relations between chats and users
User.belongsToMany(Chat, {through: 'UserChat', foreignKey: 'userId'})
Chat.belongsToMany(User, {through: 'userChat', foreignKey: 'chatId'})

//relations between messages and chats
Chat.hasMany(Message)
Message.belongsTo(Chat)

module.exports = {
  User,
  Post,
  Comment,
  Like,
  Followers,
  Message,
  Chat,
  conn: sequelize,
};
