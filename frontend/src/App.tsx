import { useState, useEffect } from 'react';
import { SpriteAnimation } from './components/SpriteAnimation';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import background from './spritesheets/background.png'
import hands from './spritesheets/hands.png'

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
      <BackgroundAnimation spriteWidth={2000} spriteHeight={2000} staggerFrames={5} animationSheet={background} canvasWidth={2000} canvasHeight={2000} numFrames={13}/>
      <SpriteAnimation playerState={playerState} spriteWidth={700} spriteHeight={700} staggerFrames={5} spriteSheet={hands} onAnimationEnd={handleAnimationEnd}/>
    </>
  );
}

export default App;