import {React,useEffect,useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./landingpage.css";



export default function LandingPage() {

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
            setlock(false)
              throw new Error("unauthorized");
          }
      }
      )
      .catch((err)=>{console.log(err)
          setlock(false);
      })

      if(lock){
        navigator('/home');
        }

        console.log(lock)
    }  

   ,[lock])

  return (
    <div className="landing-container">
      <div className="landing-box">
        <h1 className="app-title">Hi!!</h1>
        <p className="app-tagline">Connect. Chat. Enjoy.</p>

        <div className="button-group">
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
          <Link to="/register" className="btn btn-register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
