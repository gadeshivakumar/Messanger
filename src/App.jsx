import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddContact from "./components/AddContact";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import Private from "./components/Private";
import ErrorPage from "./components/ErrorPage";

import AuthContext from "./apicontext";
import Loader from "./components/Loader";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
   const checkLogin = async () => {
      try {
        const res = await fetch("https://messanger-backend-cu42.onrender.com/api/user/islogin", {
          credentials: "include",
        });

         if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setUser({
          username: data.username,
          phone: data.phone,
          token:data.token
        });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />

          <Route
            path="/add"
            element={
              <Private>
                <AddContact />
              </Private>
            }
          />

          <Route
            path="/chat"
            element={
              <Private>
                <ChatRoom />
              </Private>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />

          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


