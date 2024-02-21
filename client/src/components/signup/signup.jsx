import React, { useState } from "react";
import styles from "./signup.module.css";
// custom hooks
import { useRegister } from "../../hooks/useRegister";
import { useExist } from "../../hooks/useExist";

const Signup = () => {
  const initialState = { name: "", email: "", username: "", password: "", profilePicture: "" };
  const [userData, setUserData] = useState(initialState);
  const [isMatching, setIsMatching] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const { fetchData, isLoading, error, data } = useRegister();

  const handleChange = (value, name) => {
    // server request to check if username is taken
    if (name === "username") {
      const response = useExist(value);
      setIsTaken(response);
    }
    // then updating data
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handlePasswordChange = (value, name) => {
    // check if passwords match
    if (name === "verifyPassword") {
      const comparison = userData.password !== value;
      setIsMatching(comparison);
    }
    // then updating data
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // testing <3 -----------------------------
  const handleSubmit = (event) => {
    if (!isTaken) return;

    event.preventDefault();
    fetchData(userData);
  };
  if (data) return <div>{JSON.stringify(data)}</div>;

  // testing <3 -----------------------------------------
  return (
    <>
      <div className={styles.display}>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Create your account</h1>
          <p className={styles.text}>Create an account to chat and discuss interesting topics</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Inputs */}

            <label className={styles.titles} htmlFor="name">
              Full name
            </label>
            <input className={styles.inputs} { && disabled} onChange={(e) => handleChange(e.target.value, e.target.name)} id="name" name="name" type="text" required placeholder="introduce your name" />
            <label className={styles.titles} htmlFor="email">
              Email
            </label>
            <input
              className={styles.inputs}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="example@gmail.com"
            />
            <label className={styles.titles} htmlFor="username">
              Username
            </label>
            <input className={styles.inputs} onChange={(e) => handleChange(e.target.value, e.target.name)} id="username" name="username" type="text" required placeholder="Pick an username" />
            <p className={isTaken ? styles.isUsed : styles.isNotUsed}>username already taken</p>

            {/* Passwords */}

            <label className={styles.titles} htmlFor="password">
              Password
            </label>
            <input
              className={styles.inputs}
              onChange={(e) => handlePasswordChange(e.target.value, e.target.name)}
              name="password"
              id="password"
              type="password"
              required
              placeholder="Enter password"
            />
            <label className={styles.titles} htmlFor="verifyPassword">
              Confirm password
            </label>
            <input
              className={styles.inputs}
              onChange={(e) => handlePasswordChange(e.target.value, e.target.name)}
              name="verifyPassword"
              id="verifyPassword"
              type="password"
              required
              placeholder="Reapeat password"
            />
            {isMatching && <p>passwords aren't the same</p>}

            {/* submit */}

            <button className={styles.submitBtn} type="submit">
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
