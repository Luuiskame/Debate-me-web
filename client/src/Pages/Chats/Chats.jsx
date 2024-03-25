import React, { useEffect } from 'react';

// web sockets
import io from 'socket.io-client'
const socket = io('http://localhost:3001/speakit')


//components
import Searchbar from '../Home/components/Searchbar/Searchbar';

//styles 
import styles from './Chats.module.css'

const Chat = () => {
  socket.on('connect',()=> {
    console.log('conected to the server')
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  socket.emit('sendMessage', {message: "HEllo server"})

  return (
    <div className={styles.chatMainContainer}>
      
      <div className={styles.searchBox}>
      <Searchbar/>
      </div>

      <div className={styles.friendsContainer}>
        Friends 
      </div>
    
    </div>
  );
};

export default Chat