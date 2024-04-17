//styles
import { useSelector } from 'react-redux'
import styles from './ChatPreview.module.css'
import { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'

import Skeleton from 'react-loading-skeleton'

//sockets
import { socket } from '../../../socket'

const ChatPreview = ({lastMessageProp, chatId, userPic, username, name, participantsId})=>{

    const [lastMessage, setLastMessage] = useState("")

    useEffect(()=> {
        socket.on("receiveMessage", (data)=>{
                if(data.chatId === chatId){
                    setLastMessage(data.content)
                }
          })

    },[chatId])

    useEffect(() => {
        socket.connect();
        socket.emit("joinRoom", chatId);

        return () => {
            socket.disconnect();
        }
    }, [chatId]);

    return(
        
        <Link to={`/chat/${chatId}`} className={styles.chatPreviewContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={userPic} alt={`${name}'s profile picture`} />
            </div>
            <div className={styles.nameAndMessageContainer}>
            <p className={styles.maxTextAndNameContentLimit}>{name || <Skeleton/>} </p>
            <p className={styles.maxTextAndNameContentLimit}>{lastMessage ? lastMessage : lastMessageProp}</p>
            </div>
        </Link>
    )
}

export default ChatPreview