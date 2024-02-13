import { useState, useEffect } from 'react';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import background from './spritesheets/background.png'
import hands from './spritesheets/hands.png'
import styled from 'styled-components';
import { InfoPopover } from './components/InfoPopover';
import { SpriteAnimation } from './components/SpriteAnimation';

const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

function App() {
  const [playerState, setPlayerState] = useState('none');

  const handleServerRequest = ({ serverPlayerState }: { serverPlayerState: string}) => {
    setPlayerState(serverPlayerState);
  }

  useEffect(() => {
    const ws = new WebSocket('ws://shark-app-epd3d.ondigitalocean.app');

    // Error handler
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Listen for player state updates from the server
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleServerRequest({ serverPlayerState: data.playerState });
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
}, []);


  const handleAnimationEnd = () => {
    setPlayerState('none');
  };

  return (
    <>
      <InfoPopover/>
      <CanvasContainer>
        <BackgroundAnimation spriteWidth={2000} spriteHeight={2000} staggerFrames={5} animationSheet={background} canvasWidth={2000} canvasHeight={2000} numFrames={13}/>
        <SpriteAnimation playerState={playerState} spriteWidth={700} spriteHeight={700} staggerFrames={5} spriteSheet={hands} onAnimationEnd={handleAnimationEnd}/>
      </CanvasContainer>
    </>
  );
}

export default App;