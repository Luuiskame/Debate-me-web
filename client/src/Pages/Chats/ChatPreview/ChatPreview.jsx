//styles
import { useSelector } from 'react-redux'
import styles from './ChatPreview.module.css'
import { useEffect, useState } from 'react'



const ChatPreview = ({lastMessage, usersChatedWith})=>{
    console.log(usersChatedWith)

    return(
        <div className={styles.chatPreviewContainer}>
            {lastMessage}
        </div>
    )
}

export default ChatPreview