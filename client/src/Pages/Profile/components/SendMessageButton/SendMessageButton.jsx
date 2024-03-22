
const SendMessageButton = ({receiverId, senderId})=>{
    console.log(`receiverId ${receiverId}, senderId: ${senderId}`)

    const createChat = ()=> {
        
    }
    
    return(
        <button onClick={createChat}>
            Send Message
        </button>
    )
}


export default SendMessageButton