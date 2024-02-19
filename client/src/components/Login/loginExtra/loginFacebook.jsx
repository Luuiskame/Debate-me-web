import React from "react";
import styles from "../Login.module.css";
function LoginFacebook() {
  return (
    <>
      <button className={styles.loginFacebook}>
        <span>
          <img className={styles.fbimg} src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/U7MAWJlE6hZ.png" alt="" />
        </span>
        Continue with Facebook
      </button>
    </>
  );
}

export default LoginFacebook;
