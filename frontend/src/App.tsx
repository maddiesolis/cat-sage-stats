import React, { useState, useEffect } from 'react';
import { StatContainer } from './StatContainer';
import styled from 'styled-components';
import { Sprite } from './SpriteAnimation';
import { Dropdown } from './Dropdown';

// TODO: make responsive
const PageContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

function App() {
  const [playerState, setPlayerState] = useState('idle');

  const handleDropDownChange = (value: string) => {
    setPlayerState(value);
  }

  // const [textColor, setTextColor] = useState('#3498db'); // Initial color

  // useEffect(() => {
  //     const ws = new WebSocket('ws://localhost:8080');

  //     // Listen for color updates from the server
  //     ws.onmessage = (event) => {
  //         const data = JSON.parse(event.data);
  //         setTextColor(data.textColor);
  //     };

  //     // Close the WebSocket connection when the component unmounts
  //     return () => ws.close();
  // }, []);

  return (
    <>
      <Sprite playerState={playerState}/>
      <Dropdown onChange={handleDropDownChange}/>
    </>
  );
}

export default App;