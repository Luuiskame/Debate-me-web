import styles from './SendMessageButton.module.css'

const SendMessageButton = ({foreignId, senderId})=>{
    console.log(`receiverId ${foreignId}, senderId: ${senderId}`)

    const createChat = ()=> {
        
    }
    
    return(
        <button className={styles.button} onClick={createChat}>
            Send Message
        </button>
    )
}


export default SendMessageButton