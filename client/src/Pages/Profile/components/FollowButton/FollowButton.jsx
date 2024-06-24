
// socket 
import { socket } from "../../../../socket"

//react
import { useEffect, useState } from "react"

// redux
import { useGetIfFollowingUserMutation } from "../../../../redux/apiSlices/profileAPI"


const FollowButton = ({ userToFollow, userWhosFollowing }) => {
    const [followStatus, setFollowStatus] = useState('Follow');
    const [getIfFollowingUser] = useGetIfFollowingUserMutation();
  
    const followFunction = () => {
      socket.emit("followUser", {
        userWhosFollowingId: userWhosFollowing,
        userToFollowId: userToFollow
      });
    };
  
    useEffect(() => {
      
        const checkFollow = async () => {
        try {
          const response = await getIfFollowingUser({
            userWhosFollowingId: userWhosFollowing,
            userToFollowId: userToFollow
          }).unwrap();
  
          if (response.isFollowing) {
            setFollowStatus('Following');
          }
        } catch (error) {
          console.error("Error checking follow status:", error);
        }
      };
  
      checkFollow();
  
      const handleFollowUserResponse = (data) => {
        console.log(data);
      };
  
      socket.on("followUserResponse", handleFollowUserResponse);
  
      // Clean up event listeners after component unmount
      return () => {
        socket.off("followUserResponse", handleFollowUserResponse);
      };
    }, [userToFollow, userWhosFollowing, getIfFollowingUser]);
  
    return (
      <button onClick={followFunction}>
        {followStatus}
      </button>
    );
  };


export default FollowButton