import { useState } from 'react'
import styles from './FollowersCard.module.css'
import UserCard from '../../../Home/components/navbar/components/UserCard/UserCard'

import { useSelector } from 'react-redux'

import { useGetUserFollowersMutation } from '../../../../redux/apiSlices/profileAPI'

const FollowersCard = ({userId})=> {
    const username = useSelector(state=> state.userReducer.user?.username)
    console.log(userId)
    const [getFollowers] = useGetUserFollowersMutation()

    const [displayCardClass, setDisplayCardClass] = useState(false)
    const [followers, SetFollowers] = useState([])
    console.log(followers)


    const getFollwersFn = async ()=> {
        try {
            const response = await getFollowers({
                userId: {userId},
                username: username,
            }).unwrap()

            if(response){
                console.log(response)
                SetFollowers(response)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const displayCardFn = ()=> {
        getFollwersFn()
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
                    {followers.map(follower=> (
                        <p>{follower.name}</p>
                    ))}
                    {/* <UserCard/> */}
                </div>
                <button onClick={()=> setDisplayCardClass(false)}>X</button>
            </div>
        </>
    )
}

export default FollowersCard