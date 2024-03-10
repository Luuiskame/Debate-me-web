import React from "react";
import styles from "../Login.module.css";
const LoginGoogle = () => {
  return (
    <>
      <button className={styles.loginGoogle}>
        <span>
          <img className={styles.googleImg} src="..\resources\png\search.png" width="25px" alt="" />
        </span>
        continue with Gmail
      </button>
    </>
  );
};

export default LoginGoogle;
