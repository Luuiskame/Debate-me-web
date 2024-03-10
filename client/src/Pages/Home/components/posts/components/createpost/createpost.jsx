import React from "react";
import styles from "./createpost.module.css";

const Createpost = () => {
  return (
    <div className={styles.createpost}>
      {/* user img,name and select publising priority */}
      <div>
        <img src="" alt="" />

        <span>
          <p>@user</p>
          <select name="" id=""></select>
        </span>
      </div>

      {/* text input */}
      <div>
        <input type="text" placeholder="What's on your mind" className={styles.userinput} />
      </div>

      {/*add tags, img, emojies, and publish-button */}

      <div className={styles.buttons}>
        <div>
          <button>tag</button>
          <button>emojie</button>
          <button>img</button>
        </div>
        <button>post</button>
      </div>
    </div>
  );
};

export default Createpost;
