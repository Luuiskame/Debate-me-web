import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

// custom hooks
import { useRegister } from "../../hooks/useRegister";
import { useExist } from "../../hooks/useExist";

const Signup = () => {
  const initialState = { name: "", email: "", username: "", password: "", profilePicture: "1234", verifyPassword: "" };
  const [userData, setUserData] = useState(initialState);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const navigate = useNavigate();
  let disable = false;

  // calling custom hooks
  const { fetchData, data } = useRegister();
  const { sendEmailReq, data: isEmailFound, error: errorEmail } = useExist(userData.email);
  const { sendUsernameReq, data: isUsernameFound, error: errorUsername } = useExist(userData.username);

  // check if Email or username are already taken
  const handleDataValidation = (event) => {
    if (event.target.name === "email") sendEmailReq(userData.email);
    if (event.target.name === "username") sendUsernameReq(userData.username);
  };

  // update the values
  const handleChange = (event) => {
    //verify passwords matching
    if (event.target.name === "verifyPassword") {
      let isEqual = event.target.value !== userData.password;
      setPasswordsMatch(isEqual);
    }
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // send server request to register user
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(userData);
  };

  // redirecting user to the next page
  useEffect(() => {
    data && navigate("/home");
  }, [data]);

  // check if there's any already-in-used data before sending request
  if (isEmailFound || isUsernameFound) disable = true;

  return (
    <>
      <div className={styles.display}>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Create your account</h1>
          <p className={styles.text}>Create an account to chat and discuss interesting topics</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/*  */}

            {/* inputs */}

            <label className={styles.titles} htmlFor="name">
              Full name
            </label>
            <input className={styles.inputs} onChange={handleChange} id="name" name="name" type="text" required placeholder="introduce your name" />
            <label className={styles.titles} htmlFor="email">
              Email
            </label>
            <input className={styles.inputs} onChange={handleChange} id="email" name="email" onBlur={handleDataValidation} type="email" autoComplete="email" required placeholder="example@gmail.com" />
            {isEmailFound && <p className={styles.isUsed}>Email is used already</p>}
            <label className={styles.titles} htmlFor="username">
              Username
            </label>
            <input className={styles.inputs} onChange={handleChange} onBlur={handleDataValidation} id="username" name="username" type="text" required placeholder="Pick an username" />
            {isUsernameFound && <p className={styles.isUsed}>username already taken</p>}

            {/* Passwords */}

            <label className={styles.titles} htmlFor="password">
              Password
            </label>
            <input className={styles.inputs} onChange={handleChange} name="password" id="password" type="password" required placeholder="Enter password" />
            <label className={styles.titles} htmlFor="verifyPassword">
              Confirm password
            </label>
            <input className={styles.inputs} onChange={handleChange} name="verifyPassword" id="verifyPassword" type="password" required placeholder="Reapeat password" />
            {passwordsMatch && <p className={styles.isUsed}>passwords aren't the same</p>}
            <button disabled={disable} className={disable ? styles.disabled : styles.submitBtn} type="submit">
              Create your account
            </button>
            <p className={styles.termsofservice}>
              By creating an account you agree to our <a href="#"> Terms of Service and Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
