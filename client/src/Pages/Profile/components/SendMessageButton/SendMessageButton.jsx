import styles from './SendMessageButton.module.css'
import { useNavigate } from 'react-router-dom'
import { useStartOrReturnChatMutation } from '../../../../redux/apiSlices/chatsAPI'

const SendMessageButton = ({foreignId, senderId})=>{
    console.log(`receiverId ${foreignId}, senderId: ${senderId}`)
    const navigate = useNavigate()
    const [startOrReturnChat] = useStartOrReturnChatMutation()

    const createChat = async ()=> {
        try {
            const response = await startOrReturnChat({
                userId: senderId,
                participantId: foreignId,
            }).unwrap()

            if(response.id){
                console.log(response.id)
                navigate(`/chat/:${response.id}`)
            }


        } catch (error) {
            console.log("error at sendMessage component: ", error)
        }
    }
    
    return(
        <button className={styles.button} onClick={createChat}>
            Send Message
        </button>
    )
}


export default SendMessageButton