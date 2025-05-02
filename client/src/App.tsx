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
import Prevent from "./pages/Prevent";
import { Toaster } from "@/components/ui/sonner"
import Username from "./pages/Username";
 
function App() {
  const { count } = useStore((state) => state);
  const isLogin = localStorage.getItem("access_token");

  return (
    <>
      {isLogin && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-verify" element={<Otp />} />
        <Route path="/create-username" element={<Username />} />
        <Route path="/confirm-password" element={<Password />} />
        <Route element={<Prevent />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:slug" element={<Detail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
