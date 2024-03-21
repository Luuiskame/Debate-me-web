
//? styles
import styles from './Profile.module.css'

// redux
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom';
import { useGetUserByUsernameQuery } from '../../redux/apiSlices/userAPI'

const Profile = ()=>{
    
    const {foreignUsername} = useParams()
    console.log(foreignUsername)
    const {data, isLoading, isError, error} = useGetUserByUsernameQuery(foreignUsername)

    
    const personalUsername = useSelector(state=> state.userReducer.user)
    // console.log(user)
    
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
            <div className={styles.profileContainer}>

            <div className={styles.firstProfilePart}>
            <figure className={styles.pfpContainer}>
                <img className={styles.userProfilePicture} src={data.profilePicture} alt="" />
            </figure>
            
            <div className={styles.nameAndUserContainer}>
                <p>{data.name}</p>
                <p>@{data.username}</p>
            </div>
            <p className={styles.vipText}>VIP</p>
            
            </div>
        </div>
        )
    }
}

export default Profile