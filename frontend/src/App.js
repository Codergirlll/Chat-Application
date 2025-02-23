import Home from "./Home";
// import Chat from "./components/Chat";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router";
import "../src/Style/register.css";

function App() {
  return (
    // <div>
    //   <h1>Realtime Chat Application</h1>
    //   <Chat />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
