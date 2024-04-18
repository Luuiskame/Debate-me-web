import { useSelector } from 'react-redux';
import styles from './ChatPreview.module.css';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';

//sockets
import { socket } from '../../../socket';

const ChatPreview = ({ lastMessageProp, chatId, userPic, username, name, participantsId }) => {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    // Read last message from local storage
    const savedLastMessage = localStorage.getItem(`lastMessage_${chatId}`);
    if (savedLastMessage) {
      setLastMessage(savedLastMessage);
    }

    // Listener for new messages
    const receiveMessageListener = (data) => {
      if (data.chatId === chatId) {
        setLastMessage(data.content);

        // Save last message to local storage
        localStorage.setItem(`lastMessage_${chatId}`, data.content);
      }
    };

    socket.on("receiveMessage", receiveMessageListener);

  }, [chatId]);

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", chatId);

    // at this case, we want to mantain the connection to the socket, so we can receive the messages =>
    //even tho the component is unmount

    // return () => {
    //   socket.disconnect();
    // };
  }, [chatId]);

  return (
    <Link to={`/chat/${chatId}`} className={styles.chatPreviewContainer}>
      <div className={styles.profilePictureContainer}>
        <img src={userPic} alt={`${name}'s profile picture`} />
      </div>
      <div className={styles.nameAndMessageContainer}>
        <p className={`${styles.maxTextAndNameContentLimit} ${styles.name}`}>{name || <Skeleton />} </p>
        <p className={styles.maxTextAndNameContentLimit}>{lastMessage ? `${lastMessage} ...`: lastMessageProp + ' ...'}</p>
      </div>
    </Link>
  );
};

export default ChatPreview;
