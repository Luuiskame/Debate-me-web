import styles from './SendMessageButton.module.css'

const SendMessageButton = ({receiverId, senderId})=>{
    console.log(`receiverId ${receiverId}, senderId: ${senderId}`)

    const createChat = ()=> {
        
    }
    
    return(
        <button className={styles.button} onClick={createChat}>
            Send Message
        </button>
    )
}


export default SendMessageButton