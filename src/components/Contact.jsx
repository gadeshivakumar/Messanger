import React, { useEffect, useState } from 'react'
import './contact.css'
import { useNavigate } from 'react-router-dom'
export default function Contact({name,key_id,onDelete}) {

  const navigator=useNavigate();
  const [prof,setProf]=useState({})
  
 
 

  useEffect(()=>{
      fetch(`http://localhost:5000/api/user/getDetails/${key_id}`,{
        method:"get",
        credentials:"include",
      }).then((res)=>{
        return res.json()
      }).then((res)=>{
        setProf(res)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

  const handleClick=()=>{
    navigator("/chat",{state:{profile:prof.profile,name,phone:key_id}})
  }
  return (
    <div className="card" onClick={handleClick}>
      <img className="proi" src={prof.profile} alt="profile" />
      <div className="box">
        <h1 title={name}>{name}</h1>
      </div>
      <button type="button" onClick={(e)=>onDelete(e,key_id)}>Delete</button>
    </div>
  )
}
