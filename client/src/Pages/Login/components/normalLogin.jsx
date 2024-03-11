import React, { useEffect, useState } from "react";
import styles from "../Login.module.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";
import { useDispatch } from "react-redux";
import { updateDataReducer } from "../../../redux/slices/userSlice";

const NormalLogin = () => {
  const [user, setUser] = useState({ usernameOrEmail: "", password: "" });
  const { sendRequest, isError, data, isFound } = useLogin(user);
  const navigate = useNavigate();
  const handleRequest = (e) => {
    e.preventDefault();
    sendRequest();
  };
  console.log(data);
  const testing = () => {
    navigate("/home");
  };

  // redirecting if user found
  // useEffect(() => {
  //   if (isFound) navigate("/home");
  // }, []);
  return (
    <>
      <button onClick={testing}>Log in</button>
      <h1 className={styles.title}>Welcome to SpeakiT</h1>

      <form onSubmit={(e) => handleRequest(e)} className={styles.form}>
        <label className={styles.labels} htmlFor="username">
          Email or Username
        </label>
        <input required onChange={(e) => setUser({ ...user, usernameOrEmail: e.target.value })} id="username" className={styles.input} type="text" placeholder="Email or username" />
        <p style={{ display: isError ? "none" : "block" }} className={styles.errorMsg}>
          Incorrect Email Address or Password{" "}
        </p>
        <label className={styles.labels} htmlFor="password">
          password
        </label>
        <input required onChange={(e) => setUser({ ...user, password: e.target.value })} className={styles.input} id="password" type="password" placeholder="Enter Password" />
        <a className={styles.recoverPassword} href="#">
          Forgot your Pasword?
        </a>
        <button type="submit" className={styles.loginBtn}>
          Log in
        </button>
      </form>
    </>
  );
};

export default NormalLogin;
