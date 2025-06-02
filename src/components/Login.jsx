import React, { useState } from 'react'
import {useNavigate}  from "react-router-dom"
import "./login.css"
export default function Login() {
    const navigator=useNavigate();
    const [errMsg,setErrMsg]=useState("")
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const res=await fetch("http://localhost:5000/login",{
                method:"POST",
                credentials: "include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({phone:e.target.phoneInput.value,password:e.target.passwordInput.value})
            })
            if(res.ok){
            navigator("/home");
            }
            else if(res.status===404){
              setErrMsg("Please Register before trying to login");
            }
            else{
                setErrMsg("Invalid credentials")
                navigator("/login")
            }
        }
        catch(err){
           setErrMsg("Some Error occured at the server please try again after some time")
            navigator("/login")
        }
    }

    const handleBack=()=>{
      navigator('/')
    }
  return (
    <div>
      {errMsg && <p className="error-message">{errMsg}</p>}
      <form name="loginForm" id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="phoneInput" name="phoneLabel">Phone:</label>
        <input type="text" id="phoneInput" name="phone" />

        <label htmlFor="passwordInput" name="passwordLabel">Password:</label>
        <input type="password" id="passwordInput" name="password" />

        <button type="submit" name="submitBtn">Login</button>
      </form>
      <button type="button" onClick={handleBack} className='back'>Back</button>
    </div>
  )
}
