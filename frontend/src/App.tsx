import { useState, useEffect } from 'react';
import { Sprite } from './Sprite';
import Background from './Background';
import background from './background.png'
import spritesheet from './spritesheet.png'


function App() {
  const [playerState, setPlayerState] = useState('none');

  const handleServerRequest = ({ serverPlayerState }: { serverPlayerState: string}) => {
    setPlayerState(serverPlayerState);
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

  const handleAnimationEnd = () => {
    setPlayerState('none');
  };

  return (
    <>
      <Background spriteWidth={2000} spriteHeight={2000} staggerFrames={5} animationSheet={background} canvasWidth={2000} canvasHeight={2000} numFrames={13}/>
      <Sprite playerState={playerState} spriteWidth={700} spriteHeight={700} staggerFrames={5} spriteSheet={spritesheet} onAnimationEnd={handleAnimationEnd}/>
    </>
  );
}

export default App;