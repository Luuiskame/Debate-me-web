import mainstyle from "./home.module.css";
// components
import Navbar from "./components/navbar/navbar";
import Posts from "./components/posts/posts";
import Voicechats from "./components/voicechats/voicechats";
import { useSelector } from "react-redux";
import Social from "./components/friends/friends";

const Home = () => {
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);

  return (
    <>
      <nav className={mainstyle.nvbar}>
        <Navbar />
      </nav>
      <section>
        <Social />
        <Posts />
        <Voicechats />
      </section>
    </>
  );
};
export default Home;
