
//Importing components
import Login from "./Pages/Login/Login";
import Signup from "./Pages/signup/signup";
import Chats from "./Pages/Chats/Chats";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Chat from "./Pages/Chats/Chat/Chat";

// react redux
import {useSelector, useDispatch} from 'react-redux'

// react router dom
import { Routes, Route,  useNavigate } from "react-router-dom";

//sockets
import { socket } from "./socket";

//user slice
import { updateUserActivity } from "./redux/slices/userSlice";

import { useEffect } from "react";

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.userReducer.user?.id);
  const usera = useSelector((state) => state.userReducer.isUserActive);

  console.log(usera)
  console.log(userId)

  useEffect(()=> {
    if(userId){
      // socket.connect()
      dispatch(updateUserActivity(true))
    } else {
      navigate(`/login`)
      dispatch(updateUserActivity(false))
    }
    return ()=> {
      // socket.disconnect()
      dispatch(updateUserActivity(false))
    }
  },[userId])

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/profile/:foreignUsername" element={<Profile />} />
      </Routes>
    </main>
  );
}

export default App;
