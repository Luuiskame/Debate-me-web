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
import { setChats } from '../../redux/slices/chatSlice';

const Chats = () => {
  const [usersChatedWith, setUsersChatedWith] = useState([])

  const userId = useSelector((state)=> state.userReducer.user?.id)
  const userChats = useSelector((state)=> state.chatsReducer.chats)
  console.log(userId)
  console.log(userChats)

  const dispatch = useDispatch()
  const { data: chats, isLoading, error } = useGetChatsByUserIdQuery(userId)
  console.log(chats)

  useEffect(()=>{
    dispatch(setChats(chats))
  },[chats, dispatch])

  useEffect(()=> {
    const arr = []
    userChats?.map(user=> {
      arr.push(user.receiver?.id)
    })
    setUsersChatedWith([...arr])
  },[userChats])



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
        usersChatedWithId={usersChatedWith}
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