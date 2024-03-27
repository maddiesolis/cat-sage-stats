import { useState, useEffect } from 'react';
import angels_spritesheet from '../spritesheets/missing/angels-spritesheet.png'
import angels_spritesheet_reduced from '../spritesheets/missing/angels-spritesheet-reduced.png'
import { InfoPopover } from '../components/InfoPopover';
import { SpriteAnimation } from '../components/SpriteAnimation';
import blue_background_image from '../spritesheets/missing/blue-background-image-reduced.png'
import { CanvasContainer } from './AssaultStat';
import { useMediaQuery, Box } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import { BackgroundImage } from '../components/BackgroundImage';

function MissingStat() {
  const [missingSpriteState, setMissingSpriteState] = useState('none');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [reachedMinBreakPoint] = useMediaQuery('(max-width: 600px)');

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
    <Box
      height='100vh'
      display={reachedMinBreakPoint ? '' : 'grid'}
      gridTemplateColumns={reachedMinBreakPoint ? '' : '1fr 7fr 1fr'}
      padding={reachedMinBreakPoint ? 4 : 10}
    >
      <Box>
        <BackButton/>
      </Box>
      <CanvasContainer>
        <BackgroundImage
          imageUrl={blue_background_image}
          canvasWidth={300}
          canvasHeight={300}
        />
        <SpriteAnimation 
          playerState={missingSpriteState} 
          spriteWidth={isLargerThan800 ? 900 : 280} 
          spriteHeight={isLargerThan800 ? 900 : 280} 
          staggerFrames={4} 
          spriteSheet={isLargerThan800 ? angels_spritesheet : angels_spritesheet_reduced} 
          canvasWidth={isLargerThan800 ? 900 : 280} 
          canvasHeight={isLargerThan800 ? 900 : 280} 
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
      <InfoPopover 
        text="This is a visualisation of the frequency
              that children go missing globally. Each time 
              an angel's portrait is displayed, a child goes missing.
              Data from the International Centre for Missing and Exploited 
              Children was gathered and fed into this application's 
              server. The server controls what is animated, reflecting
              real-time children's disappearances."
      />
    </Box>
  );
}

export default MissingStat;