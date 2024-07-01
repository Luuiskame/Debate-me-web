import { useState } from 'react'
import styles from './FollowersCard.module.css'
import UserCard from '../../../Home/components/navbar/components/UserCard/UserCard'

const FollowersCard = ()=> {
    const [displayCardClass, setDisplayCardClass] = useState(false)

    const displayCardFn = ()=> {
        setDisplayCardClass(true)
    }
    return (
        <>
            <button 
            className={`${styles.mainButtons} ${displayCardClass ? styles.remove : null}`}
            onClick={displayCardFn}
            >Followers
            </button>

            <div className={`${displayCardClass ? styles.showFollwersCard : styles.remove}`}>
                <p>Followers</p>
                <div className={styles.userCardsContainer}>
                    users

                    {/* // we'll map all users and render a card per user */}
                    {/* <UserCard/> */}
                </div>
                <button onClick={()=> setDisplayCardClass(false)}>X</button>
            </div>
        </>
    )
}

export default FollowersCard