import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowchat] = useState(false);
    
  const joinRoom = () => {
    if(username!== "" && room !== ""){
      socket.emit("join_room", room);
      setShowchat(true);
    }
  }
  return (

    
    <div className="App">
      {!showchat ? (
      <div className="joinChatContainer">
        <h3>Join a chat</h3>
        <input className='input' type="text" placeholder="Enter your name" onChange={(e) => {setUsername(e.target.value)}}/>
        <input className='input' type="text" placeholder="Enter your chat room" onChange={(e) => {setRoom(e.target.value)}} />
        <button onClick={joinRoom}>Join</button>
        </div>
        ) : (
        <Chat socket={socket} username={username} room={room} />
        )}
      
    </div>
  );
}

export default App;
