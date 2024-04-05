//styles
import { useSelector } from 'react-redux'
import styles from './ChatPreview.module.css'
import { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'


const ChatPreview = ({lastMessage, usersChatedWithId, chatId, userPic, username, name})=>{
    console.log(usersChatedWithId)

    return(
        
        <Link to={`/chat/${chatId}`} className={styles.chatPreviewContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={userPic} alt={`${name}'s profile picture`} />
            </div>
            <div className={styles.nameAndMessageContainer}>
            <p className={styles.maxTextAndNameContentLimit}>{name}</p>
            <p className={styles.maxTextAndNameContentLimit}>{lastMessage}</p>
            </div>
        </Link>
    )
}

export default ChatPreview