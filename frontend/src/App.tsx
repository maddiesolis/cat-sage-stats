import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sprite } from './Sprite';
import Background from './Background';
import test_background from './test_background.png'
// import hand1_sprite from './hand1_sprite.png'
import reduced_sprite from './reduced_sprite.png'

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
    }, 700);
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
      <Background spriteWidth={2000} spriteHeight={2000} staggerFrames={5} animationSheet={test_background} canvasWidth={2000} canvasHeight={2000} numFrames={13}/>
      <Background spriteWidth={700} spriteHeight={688} staggerFrames={5} animationSheet={reduced_sprite} canvasWidth={700} canvasHeight={688} numFrames={17}/>
      {/* <Sprite playerState={playerState} spriteWidth={2000} spriteHeight={2000} staggerFrames={5} spriteSheet={hand1_sprite}/> */}
    </>
  );
}

export default App;