
import styles from './ChatMiddlePart.module.css'

const ChatMiddlePart = ({messageReceived, correctChatInfo, readMessages})=> {
     console.log(messageReceived)
     console.log(readMessages)
    
    return(
        <div className={styles.chatMiddlePartContainer}>

            {messageReceived.length > 0 
            ? messageReceived.map(message=> (
                <div className={styles.messageCardContainer}>
                    <figure className={styles.pfpContainer}>
                        <img src={message.senderPicture} alt="sender picture" />
                    </figure>

                    <div className={styles.nameAndMessageContentContainer}>
                        <p className={styles.name}>{message.senderName}</p>
                        <p className={styles.message}>{message.content} {readMessages.sent ? '.' : null} {readMessages.read ? '.' : null}</p>
                        {/* <p>{message.timestamp}</p> */}
                    </div>
                </div>
            )) : (<p>sent any message!</p>)
            }

        </div>
    )
}

export default ChatMiddlePart