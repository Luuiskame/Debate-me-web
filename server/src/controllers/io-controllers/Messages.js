// import { io } from "../../app";


// const {Message, User} = require('../../db')

  
//   io.on("connection", (socket)=>{
//     console.log(`user connected: ${socket.id}`)

//     socket.on('disconnect', () => {
//         console.log(`user disconnected: ${socket.id}`);
//       });  
  
//     socket.on('sendMessage', async (data)=>{
//       try {

//         const {senderId, receiverId, senderPicture, senderName, senderUsername, content, chatId} = data

//         const newMessage = await Message.create({
//             content,
//             senderId,
//             receiverId,
//             chatId,
//             senderName,
//             senderPicture,
//             senderUsername
//         })

//         io.emit("receiveMessage", newMessage)
        
//       } catch (error) {
//         console.error(error)
//       }
//     })
  
  
//   })