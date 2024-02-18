import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

//importing redux

import { useDispatch, useSelector } from "react-redux";
import { changeNameFunction } from "./redux/user/userActions";

//Importing components
import Login from "./components/Login/Login";

function App() {
  const user = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeNameFunction());
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
