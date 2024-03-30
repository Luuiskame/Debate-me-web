import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// web sockets


//components
import Searchbar from '../Home/components/Searchbar/Searchbar';
import ChatPreview from './ChatPreview/ChatPreview';

//styles 
import styles from './Chats.module.css'

//redux
import { useGetChatsByUserIdQuery } from '../../redux/apiSlices/chatsAPI';
import { setChats } from '../../redux/slices/chatSlice';

const Chats = () => {

  const userId = useSelector((state)=> state.userReducer.user?.id)
  const userChats = useSelector((state)=> state.chatsReducer.chats)
  console.log(userId)
  console.log(userChats)

  const dispatch = useDispatch()
  const { data: chats, isLoading, error } = useGetChatsByUserIdQuery(userId);
  console.log(chats)

  useEffect(()=>{
    dispatch(setChats(chats))
  },[chats])

  return (
    <div className={styles.chatMainContainer}>
      
      <div className={styles.searchBox}>
      {/* <Searchbar/> */}
      </div>

      <div className={styles.friendsContainer}>
        Friends 
      </div>

      <ChatPreview/>
    
    </div>
  );
};

export default Chats