import { useState, useEffect } from 'react';
import background_reduced from '../spritesheets/sa/background_reduced.png'
import hands_reduced from '../spritesheets/sa/hands_reduced.png'
import styled from 'styled-components';
import { InfoPopover } from '../components/InfoPopover';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { SpriteAnimation } from '../components/SpriteAnimation';

const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

function AssaultStat() {
  const [assaultSpriteState, setAssaultSpriteState] = useState('none');

  const handleAssaultServerRequest = ({ serverSpriteState }: { serverSpriteState: string}) => {
    setAssaultSpriteState(serverSpriteState);
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
        if (data.hasOwnProperty('assaultSpriteState')) {
          handleAssaultServerRequest({ serverSpriteState: data.assaultSpriteState });
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
    setAssaultSpriteState('none');
  };

  return (
    <>
      <InfoPopover/>
      <CanvasContainer>
        <BackgroundAnimation
          spriteWidth={407} 
          spriteHeight={400} 
          staggerFrames={7} 
          animationSheet={background_reduced} 
          canvasWidth={407} 
          canvasHeight={400} 
          numFrames={13}
        />
        <SpriteAnimation 
          playerState={assaultSpriteState} 
          spriteWidth={330} 
          spriteHeight={330} 
          staggerFrames={5} 
          spriteSheet={hands_reduced} 
          canvasWidth={330} 
          canvasHeight={330} 
          onAnimationEnd={handleAnimationEnd}
        />
      </CanvasContainer>
    </>
  );
}

export default AssaultStat;