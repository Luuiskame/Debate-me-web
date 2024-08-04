//react
import { useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

// styles 
import styles from './Chat.module.css'

//io 
import { socket } from '../../../socket'


// react icons
import { CiCirclePlus } from "react-icons/ci";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";

//components
import ChatMiddlePart from './chatComponents/ChatMiddlePart/ChatMiddlePart'

// redux actions
import { setNotReadMessages } from '../../../redux/slices/chatSlice'


const Chat = ()=>{

    //sending message state related
    const [activateRead, setActivateRead] = useState(null)
    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState([])

    const dispatch = useDispatch()

    // necessary properties for comparing and getting the user chats info 
    const personalUserId = useSelector((state)=> state.userReducer.user?.id)
    const personalUserName = useSelector((state)=> state.userReducer.user?.name)
    const personalUserPicture = useSelector((state)=> state.userReducer.user?.profilePicture)
    const personalUserUsername = useSelector((state)=> state.userReducer.user?.username)
   
    const {chatId} = useParams()
    socket.auth.chatId = chatId
    const chats = useSelector((state)=> state.chatsReducer.chats)
    console.log(chats)

    //searching in the global state the chat id that matches our chatId gave through params
    const correctChatInfo = chats.find(chat=> chatId === chat?.id)
    console.log(correctChatInfo)

    //once we got our correct chat, we also want to get the other user Id
    const correctParticipantInfo = correctChatInfo?.participantsIds?.find(participant=> participant !== personalUserId  )
    console.log(correctParticipantInfo)
    
    const sendMessage = ()=>{
      const messageAndInfo = {
        
          senderId: personalUserId,
          receiverId: correctParticipantInfo,
          senderPicture: personalUserPicture,
          senderName: personalUserName,
          senderUsername: personalUserUsername,
          content: message,
          chatId: chatId,
          offset: socket.auth?.serverOffset,
          deliveryStatus: true,
          readStatus: false,
          attachments: []

      }
      socket.emit("sendMessage", messageAndInfo)
      setMessage('')
    }
  
    const handleReceiveMessage = useCallback((data) => {
      socket.auth.serverOffset = data?.id;
      socket.auth.chatId = data.chatId;
  
      if (Array.isArray(data)) {
        console.log(data);
        // Update the state once with all accumulated messages
        setMessageReceived((prevMessages) => [...prevMessages, ...data]);
        setActivateRead(true);
        console.log('one');
      } else {
        // console.log(messageReceived)
        setMessageReceived((prevMessages) => [...prevMessages, data]);
        setActivateRead(true);
        console.log('one');
      }
    }, [socket]);
  
    const handleReceiveUpdatedReadStatus = useCallback((data) => {
      // Pop the last message so we can then put our new last message with the updated read status
      setMessageReceived((prevMessages) => {
        const arr = [...prevMessages];
        arr.pop();
        return [...arr, data];
      });
      console.log(data);
    }, []);
  
    useEffect(() => {
      socket.on("receiveMessage", handleReceiveMessage);
      
      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }, [handleReceiveMessage]);
  
    useEffect(() => {
      if (messageReceived.length > 0 && chatId && personalUserId && activateRead) {
        const arr = [...messageReceived];
        const lastMessage = arr.pop();
        console.log(lastMessage);
        if (lastMessage?.receiverId === personalUserId && lastMessage.readStatus === false) {
          console.log("activating lastread");
          socket.emit("updateReadStatus", chatId);
  
          // this part may cause a glitch in case we send the -1 and not receive the updated message by some error
          dispatch(setNotReadMessages(-1));
          console.log("activating unread msg");
        }
        
        socket.on("ReceiveUpdatedReadStatus", handleReceiveUpdatedReadStatus);
  
        return () => {
          socket.off("ReceiveUpdatedReadStatus", handleReceiveUpdatedReadStatus);
        };
      }
  
      setActivateRead(false);
    }, [messageReceived, chatId, personalUserId, activateRead, handleReceiveUpdatedReadStatus, dispatch, socket]);
  
    useEffect(() => {
      socket.connect();
      socket.emit("joinRoom", chatId);
  
      return () => {
        socket.disconnect();
      };
    }, [socket, chatId]);
  
    return (
      <div className={styles.chatMainContainer}>

        <div className={styles.userTopContainer}>
          
          <div className={styles.backArrowContainer}>
        <IoArrowBackOutline />
          </div>
          
          <div className={styles.mainTopOptionsContainer}>

          <div className={styles.topPictureContainer}>
            <img src={correctChatInfo.participantsInfo[0].profilePicture} alt="user pfp" />
          </div>
          <div className="onlineStatusContainer">
          🟢
          </div>
          <p>{correctChatInfo.participantsInfo[0]?.name}</p>

          </div>
          

          <div className={styles.callsContainer}>
          <IoIosCall />
          <CiVideoOn />
          </div>
    
        </div>
        <ChatMiddlePart
        activateRead={activateRead}
        chatId={chatId}
        personalUserId={personalUserId}
        messageReceived={messageReceived}
        correctChatInfo={correctChatInfo.participantsInfo[0]}
        />
      

      <div className={styles.mainChatInputOptionsContainer}>
      <CiCirclePlus className={styles.circlePlus} />
      <div className={styles.inputAndSendBtnContainer}>
      <input onChange={(e)=> setMessage(e.target.value)} type="text" name='text' value={message} placeholder='send message'/>
      <button onClick={sendMessage}>send</button>

      </div>
      
      </div>
      
      </div>
    )
}

export default Chat