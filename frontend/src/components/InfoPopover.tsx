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
import '@fontsource-variable/dm-sans';

const PopoverDiv = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 2rem;
    z-index: 1;     // Overlays canvas
`

interface InfoPopoverProps {
    text: string;
}

export const InfoPopover: React.FC<InfoPopoverProps> = ({ text }) => {
    // Popover placement depends on screen size
    const [reachedMinBreakPoint] = useMediaQuery('(max-width: 600px)');
    const popoverPlacement = reachedMinBreakPoint ? 'top' : 'left-start';
    const popoverSize = reachedMinBreakPoint ? '20rem' : '25rem';
    return (
        <PopoverDiv>
            <Popover placement={popoverPlacement}>
                <PopoverTrigger>
                <Button
                    size={reachedMinBreakPoint ? 'md' : 'lg'}
                    fontSize={reachedMinBreakPoint ? 'lg' : 'xl'}
                    fontWeight={700}
                    color='#223038'
                    bg='#eff0f1' 
                    _hover={{ bg: '#e6e7e9' }}
                    fontFamily="'DM Sans Variable', sans-serif"
                >
                    About
                </Button>
                </PopoverTrigger>
                <PopoverContent
                    style={{boxShadow:"none"}}
                    w={popoverSize} 
                    padding='0.5rem'
                >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody
                        fontSize={reachedMinBreakPoint ? 'md' : 'lg'}
                        mt={2} 
                        fontFamily="'DM Sans Variable', sans-serif"
                    >
                        {text}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </PopoverDiv>
    );
};