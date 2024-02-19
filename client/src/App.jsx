import { Routes, Route } from "react-router-dom";

//Importing components
import Login from "./components/Login/Login";

//importing redux

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
