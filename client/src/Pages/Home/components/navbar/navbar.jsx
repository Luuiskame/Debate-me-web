import React from "react";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <div>
      <div className={styles.navbar}>
        <img className={styles.logoImg} src="./resources/png/secondlogo.png" alt="" />

        {/* search-box */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search" className={styles.searchBar} />
          <span className={styles.searchIcon}>
            <img className={styles.searchimg} src="./resources/png/search-icon.png" alt="" />
          </span>
        </div>

        {/* create new post */}
        <div className={styles.newPost}>
          <img className={styles.newPostIcon} src="./resources/png/notes-icon.png" alt="" />
          <p className={styles.newPostText}>New Post</p>
        </div>

        {/* main icons */}

        <div className={styles.wrapper}>
          <div className={styles.notifications}>
            <img className={styles.notificationIcons} src="./resources/png/friends.png" alt="" />
          </div>
          <div className={styles.notifications}>
            <img className={styles.notificationIcons} src="./resources/png/message.png" alt="" />
          </div>
          <div className={styles.notifications}>
            <img className={styles.notificationIcons} src="./resources/png/notifications.png" alt="" />
          </div>
        </div>

        {/* switch theme */}
        <div className={styles.switchTheme}>
          <img className={styles.switchThemeIcon} src="./resources/png/darkmode.png" alt="" />
        </div>

        {/* setting icon */}
        <div className={styles.settings}>
          <img className={styles.settingsIcon} src="./resources/png/usersettings.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
