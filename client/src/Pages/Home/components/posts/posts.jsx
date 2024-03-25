import React from "react";
import Createpost from "./components/createpost/createpost";
import Postlist from "./components/postlist/postlist";
const Posts = ({ styles }) => {
  const lala = { postimage: "../../../resources/png/testimage.jpg", username: "lala12", name: "Lara ivanova", profilepicture: "../../../resources/png/femalepic.jpg" };
  const patricio = { postimage: "../../../resources/png/dogpic.jpeg", username: "mrHandsome", name: "patricio estrella", profilepicture: "../../../resources/png/mrhandsome.jpg" };
  const users = [lala, patricio];

  return (
    <div className={styles.posts}>
      <Createpost styles={styles} />
      {users.map((user) => (
        <Postlist user={user} styles={styles} />
      ))}
    </div>
  );
};
export default Posts;
