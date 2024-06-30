import styles from './ProfileIcon.module.css'
import { CiUser } from "react-icons/ci";
import { socket } from '../../../../../../socket';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUnreadFollowers } from '../../../../../../redux/slices/userSlice';

const ProfileIcon = ()=> {
  const dispatch = useDispatch()
  const unread = useSelector((state)=> state.userReducer.unreadFollowers)
  console.log(unread)

  useEffect(()=> {
    const handleNewFollowerNotificationResponse = (data)=> {
      console.log(data)
      dispatch(setUnreadFollowers(data))
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