import React, { useEffect } from 'react';

// web sockets


//components
import Searchbar from '../Home/components/Searchbar/Searchbar';
import ChatPreview from './ChatPreview/ChatPreview';

//styles 
import styles from './Chats.module.css'

const Chat = () => {


  return (
    <div className={styles.chatMainContainer}>
      
      <div className={styles.searchBox}>
      <Searchbar/>
      </div>

      <div className={styles.friendsContainer}>
        Friends 
      </div>

      <ChatPreview/>
    
    </div>
  );
};

export default Chat