import React, { useState } from "react";
import styles from "./friends.module.css";
const Social = () => {
  const isActive = false;
  const friends = [
    { img: "../../../resources/png/nopicture.png", name: "kevin ", profileUrl: "#" },
    { img: "../../../resources/png/nopicture.png", name: "carlos", profileUrl: "#" },
    { img: "../../../resources/png/nopicture.png", name: "maria", profileUrl: "#" },
    { img: "../../../resources/png/nopicture.png", name: "jose", profileUrl: "#" },
    { img: "../../../resources/png/nopicture.png", name: "christhopher", profileUrl: "#" },
  ];

  return (
    <div className={styles.friendsbackground}>
      <div className={styles.wrapper}>
        <h1>friends</h1>
        {friends.map((friend) => (
          <div className={styles.friend}>
            <img src={friend.img} alt="profile-picture" />
            <a href={friend.profileUrl}>
              <p>{friend.name}</p>
            </a>
            {isActive ? "true" : "false"}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Social;
