import React, { useEffect, useState } from 'react'
import './contact.css'
import { useNavigate } from 'react-router-dom'
export default function Contact({name,key_id,token}) {

  const navigator=useNavigate();
  const [prof,setProf]=useState({})
  
 
  const handleDelete=(e,key_id)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log("errooorr")
    fetch("https://messanger-backend-cu42.onrender.com/delete",{
      method:"post",
      credentials:"include",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({phone:key_id})
    }).then(()=>{
      console.log('successfully deleted');
    }).catch((err)=>{
      console.log(err)
    })

  }

  useEffect(()=>{
      fetch("https://messanger-backend-cu42.onrender.com/getDetails1",{
        method:"post",
        credentials:"include",
         headers: {
            "Content-Type": "application/json" 
          },
        body:JSON.stringify({phone:key_id})
      }).then((res)=>{
        return res.json()
      }).then((res)=>{
        setProf(res)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

  const handleClick=()=>{
    navigator("/chat",{state:{profile:prof.profile,name,phone:key_id,token:token}})
  }
  return (
    <div className="card" onClick={handleClick}>
      <img className="proi" src={prof.profile} alt="profile" />
      <div className="box">
        <h1 title={name}>{name}</h1>
      </div>
      <button type="button" onClick={(e)=>handleDelete(e,key_id)}>Delete</button>
    </div>
  )
}
