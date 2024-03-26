import React from 'react';
import { Button, useMediaQuery } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import '@fontsource-variable/dm-sans';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const [reachedMinBreakPoint] = useMediaQuery('(max-width: 600px)');
    return (
        <Button
            variant='link'
            leftIcon={<ChevronLeftIcon boxSize={reachedMinBreakPoint ? 8 : 10}/>}
            color='#1c557c'
            _hover={{ color: '#15415e' }}
            onClick={() => navigate('/')}
            fontSize={reachedMinBreakPoint ? 'lg' : 'xl'}
            iconSpacing={0}
            fontFamily="'DM Sans Variable', sans-serif"
        >
            Back
        </Button>
    );
}

export default BackButton;
