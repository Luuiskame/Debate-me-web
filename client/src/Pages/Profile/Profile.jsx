
//? styles
import styles from './Profile.module.css'

// redux
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom';
import {useGetUserByUsernameQuery} from '../../redux/apiSlices/userAPI'

// components
import SendMessageButton from './components/SendMessageButton/SendMessageButton';
import Visitorpov from './components/Visitorpov/Visitorpov';

const Profile = ()=>{
    // when clicking on someone elses profile or our profile we're extracting the username from the params url
    const {foreignUsername} = useParams()
    console.log(`user visited: ${foreignUsername}`)
    
    const {data, isLoading, isError, error} = useGetUserByUsernameQuery(foreignUsername)
    console.log(`user fetch data: ${data}`)

    // getting our own username from the gloabl state
    const personalUsername = useSelector(state=> state.userReducer.user)
    const personalUid = personalUsername?.id
    
    const foreignId = data?.id
    console.log(`user active: ${personalUsername.username}`)

    //! comparing that username with the one received from params  if its our own profile, we access to more features
    if(personalUsername.username === foreignUsername){
        return (
            <div className={styles.profileContainer}>

            <div className={styles.firstProfilePart}>
            <figure className={styles.pfpContainer}>
                <img className={styles.userProfilePicture} src={personalUsername.profilePicture} alt="" />
            </figure>
            
            <div className={styles.nameAndUserContainer}>
                <p>{personalUsername.name}</p>
                <p>@{personalUsername.username}</p>
            </div>
            <p className={styles.vipText}>VIP</p>
            
            </div>
            
            <div className={styles.secondProfilePart}>
                <div className={styles.mainButtonsContainer}>
                    <button className={styles.mainButtons}>Following</button>
                    <button className={styles.mainButtons}>Followers</button>
                    <button className={styles.mainButtons}>Memories</button>
                    <button className={styles.mainButtons}>Visitors</button>
                </div>
                <button className={styles.editProfileButton}>Edit Profile</button>
            </div>
        </div>
        )
    }

    if(foreignUsername !== personalUsername.username){
        return(
            <Visitorpov
            data={data}
            receiverId={foreignId}
            senderId={personalUid}
            />
        )
    }
}

export default Profile