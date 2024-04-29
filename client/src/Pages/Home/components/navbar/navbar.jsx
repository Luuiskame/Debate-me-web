import React from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

// redux
import { useSelector } from "react-redux";

// components
import Searchbar from "./components/Searchbar/Searchbar";
import MessageIcon from "./components/MessageIcon/MessageIcon";
import { CiCirclePlus } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const Navbar = ({ styles }) => {
  const personalUsername = useSelector(
    (state) => state.userReducer.user.username
  );
  console.log(personalUsername);
  return (
    <nav className={styles.navbar}>

      <div className={styles.navbarFirstPart}>

      <figure className={styles.logoContainer}>
        <img
          className={styles.logoImg}
          src="./resources/png/secondlogo.png"
          alt=""
        />
      </figure>

      {/* search-box */}
      <div className={`${styles.generalIconsSizeContainer} ${styles.searchBox}`}>
        <Searchbar />
      </div>

      {/* create new post */}

      <div className={`${styles.generalIconsSizeContainer}`}>
        <CiCirclePlus />
        <p className={styles.newPostText}>New Post</p>
      </div>

      <div className={`${styles.generalIconsSizeContainer}`}>
        <MessageIcon />
      </div>

      </div>

      {/* main icons */}
      <div className={styles.mainiconsContainer}>
        <div className={`${styles.generalIconsSizeContainer}`}>
          <CiHome />
        </div>

        <div className={`${styles.generalIconsSizeContainer}`}>
          <LiaUserFriendsSolid />
        </div>

        <div className={`${styles.generalIconsSizeContainer}`}>
          <IoIosNotificationsOutline />
        </div>

        {/* Profile Icon */}
        <div className={`${styles.generalIconsSizeContainer}`}>
          <Link to={`/profile/${personalUsername}`}>
            <CiUser className={styles.settings} />
          </Link>
        </div>

        {/* setting icon */}
        <div className={`${styles.generalIconsSizeContainer}`}>
          <CiSettings />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
