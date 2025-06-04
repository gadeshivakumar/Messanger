import React, { useEffect, useState } from 'react'
import './home.css'
import Contact from './Contact'
import {useNavigate,Link} from "react-router-dom"


export default function Home({token}) {
  const navigator=useNavigate();

  const handleAdd=()=>{
    navigator("/add")
  }

  const handleLogout=async ()=>{

    try{
      await fetch("https://messanger-backend-cu42.onrender.com/logout",{
        method:"delete",
        credentials:"include"
      })
      navigator("/")
    }
    catch(err){
      console.log("err",err)
    }
  }
  const [contacts,setContacts]=useState([]);
  
  useEffect(()=>{
      const conts=fetch("https://messanger-backend-cu42.onrender.com/con",{
        method:"get",
        credentials:"include"
      })
      .then(con=>con.json())
      .then((con)=>{
        setContacts(con)
      })
      .catch((err)=>console.log(err))
    }
  ,[contacts])

  return (
    <>

    <nav id="navbar">
        <div className="logo">Hi!!</div>
        <div className="s">
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    </nav>
    
    <main id="main">
        <div className="head">
          <div className="sec">Contacts</div>
          <div className="but">
            <button onClick={handleAdd}>Add Contact</button>
          </div>
        </div>
        <div className="content">
          {
            contacts.map((contact)=>{
                return <Contact key={contact.phone} key_id={contact.phone} token={token} name={contact.name}/>
            })
          }
        </div>
    </main>
    </>
  )
}
