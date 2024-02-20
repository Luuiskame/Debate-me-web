require("dotenv").config();
const pg = require("pg");
const { Sequelize } = require("sequelize");

//models
const userModel = require("./models/User");
const postModel = require("./models/Post");
const commentModel = require("./models/Comment");
const likeModel = require("./models/Like");
const followersModel = require("./models/Followers");

const { DB_USER, DB_PASSWORD, DB_HOST, POSTGRES_URL } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/speakit`, { logging: false, native: false });

//executing models

userModel(sequelize);
postModel(sequelize);
commentModel(sequelize);
likeModel(sequelize);
followersModel(sequelize);

// models and relations
const { User, Post, Comment, Like, Followers } = sequelize.models;

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

module.exports = {
  User,
  Post,
  Comment,
  Like,
  Followers,
  conn: sequelize,
};
