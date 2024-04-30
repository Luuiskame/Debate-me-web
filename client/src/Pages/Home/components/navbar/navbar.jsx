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

        <div className={styles.navbarItems}>
          {/* search-box */}
          <div
            className={`${styles.searchBox}`}
          >
            <Searchbar />
          </div>

          {/* create new post */}
          <div className={`${styles.generalIconsSizeContainer}`}>
            <CiCirclePlus color="#08616d"/>
            {/* <p className={styles.newPostText}>New Post</p> */}
          </div>

          <div className={`${styles.generalIconsSizeContainer}`}>
            <MessageIcon />
          </div>
        </div>
      </div>

      {/* main icons */}
      <div className={styles.mainIconsContainer}>
        <div className={`${styles.generalIconsSizeContainer}`}>
          <CiHome color="#08616d"/>
        </div>

        <div className={`${styles.generalIconsSizeContainer}`}>
          <LiaUserFriendsSolid color="#08616d"/>
        </div>

        <div className={`${styles.generalIconsSizeContainer}`}>
          <IoIosNotificationsOutline color="#08616d"/>
        </div>

        {/* Profile Icon */}
        <div className={`${styles.generalIconsSizeContainer}`}>
          <Link to={`/profile/${personalUsername}`}>
            <CiUser className={styles.settings} color="#08616d"/>
          </Link>
        </div>

        {/* setting icon */}
        <div className={`${styles.generalIconsSizeContainer}`}>
          <CiSettings color="#08616d"/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
