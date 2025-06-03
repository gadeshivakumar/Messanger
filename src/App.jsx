import React from 'react'
import Home from "./components/Home"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ChatRoom from './components/ChatRoom'
import Login from "./components/Login"
import Register from './components/Register'
import AddContact from './components/AddContact'
import Profile from './components/Profile'
import LandingPage from './components/LandingPage'
import Private from "./components/Private"
import ErrorPage from './components/ErrorPage'
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
export default function App() {
    
  return (

    <div>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                  <LandingPage/>
                  }/>
                <Route path='/home' 
                element={
                <Private>
                <Home/>
                </Private>
                }
                />
                 <Route path='/add' element={
                  <Private>
                  <AddContact/>
                  </Private>
                }
                  />
                <Route path="/chat" element={
                  <Private>
                  <ChatRoom/>
                  </Private>
                  }/>
                <Route path="/login" element={
                  <Login/>
                  }/>
                <Route path="/register" element={
                  <Register/>
                  }/>
                <Route path="/profile" element={
                  <Private>
                  <Profile/>
                  </Private>
                  }/>
                <Route path="/error" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>

        
    </div>
  )
}
