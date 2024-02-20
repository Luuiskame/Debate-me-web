const {Message} = require('../db')

const getMessages = async (req,res)=>{
    try {
        const {senderId, receiverId} = req.params

        const messages = await Message.findAll({
            where:{
                senderId,
                receiverId
            },
            order: [['timestamp', 'ASC']],
        })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getMessages