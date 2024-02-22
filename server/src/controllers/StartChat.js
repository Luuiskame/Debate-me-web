const {User, Chat} = require('../db')

const startChat = async(req,res)=>{
    try {
        const {userId, participantId} = req.body
        const bothUserExist = await User.findAll({
            where:{
                id: [userId, participantId]
            }
        })

        if(bothUserExist.length !== 2) return res.status(400).send("a user doesn't exist")

        const newChat = await Chat.create()

        await newChat.addUsers([userId, participantId])

        res.status(201).json(newChat)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = startChat