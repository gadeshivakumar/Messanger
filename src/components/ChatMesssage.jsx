import React, { useState } from 'react';
import './chatroom.css';

export default function ChatMesssage({ classname, message,id,phone,n,socket}) {
  
  const handleChange=(event)=>{

    if(event==="delete"){
      fetch(`http://localhost:5000/api/user/${phone}/delMessage/${n}/${id}`,{
        method:"DELETE",
        credentials:"include",
      })
      .then(()=>{
        socket.emit("del");
      })
      .catch(err=>console.log(err))
    }

  }

  const isLeft = classname === 'mboxleft';

  return (
    <div className={`message-container ${isLeft ? 'left' : 'right'}`}>
      {isLeft && <div className="bubble">{message}</div>}
      {isLeft && (
        <select className="msg-dropdown" onChange={(e)=>
          {
            handleChange(e.target.value)}}>
          <option value="">🔽</option>
          <option value="delete">Delete</option>
        </select>
      )}

      {!isLeft && (
        <select className="msg-dropdown"  onChange={(e)=>
        { 
          handleChange(e.target.value)}}>
          <option value="">🔽</option>
          <option value="delete">Delete</option>
        </select>
      )}
      {!isLeft && <div className="bubble">{message}</div>}
    </div>
  );
}
