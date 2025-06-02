import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Private({children}) {
    const navigator=useNavigate();
    const [lock,setlock]=useState(false);
 useEffect(()=>{
    fetch("http://localhost:5000/islogin",{
        credentials:"include"
    })
    .then((res)=>{
        if(res.ok){
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
