import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import User from "./components/User";
import SignUp from "./components/SignUp";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
