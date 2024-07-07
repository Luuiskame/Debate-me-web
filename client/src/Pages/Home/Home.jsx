// styles
import main_styles from "./main.module.css";
import social_styles from "./social.module.css";
import posts_styles from "./posts.module.css";
import voicechats_styles from "./voicechats.module.css";
import navbar_styles from "./navbar.module.css";

// components
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/navbar";
import Posts from "./components/posts/posts";
import Voicechats from "./components/voicechats/voicechats";
import Social from "./components/social/Social";

const Home = () => {
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);

  return (
      <main className={main_styles.grid_container}>
      {/* <Navbar styles={navbar_styles} /> */}
        <Social styles={social_styles} />
        <Posts styles={posts_styles} />
        <Voicechats styles={voicechats_styles} />
      </main>
  );
};

export default Home;
