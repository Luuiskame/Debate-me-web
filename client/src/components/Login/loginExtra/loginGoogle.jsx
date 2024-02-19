import React from "react";
import styles from "../Login.module.css";

function LoginGoogle() {
  return (
    <>
      <button className={styles.loginGoogle}>
        <span>
          <img src="..\resources\png\search.png" width="25px" alt="" />
        </span>
        continue with Gmail
      </button>
    </>
  );
}

export default LoginGoogle;
