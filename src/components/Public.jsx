import { set } from 'mongoose';
import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Public({children}) {
const navigator=useNavigate();
const [lock,setlock]=useState(false);
 useEffect(()=>{
    fetch("http://localhost:5000/islogin",{
        credentials:"include"
    })
    .then((res)=>{
        if(res.ok){
        navigator("/home");
        setlock(true);
        }
        else{
            setlock(false);
            throw new Error("unauthorized");
        }
    }
    )
    .catch((err)=>{console.log(err)
        setlock(false)
    })
 },[navigator])
  
 if(!lock){
    return <>{children}</>
 }
 else{
    return <>...loading</>
 }
    
  
}
