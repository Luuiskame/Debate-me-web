
//? styles
import styles from './Profile.module.css'

// redux
import { useSelector } from 'react-redux'

const Profile = ()=>{
    const user = useSelector(state=> state.userReducer.user)
    console.log(user)
    return(
        <div className={styles.profileContainer}>

            <div className={styles.firstProfilePart}>
            <figure className={styles.pfpContainer}>
                <img className={styles.userProfilePicture} src={user.profilePicture} alt="" />
            </figure>
            
            <div className={styles.nameAndUserContainer}>
                <p>{user.name}</p>
                <p>@{user.username}</p>
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

export default Profile