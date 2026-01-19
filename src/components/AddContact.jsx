import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddContact() {
    const navigator=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("https://messanger-backend-cu42.onrender.com/api/user/add",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:e.target.name.value,phone:e.target.phno.value})
        }).then((res)=>
                navigator("/home")
                )
          .catch((err)=>{
            console.log(err);
            navigator("/home")
        })
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="" />
        <label htmlFor="phno">Phone</label>
        <input type="text" name="phno" id="" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
