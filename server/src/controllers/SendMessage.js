const {Message, User} = require('../db')
// const {io} = require('../app')

const sendMessage = async (req,res)=>{
    try {
        const {senderId, receiverId, content, chatId} = req.body
        
        //checking if both the sender and receiver exist
        const sender = await User.findByPk(senderId)
        const receiver = await User.findByPk(receiverId)

        if(!receiver || !sender) return res.status(404).send("Sender or reciever not found")

        const newMessage = await Message.create({
            content,
            senderId,
            receiverId,
            chatId
        })

        // console.log(io)
        return res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = sendMessage