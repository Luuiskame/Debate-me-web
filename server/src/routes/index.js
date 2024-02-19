const {Router} = require('express')
const PostUser = require('../controllers/PostUser')

const router = Router()

//get

//post related to users 
router.post('/createuser',PostUser)



module.exports = router