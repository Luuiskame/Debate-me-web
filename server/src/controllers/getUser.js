const {User} = require('../db')

const getUser = async (req,res)=>{
    try {
        const {userId} = req.params

        const user = await User.findByPk(userId)

        if(!user) return res.status(400).send("user not found")

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}   

module.exports = getUser