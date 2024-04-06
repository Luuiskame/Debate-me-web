import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// web sockets


//components
import Searchbar from '../Home/components/Searchbar/Searchbar';
import ChatPreview from './ChatPreview/ChatPreview';

//styles 
import styles from './Chats.module.css'

//redux
import { useGetChatsByUserIdQuery } from '../../redux/apiSlices/chatsAPI';
import { setChats, setUsersBasicInfo } from '../../redux/slices/chatSlice';

const Chats = () => {
  //we gonna keep track of the users 

  const currentUserId = useSelector((state)=> state.userReducer.user?.id)
  const userChats = useSelector((state)=> state.chatsReducer.chats)
  console.log(`current user id: ${currentUserId}`)
  console.log(userChats)

  const dispatch = useDispatch()
  const { data: chats, isLoading, error } = useGetChatsByUserIdQuery(currentUserId)
  console.log(chats)

  useEffect(()=>{
    dispatch(setChats(chats))
    
    const arr = []

    chats?.map((chat)=>{
      arr.push(chat.receiver)
    })
    dispatch(setUsersBasicInfo(arr))
  },[chats, dispatch])



  return (
    <div className={styles.chatMainContainer}>
      
      <div className={styles.searchBox}>
      {/* <Searchbar/> */}
      </div>

      <div className={styles.friendsContainer}>
        Friends 
      </div>

      {chats?.map((chat)=> (
        <ChatPreview
        key={chat.id}
        chatId={chat.id}
        lastMessage={chat.lastMessage.content}
        userPic={chat.receiver.profilePicture}
        username={chat.receiver.username}
        name={chat.receiver.name}
        >

        </ChatPreview>
      ))}    
    </div>
  );
};

export default Chats