import styles from './UserCard.module.css'

//react
import {Link} from 'react-router-dom'

const UserCard = ({user}) => {
    return (
        <div className={styles.profileContainer}>

            <Link 
            to={`/profile/${user.id}`}
            className={styles.firstProfilePart}>
            <figure className={styles.pfpContainer}>
                <img className={styles.userProfilePicture} src={user.profilePicture} alt="" />
            </figure>
            
            <div className={styles.nameAndUserContainer}>
                <p>{user.name}</p>
                <p>@{user.username}</p>
            </div>
            <p className={styles.vipText}>VIP</p>
            
            </Link>
            
        </div>
    )
}

export default UserCard