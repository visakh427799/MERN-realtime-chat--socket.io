import React from 'react'

import io from 'socket.io-client'

import InfoBar from './InfoBar/InfoBar'
import Input from './Input/Input'
import Messages from './Msgs/Messages'
import { UserContext } from '../context/UserContext'
import './Chat.css'
import {useContext} from 'react';


let socket;
// const ENDPOINT=
function Chat(props) {

    const [name, setName] = React.useState('Admin');
    const [room, setRoom] = React.useState('mca');
    const [message,setMessage]=React.useState('');
    const [messages,setMessages]=React.useState([]);

    const{nm,rm} =useContext(UserContext);
     console.log(nm,rm);
     
    
    React.useEffect(()=>{
      
        
        setName(nm)
        setRoom(rm)
        socket=io('https://realtime-chats-mern.herokuapp.com/');
        console.log(socket);
        socket.emit('join',{name,room},(error)=>{

        })
       
    },[name,room])

    React.useEffect(() => {
        socket.on('message', message => {

        //     let msgs=messages
        //     msgs.push(message)
        //   setMessages(msgs);

        setMessages([...messages,message])

          console.log(messages);
        },[messages]);

})

const sendMessage=(event)=>{
    event.preventDefault();

    socket.emit("send",message,()=>{
        setMessage('');

        
    })
}

    return (
        <div className="outerContainer">
      <div className="container">
         
          <InfoBar room={room} />
           <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> 
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
    )
}

export default Chat
