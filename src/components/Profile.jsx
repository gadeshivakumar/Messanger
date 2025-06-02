import {React,useEffect,useState} from 'react'
import "./profile.css"
import { useNavigate } from 'react-router-dom'
export default function Profile() {

  const [prof,setProf]=useState({})
  const navigator=useNavigate();
  const handleUpdate=async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("dp",e.target.dp.files[0])
    try{
        const res=await fetch("http://localhost:5000/profile",{
          method:"POST",
          credentials:"include",
          body:formData
        })

        setProf(res)
        
    }
    catch(err){
      console.log(err)
    }
    
  }

  useEffect(()=>{
    fetch("http://localhost:5000/getDetails",{
      method:"get",
      credentials:"include"
    }).then((res)=>{
      return res.json()
    }).then((res)=>{
      setProf(res)
    }).catch((err)=>{
      console.log(err)
    })
  },[prof])

   const handleBack=()=>{
      navigator('/home')
    }
  
return (
  <div className="whatsapp-profile">
    <form className="profile-header" onSubmit={handleUpdate}>
      <img src={prof.profile || "/constact.jpg"} alt="Profile Photo" className="profile-img" />
      <label htmlFor="dp" className="file-label">Change Photo</label>
      <input
        type="file"
        name="dp"
        id="dp"
        accept="image/*"
        className="file-input"
      />
      <button type="submit" className="update-btn">Update Profile</button>
    </form>
    <div className="profile-info">
      <div className="info-block">
        <label>Name</label>
        <p>{prof.name}</p>
      </div>
      <div className="info-block">
        <label>Phone</label>
        <p>{prof.phone}</p>
      </div>
    </div>
     <button type="button" onClick={handleBack} className='back'>Back</button>
  </div>
);
}