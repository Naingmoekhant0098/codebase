import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useStore } from "./store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Otp from "./pages/Otp";
import Password from "./pages/Password";
import Nav from "./components/navbar";
import Detail from "./pages/Detail";
import Post from "./pages/Post";
import Profile from "./pages/Profile";

function App() {
  const { count } = useStore((state) => state);
  return (
   
   <>
      <Nav />
    <Routes>
    
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp-verify" element={<Otp />} />
      <Route path="/confirm-password" element={<Password />} />
      <Route path="/detail/:id" element={<Detail />}/>
      <Route path="/post" element={<Post />}/>
      <Route path="/profile/:userId" element={<Profile />}/>
    </Routes>
   </>
  );
}

export default App;
