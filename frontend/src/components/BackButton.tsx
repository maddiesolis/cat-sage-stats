import React from 'react';
import { Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import '@fontsource-variable/dm-sans';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Button
            variant='link'
            leftIcon={<ChevronLeftIcon boxSize={10}/>}
            color='#1c557c'
            _hover={{ color: '#15415e' }}
            onClick={() => navigate('/')}
            fontSize='xl'
            iconSpacing={0}
            fontFamily="'DM Sans Variable', sans-serif"
        >
            Back
        </Button>
    );
}

export default BackButton;
