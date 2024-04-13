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


const Chat = ()=>{

    //sending message state related
    const [message, setMessage] = useState('')
    const [sentMessages, setSentMessages] = useState([])
    const [messageReceived, setMessageReceived] = useState([])

    // necessary properties for comparing and getting the user chats info 
    const personalUserId = useSelector((state)=> state.userReducer.user?.id)
    const personalUserName = useSelector((state)=> state.userReducer.user?.name)
    const personalUserPicture = useSelector((state)=> state.userReducer.user?.profilePicture)
    const personalUserUsername = useSelector((state)=> state.userReducer.user?.username)
   
    const {chatId} = useParams()
    const chats = useSelector((state)=> state.chatsReducer.chats)
    console.log(chats)

    //searching in the global state the chat id that matches our chatId gave through params
    const correctChatInfo = chats.find(chat=> chatId === chat.id)
    console.log(correctChatInfo)

    //once we got our correct chat, we also want to get the other user Id
    const correctParticipantInfo = correctChatInfo.participantsIds.find(participant=> participant !== personalUserId  )
    console.log(correctParticipantInfo)
    
    const sendMessage = ()=>{
      socket.emit("sendMessage",{
        senderId: personalUserId,
        receiverId: correctParticipantInfo,
        senderPicture: personalUserPicture,
        senderName: personalUserName,
        senderUsername: personalUserName,
        content: message,
        chatId: chatId
      })
      setMessage('')
    }
  
    useEffect(()=>{
      socket.on("receiveMessage", (data)=>{
        console.log(data)
        setMessageReceived([...messageReceived, data.content])
      })
    },[messageReceived])

    useEffect(()=>{
      socket.connect()

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
      
      {messageReceived.length > 0 ? messageReceived.map((message, index)=>(
        <p key={index}>{message}</p>
      
      )): (
        <p>This is the beggening of your legendary conversation with {correctChatInfo.participantsInfo[0].name}</p>
      )}

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