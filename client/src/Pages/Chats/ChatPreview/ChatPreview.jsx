//styles
import { useSelector } from 'react-redux'
import styles from './ChatPreview.module.css'
import { useState } from 'react'

const ChatPreview = ({lastMessage})=>{

    return(
        <div className={styles.chatPreviewContainer}>
            {lastMessage}
        </div>
    )
}

export default ChatPreview