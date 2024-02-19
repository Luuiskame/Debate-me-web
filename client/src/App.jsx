import { Routes, Route } from "react-router-dom";

//Importing components
import Login from "./components/Login/Login";
import Signup from "./components/signup/signup";
//importing redux

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </main>
  );
}

export default App;
