import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Private({children}) {
    const navigator=useNavigate();
    const [lock,setlock]=useState(false);
 useEffect(()=>{
  console.log('hey i am in private page')
    fetch("https://messanger-backend-cu42.onrender.com/islogin",{
        credentials:"include",
    })
    .then((res)=>{
        if(res.ok){
        setlock(true)
        return res.json()
        }
        else{
          console.log("error due to islogin")
            throw new Error("unauthorized");
        }
    }
    )
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err,"rcb")
        navigator("/error");
    })
 },[])
  return (
    <div>
      {lock?<>{children}</>:null}
    </div>
  )
}
