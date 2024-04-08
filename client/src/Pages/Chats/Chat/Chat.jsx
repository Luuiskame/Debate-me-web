//react
import { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

// styles 
import styles from './Chat.module.css'

//io 
import { socket } from '../../../socket'

const Chat = ()=>{

    //sending message state related
    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState([])

    // necessary properties for comparing and getting the user chats info 
    const personalUserId = useSelector((state)=> state.userReducer.user?.id)
    const {chatId} = useParams()
    const chats = useSelector((state)=> state.chatsReducer.chats)
    console.log(chats)

    //searching in the global state the chat id that matches our chatId gave through params
    const correctChatInfo = chats.find(chat=> chatId === chat.id)
    console.log(correctChatInfo)
    
    const sendMessage = ()=>{
      socket.emit("sendMessage",{
        message
      })
      setMessage('')
    }
  
    useEffect(()=>{
      socket.on("receiveMessage", (data)=>{
        console.log(data.message)
        setMessageReceived([...messageReceived, data.message])
      })
    },[messageReceived])
  
    return (
      <div className={styles.chatMainContainer}>
      <input onChange={(e)=> setMessage(e.target.value)} type="text" name='text' value={message} placeholder='send message'/>
      <button onClick={sendMessage}>send</button>
      {messageReceived.length > 0 ? messageReceived.map((message, index)=>(
        <p key={index}>{message}</p>
      )): (
        <p>This is the beggening of your legendary conversation with {correctChatInfo.renderChatInfo.name}</p>
      )}
      </div>
    )
}

export default Chat