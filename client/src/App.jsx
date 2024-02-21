import { Routes, Route } from "react-router-dom";

//Importing components
import Login from "./components/Login/Login";
import Signup from "./components/signup/signup";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </main>
  );
}

export default App;
