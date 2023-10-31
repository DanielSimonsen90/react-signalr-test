import React, { useEffect, useState } from 'react';
import './App.css';
import Connector from './signalr'
;
function App() {
  const { ping, registerPong } = Connector();
  useEffect(() => {
    registerPong(() => alert("pong"));
  }, []);
  return (
    <form className="App" onSubmit={e => {
      e.preventDefault();
      ping();
    }}>
      <button type="submit">Send</button>
    </form>
  );
}
export default App;