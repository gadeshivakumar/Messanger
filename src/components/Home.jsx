import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import Contact from './Contact'
import {useNavigate,Link} from "react-router-dom"
import AuthContext from '../apicontext'


export default function Home() {
  const {setUser}=useContext(AuthContext)
  const navigator=useNavigate();

  const handleAdd=()=>{
    navigator("/add")
  }

  const handleLogout=async ()=>{

    try{
      await fetch("https://messanger-backend-cu42.onrender.com/api/auth/logout",{
        method:"DELETE",
        credentials:"include"
      })
      setUser(null);
    }
    catch(err){
      console.log("err",err)
    }
  }
  const [contacts,setContacts]=useState([]);

  const handleDelete=(e,key_id)=>{
      e.preventDefault();
      e.stopPropagation();
      fetch(`https://messanger-backend-cu42.onrender.com/api/user/delete/${key_id}`,{
        method:"DELETE",
        credentials:"include",
      }).then((res)=>{
        if(res.ok){
          console.log('successfully deleted');
          setContacts((prev)=>{
            return prev.filter((contact)=>contact.phone!==key_id)
          })
        }
        else
          throw new Error("something went wrong")
      }).catch((err)=>{
        console.log(err)
      })
  
    }
  
  useEffect(()=>{
      const conts=fetch("https://messanger-backend-cu42.onrender.com/api/user/con",{
        method:"get",
        credentials:"include"
      })
      .then(con=>con.json())
      .then((con)=>{
        setContacts(con)
      })
      .catch((err)=>console.log(err))
    }
  ,[])

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
                return <Contact key={contact.phone} key_id={contact.phone} onDelete={handleDelete}  name={contact.name}/>
            })
          }
        </div>
    </main>
    </>
  )
}
