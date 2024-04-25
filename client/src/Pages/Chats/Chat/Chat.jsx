//react
import { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

// styles 
import styles from './Chat.module.css'

//io 
import { socket } from '../../../socket'


// react icons
import { CiCirclePlus } from "react-icons/ci";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";

//components
import ChatMiddlePart from './chatComponents/ChatMiddlePart/ChatMiddlePart'


const Chat = ()=>{

    //sending message state related
    const [activateRead, setActivateRead] = useState(null)
    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState([])

    // necessary properties for comparing and getting the user chats info 
    const personalUserId = useSelector((state)=> state.userReducer.user?.id)
    const personalUserName = useSelector((state)=> state.userReducer.user?.name)
    const personalUserPicture = useSelector((state)=> state.userReducer.user?.profilePicture)
    const personalUserUsername = useSelector((state)=> state.userReducer.user?.username)
   
    const {chatId} = useParams()
    socket.auth.chatId = chatId
    const chats = useSelector((state)=> state.chatsReducer.chats)
    console.log(chats)

    //searching in the global state the chat id that matches our chatId gave through params
    const correctChatInfo = chats.find(chat=> chatId === chat.id)
    console.log(correctChatInfo)

    //once we got our correct chat, we also want to get the other user Id
    const correctParticipantInfo = correctChatInfo.participantsIds.find(participant=> participant !== personalUserId  )
    console.log(correctParticipantInfo)
    
    const sendMessage = ()=>{
      const messageAndInfo = {
        
          senderId: personalUserId,
          receiverId: correctParticipantInfo,
          senderPicture: personalUserPicture,
          senderName: personalUserName,
          senderUsername: personalUserUsername,
          content: message,
          chatId: chatId,
          offset: socket.auth?.serverOffset,
          deliveryStatus: true,
          readStatus: false,
          attachments: []

      }
      socket.emit("sendMessage", messageAndInfo)
      setMessage('')
    }
  
    useEffect(()=>{
      socket.on("receiveMessage", (data)=>{
        socket.auth.serverOffset = data?.id
        socket.auth.chatId = data.chatId
        
        if(Array.isArray(data)){
          console.log(data)
            // Update the state once with all accumulated messages
            setMessageReceived([...messageReceived, ...data])
            setActivateRead(true)
            console.log('one')
        } else {
          // console.log(messageReceived)
          setMessageReceived([...messageReceived, data])
          setActivateRead(true)
          console.log('one')
        }

      })

    },[socket, messageReceived])
    

    useEffect(()=> {
      console.info('hihihiha')
      if (messageReceived.length > 0 && chatId && personalUserId && activateRead === true) {
        const arr = [...messageReceived]
        const lastMesage = arr.pop();
        console.log(lastMesage);
        if (
          lastMesage?.receiverId === personalUserId &&
          lastMesage.readStatus === false
        ) {
          console.log("activating lastread");
          socket.emit("updateReadStatus", chatId);
        }
      }
      
      if(activateRead){
        socket.on("ReceiveUpdatedReadStatus", data=> {
          //! we pop the last message so we can then put our new last message with the updated read status
          messageReceived.pop()
          setMessageReceived([...messageReceived, data])
          console.log(data)
        })
      }
      setActivateRead(false)
      
    },[socket,activateRead])

    

    useEffect(()=>{
      socket.connect()
      socket.emit("joinRoom", chatId)


      return ()=>{
        socket.disconnect()
      }
    },[])
  
    return (
      <div className={styles.chatMainContainer}>

        <div className={styles.userTopContainer}>
          
          <div className={styles.backArrowContainer}>
        <IoArrowBackOutline />
          </div>
          
          <div className={styles.mainTopOptionsContainer}>

          <div className={styles.topPictureContainer}>
            <img src={correctChatInfo.participantsInfo[0].profilePicture} alt="user pfp" />
          </div>
          <div className="onlineStatusContainer">
          🟢
          </div>
          <p>{correctChatInfo.participantsInfo[0]?.name}</p>

          </div>
          

          <div className={styles.callsContainer}>
          <IoIosCall />
          <CiVideoOn />
          </div>
    
        </div>
        <ChatMiddlePart
        activateRead={activateRead}
        chatId={chatId}
        personalUserId={personalUserId}
        messageReceived={messageReceived}
        correctChatInfo={correctChatInfo.participantsInfo[0]}
        />
      

      <div className={styles.mainChatInputOptionsContainer}>
      <CiCirclePlus className={styles.circlePlus} />
      <div className={styles.inputAndSendBtnContainer}>
      <input onChange={(e)=> setMessage(e.target.value)} type="text" name='text' value={message} placeholder='send message'/>
      <button onClick={sendMessage}>send</button>

      </div>
      
      </div>
      
      </div>
    )
}

export default Chat