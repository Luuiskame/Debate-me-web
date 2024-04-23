import { useState, useEffect } from "react";
import styles from "./ChatMiddlePart.module.css";

import { socket } from "../../../../../socket";

import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";

const ChatMiddlePart = ({
  messageReceived,
  correctChatInfo,
  chatId,
  personalUserId,
}) => {
  const [doubleCheck, setDoubleCheck] = useState(null);
  console.log(messageReceived);

  useEffect(() => {
    if (messageReceived.length > 0 && chatId && personalUserId) {
      const lastMesage = messageReceived.pop();
      console.log(lastMesage);
      if (
        lastMesage?.receiverId === personalUserId &&
        lastMesage.readStatus === false
      ) {
        console.log("activating lastread");
        socket.emit("updateReadStatus", chatId);
      }
    }
  }, [messageReceived]);

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
              <p className={styles.message}>
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
