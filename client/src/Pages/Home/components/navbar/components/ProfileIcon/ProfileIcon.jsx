import styles from './ProfileIcon.module.css'
import { CiUser } from "react-icons/ci";
import { socket } from '../../../../../../socket';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUnreadFollowers } from '../../../../../../redux/slices/userSlice';

const ProfileIcon = ()=> {
  const dispatch = useDispatch()
  const unreadFollowers = useSelector((state)=> state.userReducer.unreadFollowers)

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

         {unreadFollowers > 0 ? (
          <div className={styles.unreadFollowersNotificationContainer}>
            <p>{unreadFollowers}</p>
          </div>
         ) : null}
       </>
    )
}

export default ProfileIcon