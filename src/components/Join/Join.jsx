import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import './Join.css';

export default function SignIn({setName,setRoom}) {
  let history =useHistory();

  const pushChat=()=>{
     history.push('/chat')
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
      
          <button className={'button mt-20'} onClick={pushChat}>Sign In</button>
        
      </div>
    </div>
  );
}