import React from "react";
import styles from "./posts.module.css";
import Createpost from "./components/createpost/createpost";
const Posts = () => {
  return (
    <div className={styles.posts}>
      <Createpost />
    </div>
  );
};
export default Posts;
