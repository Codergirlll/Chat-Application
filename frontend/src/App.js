import Home from "./Home";
// import Chat from "./components/Chat";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router";
import "../src/Style/register.css";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import SetAvtar from "./components/SetAvtar";

function App() {
  return (
    // <div>
    //   <h1>Realtime Chat Application</h1>
    //   <Chat />
    // </div>
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-avtar" element={<SetAvtar />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
