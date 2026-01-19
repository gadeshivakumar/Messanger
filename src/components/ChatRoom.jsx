import React, { useEffect, useState,useRef,useMemo} from 'react'
import "./chatroom.css"
import { useLocation } from 'react-router-dom'
import {io} from 'socket.io-client';
import ChatMesssage from './ChatMesssage';
import { useContext } from 'react';
import AuthContext from '../apicontext';
export default function ChatRoom() {

  const locator=useLocation();
  const [message,setMessage]=useState("");
  const {profile,name,phone}=locator.state||{};
  const [messages,setMessages]=useState([])
  const socket=useRef(null);
  const [counter,setCounter]=useState(0);
  const {user}=useContext(AuthContext);
  const handleSend=()=>{
    socket.current.emit('send_message',{phone:phone,message:message});
    setMessage("")
  }

  useEffect(()=>{
    socket.current=io("http://localhost:5000",{
      withCredentials:true,
      auth:{token:user.token}
    })

    fetch("http://localhost:5000/api/user/getMessages",{
      method:"POST",
      credentials:"include",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({phone:phone})
    }).then(res=>{
      return res.json()
    })
    .then(res=>{
      setMessages(res);
    })
    .catch(err=>console.log(err))

    socket.current.on('akn',(msg)=>{
      const curMsg={
        n:2,
        message:msg.message,
        id:msg._id,
        time:msg.timestamp
      }  
      console.log(msg);
      setMessages(prev=>[...prev,curMsg])
    })

    socket.current.on("sent",(msg)=>{
      const curMsg={
        n:1,
        message:msg.message,
        id:msg._id,
        time:msg.timestamp
      }
      console.log(msg);
      setMessages(prev=>[...prev,curMsg])
    })

    socket.current.on("deleted",()=>{
      fetch("http://localhost:5000/api/user/getMessages",{
      method:"Post",
      credentials:"include",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({phone:phone})
    }).then(res=>{
      return res.json()
    })
    .then(res=>{
      setMessages(res);
    })
    .catch(err=>console.log(err))
    })
    return ()=>{
      socket.current.off("akn");
      socket.current.off("sent");
      socket.current.off("deleted");
      socket.current.disconnect();
    }

  },[])

  return (
    <div className='room'>
      <div className="header">
        <div className="profile" style={{backgroundImage:`url(${profile})`,
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover"
        }}></div>
        <div className="name">{name}</div>
      </div>
      <div className="chats">
        {messages.map((m,index)=>{
          if(m.n==1){
            return <ChatMesssage classname={"mboxleft"} socket={socket.current} message={m.message} key={m.id} id={m.id} phone={phone} n={m.n}/>
          }
          else{
            return  <ChatMesssage classname={"mboxright"} socket={socket.current} message={m.message} key={m.id} id={m.id} phone={phone} n={m.n}/>
          }

        })}
      </div>
      <div className="text">
        <input type="text" name="chat" id="" value={message} onChange={(e)=>setMessage(e.target.value)} />
        <button id="send" onClick={handleSend}>send</button>
      </div>
    </div>
  )
}
