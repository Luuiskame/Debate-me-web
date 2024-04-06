import React from "react";
import { useSelector } from "react-redux";

const Createpost = ({ styles }) => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className={styles.createpost}>
      {/* user img,name and select publising priority */}
      <div>
        <img src="../../../../../resources/png/nopicture.png" alt="" />

        <span>
          <p>{user.username ? `@${user.username}` : "@unnamed"}</p>
          <select name="public">
            <option value="">🌎Public</option>
            <option value="">👥Friends</option>
            <option value="">👁️‍🗨️Private</option>
          </select>
        </span>
      </div>

      {/* text input */}
      <div>
        <input type="text" placeholder="What's on your mind" className={styles.create_post_userinput} />
      </div>

      {/*add tags, img, emojies, and publish-button */}

      <div className={styles.buttons}>
        <div className={styles.emojies}>
          <span>
            <img src="../../../../../resources/png/tag.png" alt="uploadpic" />
          </span>
          <p>😊</p>
          <span>
            <img src="../../../../../resources/png/uploadimg.png" alt="uploadpic" />
          </span>
        </div>
        <button className={styles.pusblishbutton}>post</button>
      </div>
    </div>
  );
};

export default Createpost;
