import styles from "./MessageIcon.module.css";
import { Link } from "react-router-dom";

import { socket } from "../../../../../../socket";

import { FiMessageSquare } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotReadMessages } from "../../../../../../redux/slices/chatSlice";

const MessageIcon = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.info("setting num");
    console.log(num);
  }, [num]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user.id);
  const unreadMessages = useSelector(
    (state) => state.chatsReducer.notReadMessages
  );
  console.log(unreadMessages);

  useEffect(() => {
    socket.on("receiveMessageNotification", (data) => {
      dispatch(setNotReadMessages(data));
    });

    //! if we do not stop listening, we are going to set the global state twice
    return () => {
      socket.off("receiveMessageNotification");
    };
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", user);
  }, []);

  return (
    <>
      <Link className={styles.link} to="/chats">
        <FiMessageSquare className={styles.messageIcon} />
      </Link>

      {unreadMessages > 0 ? (
        <div className={styles.messageNotificationNumberContainer}>
          <p>{unreadMessages}</p>
        </div>
      ) : null}
    </>
  );
};

export default MessageIcon;
