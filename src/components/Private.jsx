import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Private({children}) {
    const navigator=useNavigate();
    const [lock,setlock]=useState(false);
 useEffect(()=>{
  console.log('hey i am in private page')
    fetch("https://messanger-backend-cu42.onrender.com/islogin",{
        credentials:"include"
    })
    .then((res)=>{
        if(res.ok){
          console.log("clear")
        setlock(true)
        }
        else{
            throw new Error("unauthorized");
        }
    }
    )
    .catch((err)=>{console.log(err)
        navigator("/error");
    })
 },[])
  return (
    <div>
      {lock?<>{children}</>:null}
    </div>
  )
}
