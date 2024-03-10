import mainstyle from "./home.module.css";
// components
import Navbar from "./components/navbar/navbar";
import Posts from "./components/posts/posts";
import Voicechats from "./components/voicechats/voicechats";
const Home = () => {
  return (
    <>
      <nav className={mainstyle.nvbar}>
        <Navbar />
      </nav>
      <section>
        <Posts />
        <Voicechats />
      </section>
    </>
  );
};
export default Home;
