import { useState, useEffect } from 'react';
import angels_spritesheet from '../spritesheets/missing/angels-spritesheet-reduced-mobile.png'
import { InfoPopover } from '../components/InfoPopover';
import { SpriteAnimation } from '../components/SpriteAnimation';
import { BackgroundImage } from '../components/BackgroundImage';
import background from '../spritesheets/missing/background.png'
import { CanvasContainer } from './AssaultStat';

function MissingStat() {
  const [missingSpriteState, setMissingSpriteState] = useState('none');

  const handleMissingServerRequest = ({ serverSpriteState }: { serverSpriteState: string}) => {
    setMissingSpriteState(serverSpriteState);
  }

  useEffect(() => {
    const ws = new WebSocket('wss://shark-app-epd3d.ondigitalocean.app');
    // const ws = new WebSocket('ws://localhost:8080');


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
      <InfoPopover 
        text="This is a visualisation of the frequency
              that children go missing globally. Each time 
              an angel's portrait is displayed, a child goes missing.
              Data from ORGANIZATION regarding the number of missing children 
              cases per country was gathered and fed into this application's 
              server. The server controls what is animated, reflecting
              real-time childrens' disappearances."
      />
      <CanvasContainer>
        <BackgroundImage
          imageUrl={background}
          canvasWidth={500} 
          canvasHeight={500} 
        />
        <SpriteAnimation 
          playerState={missingSpriteState} 
          spriteWidth={300} 
          spriteHeight={300} 
          staggerFrames={3} 
          spriteSheet={angels_spritesheet} 
          canvasWidth={300} 
          canvasHeight={300} 
          onAnimationEnd={handleAnimationEnd}
          animationStates={[
            {
              name: 'angel1',
              frames: 54
            },
            {
                name: 'angel2',
                frames: 36
            },
            {
                name: 'angel3',
                frames: 40
            },
            {
                name: 'angel4',
                frames: 34
            },
            {
                name: 'angel5',
                frames: 58
            },
            {
                name: 'angel6',
                frames: 27
            },
            {
              name: 'angel7',
              frames: 49
            }
          ]}
        />
      </CanvasContainer>
    </>
  );
}

export default MissingStat;