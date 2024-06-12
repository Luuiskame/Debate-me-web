
// socket 
import { socket } from "../../../../socket"

//react
import { useEffect, useState } from "react"


const FollowButton = ({userToFollow, userWhosFollowing})=> {
    const [followStatus, setFollowStatus] = useState('Follow')

    const followFunction = ()=> {
        socket.emit("followUser", {
            userWhosFollowingId: userWhosFollowing, 
            userToFollowId: userToFollow
        })

    }

    useEffect(() => {
        const handleFollowUserResponse = (data) => {
            console.log(data);
        };

        socket.on("followUserResponse", handleFollowUserResponse);

        // we need to clean the event after component unmount
        return () => {
            socket.off("followUserResponse", handleFollowUserResponse);
        };
    }, []);
    
    return(
        <button onClick={followFunction}>
            {followStatus}
        </button>
    )
}


export default FollowButton