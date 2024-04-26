import styles from './MessageIcon.module.css'
import { Link } from 'react-router-dom';

import { FiMessageSquare } from "react-icons/fi";

const MessageIcon = ()=> {
    return(
        <>
        <Link to='/chats'>
            <FiMessageSquare className={styles.messageIcon} />
            </Link>
        </>
    )
}


export default MessageIcon