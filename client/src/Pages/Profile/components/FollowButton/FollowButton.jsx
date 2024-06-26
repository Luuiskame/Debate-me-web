
// socket 
import { socket } from "../../../../socket"

//react
import { useEffect, useState } from "react"

// redux
import { useGetIfFollowingUserMutation, useUnfollowUserMutation } from "../../../../redux/apiSlices/profileAPI"


const FollowButton = ({ userToFollow, userWhosFollowing }) => {
  console.log({userToFollowId: userToFollow, userWhosFollowingId: userWhosFollowing})
  const [followStatus, setFollowStatus] = useState('');
  const [getIfFollowingUser] = useGetIfFollowingUserMutation();
  const [unfollowUser] = useUnfollowUserMutation(); // Moved here

  const followFunction = () => {
    if (followStatus === "Follow") {
      socket.emit("followUser", {
          userWhosFollowingId: userWhosFollowing,
          userToFollowId: userToFollow
      });
    } else if (followStatus === "Following") {
      console.log("user unfollowed");
    }
  };


  useEffect(() => {
    const handleFollowUserResponse = (data) => {
      if(data.success){
        setFollowStatus("Following")
      }
      console.log(data);
    };

    socket.on("followUserResponse", handleFollowUserResponse);

    // Clean up event listeners after component unmount
    return () => {
      socket.off("followUserResponse", handleFollowUserResponse);
    };
  }, []);

  useEffect(()=> {

    const checkFollow = async () => {
      try {
        const response = await getIfFollowingUser({
          userWhosFollowingId: userWhosFollowing,
          userToFollowId: userToFollow
        }).unwrap();

        if (response.isFollowing) {
          setFollowStatus('Following');
        } else if(response.isFollowing === false){
          setFollowStatus("Follow")
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollow();


  },[followStatus])

  return (
    <button onClick={followFunction}>
      {followStatus}
    </button>
  );
};


export default FollowButton