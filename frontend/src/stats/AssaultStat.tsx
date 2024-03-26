import { useState, useEffect } from 'react';
import background_reduced from '../spritesheets/sa/background_reduced.png'
import hands_reduced from '../spritesheets/sa/hands_reduced.png'
import hands from '../spritesheets/sa/hands.png'
import styled from 'styled-components';
import { InfoPopover } from '../components/InfoPopover';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { SpriteAnimation } from '../components/SpriteAnimation';
import { Box, useMediaQuery } from '@chakra-ui/react';
import BackButton from '../components/BackButton';

export const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

function AssaultStat() {
  const [assaultSpriteState, setAssaultSpriteState] = useState('none');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const [reachedMinBreakPoint] = useMediaQuery('(max-width: 600px)');

  const handleAssaultServerRequest = ({ serverSpriteState }: { serverSpriteState: string}) => {
    setAssaultSpriteState(serverSpriteState);
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
    <Box
      height='100vh'
      display={reachedMinBreakPoint ? '' : 'grid'}
      gridTemplateColumns={reachedMinBreakPoint ? '' : '1fr 7fr 1fr'}
      padding={10}
    >
      <Box>
        <BackButton/>
      </Box>
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
          spriteWidth={isLargerThan800 ? 700 : 330} 
          spriteHeight={isLargerThan800 ? 700 : 330}
          staggerFrames={5} 
          spriteSheet={isLargerThan800 ? hands : hands_reduced} 
          canvasWidth={isLargerThan800 ? 700 : 330} 
          canvasHeight={isLargerThan800 ? 700 : 330} 
          onAnimationEnd={handleAnimationEnd}
          animationStates={[
            {
                name: 'hand1',
                frames: 17
            },
            {
                name: 'hand2',
                frames: 17
            },
            {
                name: 'hand3',
                frames: 17
            },
            {
                name: 'hand4',
                frames: 19
            },
            {
                name: 'hand5',
                frames: 22
            },
            {
                name: 'hand6',
                frames: 16
            }
        ]}
        />
      </CanvasContainer>
      <InfoPopover
        text="This is a visualisation of the 
              frequency of sexual assaults 
              against women.
              Each time a hand touches the 
              moon-like figure, a woman has been sexually 
              assaulted somewhere in the world.
              Data from the World Health Organization regarding sexual 
              abuses against women was gathered and fed into this application's 
              server. The server controls what is animated, reflecting
              real-time sexual assault occurences."
      />
    </Box>
  );
}

export default AssaultStat;