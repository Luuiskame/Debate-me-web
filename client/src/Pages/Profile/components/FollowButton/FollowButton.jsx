
// socket 
import { socket } from "../../../../socket"

//react
import { useEffect, useState } from "react"


const FollowButton = ({userToFollow, userWhosFollowing})=> {
    const [followStatus, setFollowStatus] = useState('follow')

    const followFunction = ()=> {
        socket.emit("followUser", {userWhosFollowingId: userWhosFollowing, userToFollowId: userToFollow})
        setFollowStatus('Following')
    }
    return(
        <button onClick={followFunction}>
            {followStatus}
        </button>
    )
}


export default FollowButton