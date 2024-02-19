import React, { useState } from "react";
import styles from "./signup.module.css";
function Signup() {
  const [isTaken, setIsTaken] = useState(true);

  return (
    <>
      <div className={styles.display}>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Create your account</h1>
          <p className={styles.text}>Create an account to chat and discuss interesting topics</p>
          <form className={styles.form} action="">
            <label className={styles.titles} htmlFor="name">
              Full name
            </label>
            <input className={styles.inputs} id="name" type="text" placeholder="introduce your name" />

            <label className={styles.titles} htmlFor="email">
              Email
            </label>
            <input className={styles.inputs} id="email" type="email" placeholder="example@gmail.com" />

            <label className={styles.titles} htmlFor="username">
              Username
            </label>
            <input className={styles.inputs} id="username" type="text" placeholder="Pick an username" />
            <p className={isTaken ? styles.isUsed : styles.isNotUsed}>username already taken</p>
            <label className={styles.titles} htmlFor="password">
              Password
            </label>
            <input className={styles.inputs} id="password" type="password" placeholder="Enter password" />

            <label className={styles.titles} htmlFor="">
              Confirm password
            </label>
            <input className={styles.inputs} id="rep-password" type="password" placeholder="Reapeat password" />

            <button className={styles.submitBtn}>Create your account</button>
            <p className={styles.termsofservice}>
              By creating an account you agree to our <a href="#"> Terms of Service and Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
