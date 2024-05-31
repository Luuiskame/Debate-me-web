import SendMessageButton from '../SendMessageButton/SendMessageButton'
import FollowButton from '../FollowButton/FollowButton'
import styles from './visitorpov.module.css'

const visitorpov = ({data}, receiverId, personalUid)=> {
    return (
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

            <div className={styles.userInteractions}>
                <SendMessageButton 
                foreignId={receiverId}
                senderId={personalUid}
                />

                <FollowButton
                foreignId={receiverId}
                senderId={personalUid}
                />
            </div>

        </div>
    )
}


export default visitorpov