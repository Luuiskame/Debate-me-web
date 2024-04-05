//styles
import { useSelector } from 'react-redux'
import styles from './ChatPreview.module.css'
import { useEffect, useState } from 'react'


const ChatPreview = ({lastMessage, usersChatedWithId})=>{
    console.log(usersChatedWithId)

    return(
        <div className={styles.chatPreviewContainer}>
            {lastMessage}
        </div>
    )
}

export default ChatPreview