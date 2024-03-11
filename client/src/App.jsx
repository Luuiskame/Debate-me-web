import { Routes, Route } from "react-router-dom";

//Importing components
import Login from "./Pages/Login/Login";
import Signup from "./Pages/signup/signup";
import Chat from "./Pages/Chat/Chat";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile/:uid" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
