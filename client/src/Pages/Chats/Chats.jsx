import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// web sockets


//components
import Searchbar from '../Home/components/Searchbar/Searchbar';
import ChatPreview from './ChatPreview/ChatPreview';

//styles 
import styles from './Chats.module.css'

//redux
import { useGetChatsByUserIdQuery } from '../../redux/apiSlices/chatsAPI';

const Chats = () => {

  const userId = useSelector((state)=> state.userReducer.user)
  console.log(userId?.id)


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