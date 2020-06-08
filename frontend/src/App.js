import React from 'react';
import {WebSocketProvider} from "./context/WebSocket";
import Chat from "./containers/Chat";

function App() {
  return (
      <WebSocketProvider>
        <Chat />
      </WebSocketProvider>
  );
}

export default App;
