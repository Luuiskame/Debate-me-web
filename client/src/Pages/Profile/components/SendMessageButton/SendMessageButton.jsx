import styles from './SendMessageButton.module.css'
import { useNavigate } from 'react-router-dom'

// redux
import { useStartOrReturnChatMutation } from '../../../../redux/apiSlices/chatsAPI'
import { addNewchat } from '../../../../redux/slices/chatSlice'
import { useDispatch } from 'react-redux'

const SendMessageButton = ({foreignId, senderId})=>{
    console.log(`receiverId ${foreignId}, senderId: ${senderId}`)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [startOrReturnChat] = useStartOrReturnChatMutation()

    const createChat = async ()=> {
        try {
            const response = await startOrReturnChat({
                userId: senderId,
                participantId: foreignId,
            }).unwrap()

            if(response.id){
                console.log(response.id)
                if(response.created === true){
                    dispatch(addNewchat(response))
                    navigate(`/chat/${response.id}`)
                } else if(response.created === false){
                    navigate(`/chat/${response.id}`)
                }
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