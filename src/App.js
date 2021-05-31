import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Join from './components/Join/Join';
import Chat from './components/Chat';
 import {UserContext}  from './context/UserContext';
function App() {

        const [name, setName] = React.useState('');
        const [room, setRoom] = React.useState('');

    return (
        

        <Router>
         
                <Route path="/" exact>
                    <Join setName={setName} setRoom={setRoom}/>
                </Route>
                <Route path="/chat" >

                <UserContext.Provider value={{nm:name,rm:room}}>
                    <Chat/>
                </UserContext.Provider>  
                </Route>

         

        </Router>
    )
}

export default App
