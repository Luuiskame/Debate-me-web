import React from "react";
import styles from "./Login.module.css";
import LoginForm from "./loginExtra/loginform";
import LoginFacebook from "./loginExtra/loginFacebook";
import LoginGoogle from "./loginExtra/loginGoogle";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className={styles.display}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Welcome to SpeakiT</h1>
        <LoginForm />
        <p>Or</p>
        <LoginFacebook />
        <LoginGoogle />

        <p className={styles.register}>
          Don't have an account yet?{" "}
          <Link className={styles.link} to="/register">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
