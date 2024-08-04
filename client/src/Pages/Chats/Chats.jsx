import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// web sockets


//components
import Searchbar from '../Home/components/navbar/components/Searchbar/Searchbar';
import ChatPreview from './ChatPreview/ChatPreview';

//styles 
import styles from './Chats.module.css'

//redux
import { useGetChatsByUserIdMutation } from '../../redux/apiSlices/chatsAPI';
import { setChats, setUsersBasicInfo } from '../../redux/slices/chatSlice';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Chats = () => {
  const [participantsId, setParticipantsId] = useState([])
  
  //we gonna keep track of the users 
  const currentUserId = useSelector((state)=> state.userReducer.user?.id)
  const userChats = useSelector((state)=> state.chatsReducer.chats)
  const chats = useSelector(state=> state.chatsReducer?.chats)
  console.log(`current user id: ${currentUserId}`)
  console.log(userChats)

  const dispatch = useDispatch()
  const [getChats] = useGetChatsByUserIdMutation()

  const getChatsFn = async () => {
    try {
      const response = await getChats({ userId: currentUserId }); // Ensure userId is passed correctly
      if (response.data) { // Access response.data to get the actual response data
        dispatch(setChats(response.data)); // Dispatch the response data
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (currentUserId) {
      getChatsFn();
    }
  }, [currentUserId]); 

  return (
    <div className={styles.chatMainContainer}>
      
      <div className={styles.searchBox}>
      {/* <Searchbar/> */}
      </div>

      <div className={styles.friendsContainer}>
        Friends 
      </div>

      {chats?.length > 0 ? (
    chats.map(chat => 
      chat.lastMessage?.content !== undefined && (
        <ChatPreview
          key={chat.id}
          chatId={chat.id}
          lastMessageProp={chat.lastMessage?.content}
          userPic={chat.participantsInfo[0]?.profilePicture}
          username={chat.participantsInfo[0]?.username}
          name={chat.participantsInfo[0]?.name}
          participantsId={participantsId}
        />
      )
    )
    // at this part we'll put a div with a class to so vip can access chats that were never started
  ) :  (
  <p>No chats yet</p>
  )}
      {/* ste the height as 10dvh like the cards => containerClassname is the class that wraps all skeletons*/}
      {/* { isLoading ? <Skeleton containerClassName={styles.skeletonContainer} height='10dvh' width='100%' count={3}/>: null}
      {error ? <p className={styles.loadingText}>{error}</p> : null} */}
    </div>
  );
};

export default Chats