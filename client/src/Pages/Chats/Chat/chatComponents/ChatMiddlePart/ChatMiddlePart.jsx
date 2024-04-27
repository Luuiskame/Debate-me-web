import { useState, useEffect, useRef } from "react";
import styles from "./ChatMiddlePart.module.css";

import { socket } from "../../../../../socket";

import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";

const ChatMiddlePart = ({
  messageReceived,
  correctChatInfo,
  chatId,
  personalUserId,
  activateRead,
}) => {
  const [doubleCheck, setDoubleCheck] = useState(null);
  const messagesEndRef = useRef(null);
  console.log(activateRead)
  console.log(messageReceived);

  

  // useEffect(()=> {
  //   messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  // },[])

  return (
    <div className={styles.chatMiddlePartContainer}>
      {messageReceived.length > 0 ? (
        messageReceived.map((message) => (
          <div key={message.id} className={styles.messageCardContainer}>
            <figure className={styles.pfpContainer}>
              <img src={message.senderPicture} alt="sender picture" />
            </figure>

            <div className={styles.nameAndMessageContentContainer}>
              <p className={styles.name}>{message.senderName}</p>
              <p ref={messagesEndRef} className={styles.message}>
                {message.content}{" "}
                {message.deliveryStatus ? <IoMdCheckmark className={`${message.readStatus ? `${styles.read}` : null}`}/> : null}{" "}
              </p>
              {/* <p>{message.timestamp}</p> */}
            </div>
          </div>
        ))
      ) : (
        <p>sent any message!</p>
      )}
    </div>
  );
};

export default ChatMiddlePart;
