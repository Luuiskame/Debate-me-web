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

    // console.log(messages)
    return messages
}

const sendMessages = async (data) => {
    const { senderId, receiverId, senderPicture, senderName, senderUsername, content, chatId, offset, deliveryStatus, readStatus, attachments } = data;

    try {
        const newMessage = await Message.create({
            senderId,
            receiverId,
            senderPicture,
            senderName,
            senderUsername,
            content,
            chatId,
            deliveryStatus,
            readStatus,
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
            deliveryStatus,
            readStatus,
            id: newMessage.id
          };

          return messageInfo
        
    } catch (error) {
        console.log(error)
    }

}

const updateReadStatus = async (chatId)=> {
    try {
        const updatedRows = await Message.update(
            {readStatus: true},
            {where: {chatId}}
        )

        console.log(updatedRows)
        
        const lastUpdatedMessage = await Message.findOne({
            where: {chatId},
            order: [['timestamp', 'DESC']]
        })

        if(!lastUpdatedMessage) console.log("error finding the last message")

        return lastUpdatedMessage
    } catch (error) {
        console.error('Error updating read status:', error);
        throw new Error('Failed to update read status');
    }
}

module.exports = { getMessages, sendMessages, updateReadStatus }