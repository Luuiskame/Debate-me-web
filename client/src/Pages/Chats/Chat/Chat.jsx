//react
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'

//io 
import io from 'socket.io-client'
const URL = "http://localhost:3001/"
const socket = io.connect(URL)

const Chat = ()=>{
    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState([])

    const personalUserId = useSelector((state)=> state.userReducer.user?.id)
    console.log(personalUserId)
  
    const handleChange = (e)=>{
      setMessage(e.target.value)
    }
    
    const sendMessage = ()=>{
      socket.emit("sendMessage",{
        message
      })
      setMessage('')
    }
  
    useEffect(()=>{
      socket.on("receiveMessage", (data)=>{
        console.log(data.message)
        setMessageReceived(prevMessage => [...prevMessage, data.message])
      })
    },[socket])
  
    return (
      <>
      <input onChange={handleChange} type="text" name='text' value={message} placeholder='send message'/>
      <button onClick={sendMessage}>send</button>
      {messageReceived.length > 0 ? messageReceived.map((message, index)=>(
        <p key={index}>{message}</p>
      )): (
        <p>This is the beggening of your legendary conversation with </p>
      )}
      </>
    )
}

export default Chat