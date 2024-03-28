import React from "react";
import styles from "./navbar.module.css";
import {Link} from 'react-router-dom'
import { CiUser } from "react-icons/ci";

// redux
import {useSelector} from 'react-redux'

// components
import Searchbar from "../Searchbar/Searchbar";


const Navbar = () => {
 const personalUsername = useSelector(state=> state.userReducer.user.username) 
 console.log(personalUsername)
  return (
    <div>
      <div className={styles.navbar}>
        <img className={styles.logoImg} src="./resources/png/secondlogo.png" alt="" />

        {/* search-box */}
        <div className={styles.searchBox}>
          <Searchbar/>
        </div>

        {/* create new post */}

        <div className={styles.newPost}>
          <img className={styles.newPostIcon} src="./resources/png/notes-icon.png" alt="" />
          <p className={styles.newPostText}>New Post</p>
        </div>

        <div className={styles.switchTheme}>
          <img className={styles.switchThemeIcon} src="./resources/png/darkmode.png" alt="" />
        </div>
        {/* main icons */}
        <div className={styles.mainicons}>
          {/* <div className={styles.notifications}>
            <img className={styles.notificationIcons} src="./resources/png/friends.png" alt="" />
          </div> */}

          <div className={styles.notifications}>
            <Link to='/chats'>
              <img className={styles.notificationIcons} src="./resources/png/message.png" alt="" />
            </Link>
          </div>
          <div className={styles.notifications}>
            <img className={styles.notificationIcons} src="./resources/png/notifications.png" alt="" />
          </div>

          {/* setting icon */}
          <div className={styles.settings}>
            <img className={styles.settingsIcon} src="./resources/png/usersettings.png" alt="" />
          </div>
        </div>

        {/* Profile Icon */}
        <div className={styles.settings}>
          <Link to={`/profile/${personalUsername}`}>
            <CiUser className={styles.settings}/> 
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
