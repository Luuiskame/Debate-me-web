import React from "react";
import styles from "../Login.module.css";

function LoginForm() {
  return (
    <>
      <form action="" className={styles.form}>
        <label className={styles.labels} htmlFor="username">
          Email or Username
        </label>
        <input id="username" className={styles.input} type="text" placeholder="Email or username" />
        <label className={styles.labels} htmlFor="password">
          password
        </label>
        <input className={styles.input} id="password" type="password" placeholder="Enter Password" />
        <a className={styles.recoverPassword} href="">
          Forgot your Pasword?
        </a>
        <button className={styles.loginBtn}>Log in</button>
      </form>
    </>
  );
}

export default LoginForm;
