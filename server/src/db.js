require('dotenv').config()
const pg = require('pg')
const {Sequelize} = require('sequelize')

//models
const userModel = require('./models/User')
// const postModel = require('./models/Post')
// const commentModel = require('./models/Comment')
// const likeModel = require('./models/Like')
// const followersModel = require('./models/Followers')

const {
    DB_USER, DB_PASSWORD, DB_HOST, POSTGRES_URL,
} = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/speakit`,
    {logging: false, native:false}
)

//executing models
userModel(sequelize)

// models and relations

const {User} = sequelize.models


module.exports = {
    User,
    conn: sequelize
}