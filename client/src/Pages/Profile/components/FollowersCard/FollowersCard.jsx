import { useState } from 'react'
import styles from './FollowersCard.module.css'
import UserCard from '../../../Home/components/navbar/components/UserCard/UserCard'


import { useGetUserFollowersMutation } from '../../../../redux/apiSlices/profileAPI'

import { IoIosArrowBack } from "react-icons/io";

//redux
import { setUnreadFollowersToZero } from '../../../../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux'


const FollowersCard = ({userId})=> {
    const username = useSelector(state=> state.userReducer.user?.username)
    const unreadFollowers = useSelector(state=> state.userReducer.unreadFollowers)
    const dispatch = useDispatch()
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

        if(unreadFollowers > 0){
            dispatch(setUnreadFollowersToZero(0))
        }
    }
    return (
        <>
            <button 
            className={`${styles.mainButtons} ${displayCardClass ? styles.remove : null}`}
            onClick={displayCardFn}
            >Followers
            </button>

            <div className={`${displayCardClass ? styles.showFollwersCard : styles.remove}`}>
                <div className={styles.nameAndBackBtnContainer}>
                <IoIosArrowBack
                size={25}
                 onClick={()=> setDisplayCardClass(false)}
                 />
                <p className={styles.titleText}>Followers</p>
                </div>
                <div className={styles.userCardsContainer}>

                    {/* // we'll map all users and render a card per user */}
                    {followers.map(follower=> (
                        <UserCard
                            user={follower}
                        />
                    ))}
                    {/* <UserCard/> */}
                </div>
            </div>
        </>
    )
}

export default FollowersCard