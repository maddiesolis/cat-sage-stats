import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    ChakraProvider
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
    const popoverPlacement = reachedMinBreakPoint ? 'top' : 'left-start'
    return (
        <ChakraProvider>
            <PopoverDiv>
                <Popover placement={popoverPlacement}>
                    <PopoverTrigger>
                        <Button>About</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>About</PopoverHeader>
                        <PopoverBody>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Mauris nisi quam, semper vel sem ut, egestas maximus massa. 
                            Aliquam orci tortor, egestas lacinia ultricies nec, dignissim 
                            quis leo. Proin ut placerat sem, nec pharetra dui. Curabitur 
                            sodales eu arcu ut aliquam. Nam fermentum tellus eu neque 
                            consectetur suscipit. In porta rhoncus quam ut pharetra. 
                            Nulla lacinia, elit eu fermentum convallis, sem nisi luctus lectus, 
                            id luctus ante mi vel urna. Aliquam non feugiat sapien.
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </PopoverDiv>
        </ChakraProvider>
    );
};