import { Link } from "react-router-dom";
import styles from "./Login.module.css";
// components
import Loginfb from "./components/loginfb";
import LoginGoogle from "./components/loginGoogle";
import NormalLogin from "./components/normalLogin";

const Login = () => {
  return (
    <div className={styles.display}>
      <div className={styles.wrapper}>
        {/* Login Manually */}
        <NormalLogin />

        <p>Or</p>

        <Loginfb />

        {/* Google */}

        <LoginGoogle />

        {/* register */}

        <p className={styles.register}>
          Don't have an account yet?{" "}
          <Link className={styles.link} to="/register">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
