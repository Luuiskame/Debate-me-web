const {User, Chat} = require('../db')
const { Op } = require('sequelize');

const startChat = async(req,res)=>{
    try {
        const {userId, participantId} = req.body
        const bothUserExist = await User.findAll({
            where:{
                id: [userId, participantId]
            }
        })

        if(bothUserExist.length !== 2) return res.status(400).send("a user doesn't exist")

        const chatAlreadyExist = await Chat.findOne({
            where: {
                participants: {
                    [Op.contains]: [userId, participantId]
                }
            }
        });

        if (chatAlreadyExist) {
            return res.status(200).json(chatAlreadyExist);
        }

        const newChat = await Chat.create({
            participants: [userId, participantId]
        })

        await newChat.addUsers([userId, participantId])

        res.status(201).json(newChat)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = startChat