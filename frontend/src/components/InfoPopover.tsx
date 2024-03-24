import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button
} from '@chakra-ui/react';
import styled from 'styled-components';
import { useMediaQuery } from '@chakra-ui/react';

const PopoverDiv = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 2rem;
    z-index: 1;     // Overlays canvas
`

export const InfoPopover: React.FC = () => {
    // Popover placement depends on screen size
    const [reachedMinBreakPoint] = useMediaQuery('(max-width: 600px)');
    const popoverPlacement = reachedMinBreakPoint ? 'top' : 'left-start';
    const popoverSize = reachedMinBreakPoint ? '20rem' : '25rem';
    return (
        <PopoverDiv>
            <Popover placement={popoverPlacement}>
                <PopoverTrigger>
                <Button fontSize={20}>About</Button>
                </PopoverTrigger>
                <PopoverContent style={{boxShadow:"none"}} w={popoverSize}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody fontSize={18}>
                        This is a visualisation of the 
                        frequency of sexual assaults 
                        against women.
                        Each time a hand touches the 
                        moon-like figure, a woman has been sexually 
                        assaulted somewhere in the world.
                        Data from the World Health Organization regarding sexual 
                        abuses against women was gathered and fed into this application's 
                        server. The server controls what is animated, reflecting
                        real-time sexual assault occurences.
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </PopoverDiv>
    );
};