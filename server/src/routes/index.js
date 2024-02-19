const {Router} = require('express')
const postUser = require('../controllers/PostUser')
const createPost = require('../controllers/CreatePost')

const router = Router()



//get related to users

//post related to users 
router.post('/createuser',postUser)

//other post
router.post('/home/createpost', createPost)

module.exports = router