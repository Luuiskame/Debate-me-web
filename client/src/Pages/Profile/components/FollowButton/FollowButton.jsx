// socket 
import { socket } from "../../../../socket"

//? css
import styles from './FollowButton.module.css'

//react
import { useEffect, useState } from "react"

// redux
import { useGetIfFollowingUserMutation, useUnfollowUserMutation } from "../../../../redux/apiSlices/profileAPI"


const FollowButton = ({ userToFollow, userWhosFollowing }) => {
  console.log({userToFollowId: userToFollow, userWhosFollowingId: userWhosFollowing})
  const [followStatus, setFollowStatus] = useState(''); // Default to empty string
  const [getIfFollowingUser] = useGetIfFollowingUserMutation();
  const [unfollowUser] = useUnfollowUserMutation(); 

  const followFunction = () => {
    if (followStatus === "Follow") {
      socket.emit("followUser", {
          userWhosFollowingId: userWhosFollowing,
          userToFollowId: userToFollow
      });
    } else if (followStatus === "Following") {
      unfollowUserFn();
      console.log("user unfollowed");
    }
  };

  useEffect(() => {
    const handleFollowUserResponse = (data) => {
      if(data.success){
        setFollowStatus("Following");
      }
      console.log(data);
    };

    socket.on("followUserResponse", handleFollowUserResponse);

    // Clean up event listeners after component unmount
    return () => {
      socket.off("followUserResponse", handleFollowUserResponse);
    };
  }, []);

  useEffect(() => {
    //the unwrap is a fn that we use to manage directly the response from redux toolkit
    const checkFollow = async () => {
      try {
        const response = await getIfFollowingUser({
          userWhosFollowingId: userWhosFollowing,
          userToFollowId: userToFollow
        }).unwrap();

        if (response.isFollowing) {
          setFollowStatus('Following');
        } else {
          setFollowStatus('Follow');
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollow();
  }, [userToFollow]);

  const unfollowUserFn = async () => {
    try {
      const response = await unfollowUser({
        userWhosFollowingId: userWhosFollowing,
        userToFollowId: userToFollow
      }).unwrap();

      if (response.unfollowed) {
        setFollowStatus("Follow");
      }
    } catch (error) {
      console.log('error unfollowing this user: ', error);
    }
  }

  return (
    <button className={styles.followButton} onClick={followFunction}>
      {followStatus}
    </button>
  );
};

export default FollowButton;
