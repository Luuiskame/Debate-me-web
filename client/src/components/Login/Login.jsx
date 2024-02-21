import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import Loginfb from "./loginfb";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialState = { username: "", password: "" };
  const [user, setUser] = useState(initialState);
  const { fetchData, data, isLoading, error } = useLogin();
  const navigate = useNavigate()

  // testing <3 -----------------------------------------
  const sendRequest = (e) => {
    e.preventDefault();
    fetchData(user);
  };
  if (data) {
    navigate('/home')
  }

  return (
    <div>
      {/* title */}

      <div className={styles.display}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Welcome to SpeakiT</h1>

          {/* Login Manually */}

          <form onSubmit={(e) => sendRequest(e)} className={styles.form}>
            <label className={styles.labels} htmlFor="username">
              Email or Username
            </label>
            <input required onChange={(e) => setUser({ ...user, username: e.target.value })} id="username" className={styles.input} type="text" placeholder="Email or username" />
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

          <p>Or</p>

          {/* Facebook */}

          <Loginfb />

          {/* <button className={styles.loginFacebook}>
            <span>
              <img className={styles.fbimg} src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/U7MAWJlE6hZ.png" alt="" />
            </span>
            Continue with Facebook
          </button> */}

          {/* Google */}

          <button className={styles.loginGoogle}>
            <span>
              <img className={styles.googleImg} src="..\resources\png\search.png" width="25px" alt="" />
            </span>
            continue with Gmail
          </button>

          {/* register */}

          <p className={styles.register}>
            Don't have an account yet?{" "}
            <Link className={styles.link} to="/register">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
