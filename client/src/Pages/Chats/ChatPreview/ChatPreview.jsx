//styles
import { useSelector } from 'react-redux'
import styles from './ChatPreview.module.css'
import { useEffect, useState } from 'react'


const ChatPreview = ({lastMessage, usersChatedWithId, userPic, username, name})=>{
    console.log(usersChatedWithId)

    return(
        <div className={styles.chatPreviewContainer}>
            <div className={styles.profilePictureContainer}>
                <img src={userPic} alt={`${name}'s profile picture`} />
            </div>

            <div className={styles.nameAndMessageContainer}>
            <p className={styles.maxTextAndNameContentLimit}>{name}</p>
            <p className={styles.maxTextAndNameContentLimit}>{lastMessage}</p>
            </div>
        </div>
    )
}

export default ChatPreview