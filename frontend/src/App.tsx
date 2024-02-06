import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sprite } from './SpriteAnimation';

// TODO: make responsive
const PageContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

function App() {
  // TODO: add load event listener?
  const [playerState, setPlayerState] = useState('idle');

  const handleServerRequest = ({ serverPlayerState }: { serverPlayerState: string}) => {
    setPlayerState(serverPlayerState);
    // Make animations all last same amount of time
    setTimeout(() => {
      setPlayerState('idle');
    }, 1000);
  }

  useEffect(() => {
      const ws = new WebSocket('ws://localhost:8080');

      // Listen for player state updates from the server
      ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleServerRequest({ serverPlayerState: data.playerState });
      };

      // Close the WebSocket connection when the component unmounts
      return () => ws.close();
  }, []);

  return (
    <>
      <Sprite playerState={playerState}/>
    </>
  );
}

export default App;