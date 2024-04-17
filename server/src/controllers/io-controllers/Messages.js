const {Message, User} = require('../../db')

const getMessages = async (chatId, page, limit)=>{
    
    const messages = await Message.findAll({
        where: {
            chatId
        },
        order: [['timestamp', 'ASC']],
        limit: parseInt(limit, 30),
        offset: (page -1) * limit
    })

    if(!messages) throw new Error('something went wrong went getting the messages')

    console.log(messages)
    return messages
}

const sendMessages = async (data) => {
    const { senderId, receiverId, senderPicture, senderName, senderUsername, content, chatId, offset } = data;

    try {
        const newMessage = await Message.create({
            senderId,
            receiverId,
            senderPicture,
            senderName,
            senderUsername,
            content,
            chatId,
          });

          if(!newMessage) console.log(`something went wrong when creating the message`)

          const messageInfo = {
            senderId,
            receiverId,
            senderPicture,
            senderName,
            senderUsername,
            content,
            chatId,
            id: newMessage.id
          };

          return messageInfo
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = { getMessages, sendMessages }