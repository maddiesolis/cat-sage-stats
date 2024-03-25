import { useState, useEffect } from 'react';
import angel1 from '../spritesheets/missing/angel1.png'
import { InfoPopover } from '../components/InfoPopover';
// import { SpriteAnimation } from '../components/SpriteAnimation';
import { BackgroundImage } from '../components/BackgroundImage';
import background from '../spritesheets/missing/background.png'
import { CanvasContainer } from './AssaultStat';
import { BackgroundAnimation } from '../components/BackgroundAnimation';

function MissingStat() {
  const [missingSpriteState, setMissingSpriteState] = useState('none');

  const handleMissingServerRequest = ({ serverSpriteState }: { serverSpriteState: string}) => {
    setMissingSpriteState(serverSpriteState);
  }

  useEffect(() => {
    // const ws = new WebSocket('wss://shark-app-epd3d.ondigitalocean.app');
    const ws = new WebSocket('ws://localhost:8080');


    // Error handler
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Listen for player state updates from the server
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.hasOwnProperty('missingSpriteState')) {
          handleMissingServerRequest({ serverSpriteState: data.missingSpriteState });
        }
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, []);


  const handleAnimationEnd = () => {
    setMissingSpriteState('none');
  };

  return (
    <>
      <InfoPopover/>
      <CanvasContainer>
        <BackgroundImage
          imageUrl={background}
          canvasWidth={500} 
          canvasHeight={500} 
        />
        {/* <SpriteAnimation 
          playerState={missingSpriteState} 
          spriteWidth={900} 
          spriteHeight={890} 
          staggerFrames={5} 
          spriteSheet={angel1} 
          canvasWidth={900} 
          canvasHeight={890} 
          onAnimationEnd={handleAnimationEnd}
          animationStates={[
            {
                name: 'angel1',
                frames: 54
            }
          ]}
        /> */}
        <BackgroundAnimation
          spriteWidth={900} 
          spriteHeight={890} 
          staggerFrames={4} 
          animationSheet={angel1} 
          canvasWidth={900} 
          canvasHeight={890} 
          numFrames={54}
        />
      </CanvasContainer>
    </>
  );
}

export default MissingStat;