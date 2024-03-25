import { Routes, Route } from "react-router-dom";

//Importing components
import Login from "./Pages/Login/Login";
import Signup from "./Pages/signup/signup";
import Chats from "./Pages/Chats/Chats";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/profile/:foreignUsername" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
