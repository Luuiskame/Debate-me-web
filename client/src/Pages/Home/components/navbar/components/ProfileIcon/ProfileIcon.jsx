import styles from './ProfileIcon.module.css'
import { CiUser } from "react-icons/ci";
import { socket } from '../../../../../../socket';
import { useEffect } from 'react';


const ProfileIcon = ()=> {

  useEffect(()=> {
    const handleNewFollowerNotificationResponse = (data)=> {
      console.log(data)
    }

    socket.on("newFollowerNotification", handleNewFollowerNotificationResponse)

    return ()=> {
      socket.off("newFollowerNotification", handleNewFollowerNotificationResponse)
    }
  },[])

    return (
       <>
         <CiUser color="#08616d" className={styles.UserIcon}/>
       </>
    )
}

export default ProfileIcon